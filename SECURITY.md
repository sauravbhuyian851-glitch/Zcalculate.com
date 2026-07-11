# Security Architecture & Infrastructure Hardening Blueprint

This blueprint defines the security architecture and hardening guidelines for the Zcalculate platform, covering network-level protections, server access controls, database security, monitoring, and regulatory compliance rules.

---

## 1. Network & Traffic Control (Edge Protection)

To safeguard Zcalculate's static web pages and API handlers from DDoS, scraping, and application-level attacks, edge protection should be configured.

### Web Application Firewall (WAF) Configuration
We recommend placing the application behind Cloudflare or Vercel Edge Firewall. Below is a production-ready Cloudflare Custom WAF ruleset (Terraform HCL format) to establish boundary security:

```hcl
resource "cloudflare_ruleset" "waf_custom_rules" {
  zone_id     = "your_zone_id"
  name        = "Zcalculate Custom WAF Rules"
  description = "Block malicious scans, limit scraping, and restrict API abuse"
  kind        = "zone"
  phase       = "http_request_firewall_custom"

  rules {
    action      = "block"
    description = "Block known vulnerability scanner User Agents"
    expression  = "(http.user_agent contains \"sqlmap\") or (http.user_agent contains \"Nikto\") or (http.user_agent contains \"nmap\") or (http.user_agent contains \"Acunetix\")"
    enabled     = true
  }

  rules {
    action      = "challenge"
    description = "Challenge suspicious automated traffic to calculators"
    expression  = "(http.request.uri.path contains \"/calculator/\" and cf.threat_score > 15)"
    enabled     = true
  }

  rules {
    action      = "block"
    description = "Block direct requests violating host headers"
    expression  = "(http.host ne \"zcalculate.com\") and (http.host ne \"www.zcalculate.com\") and (http.host ne \"zcalculate-com.vercel.app\")"
    enabled     = true
  }
}
```

### Rate Limiting (DDoS Prevention)
Edge rate limiting controls abuse by restricting request frequency. We enforce the following limits at the edge (Cloudflare Rate Limiting or Vercel Serverless Rate Limiting):
- **Web Pages / Asset Routes**: 100 requests per 10 seconds per IP (burst mitigation).
- **API Endpoint (`/api/feedback`)**: Maximum of 3 requests per 1 minute per IP. 

---

## 2. Access Control & Host Hardening (PoLP)

For any self-hosted nodes, continuous monitoring agents, or backend services, the server infrastructure must follow the Principle of Least Privilege (PoLP).

### Secure SSH Daemon Configuration (`/etc/ssh/sshd_config`)
Hardening host access is done by restricting SSH protocols, enforcing Key-Based Authentication, and requiring Multi-Factor Authentication (MFA). Apply these directives in `/etc/ssh/sshd_config`:

```ini
# Enforce SSH Protocol 2
Protocol 2

# Disable root login
PermitRootLogin no

# Limit maximum auth attempts to prevent brute force
MaxAuthTries 3

# Disable password-based authentication (force cryptographic keys)
PasswordAuthentication no
PubkeyAuthentication yes

# Restrict SSH access to a specific administration user group
AllowGroups ssh-admin-users

# Enforce secure modern cryptographic algorithms (restrict legacy ciphers)
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com

# Enable multi-factor authentication (if Google Authenticator PAM is configured)
AuthenticationMethods publickey,keyboard-interactive
```

### Host Firewall (UFW) & Fail2Ban
Enforce strict local firewall rules to restrict traffic to necessary ports only:

```bash
# Reset UFW rules to default (deny all incoming, allow all outgoing)
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow standard web traffic
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Restrict SSH access to specific trusted management IPs or internal VPN subnet
sudo ufw allow from 192.168.10.0/24 to any port 22 proto tcp

# Enable the firewall
sudo ufw enable
```

Deploy **Fail2Ban** to dynamically ban IPs exhibiting malicious traffic patterns:

```ini
# /etc/fail2ban/jail.local configuration snippet
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
findtime = 600
bantime = 3600
```

---

## 3. Database Security & Injection Prevention

Although Zcalculate's calculations run fully on the client-side, any future database integration (e.g. user profiles, saving calculations) must enforce strict input parameters and SQL Injection (SQLi) protection.

### Prepared Statements and Parametrized Queries
Never concatenate user inputs into SQL strings. Use parametrized queries (using PostgreSQL and `pg-promise` / TypeORM as examples):

```typescript
import pgPromise from 'pg-promise';
const pgp = pgPromise();
const db = pgp('postgres://user:password@localhost:5432/zcalculate_db');

interface UserProfile {
  userId: string;
  email: string;
}

// SECURE: Fully parametrized SQL Query (Prepared Statement)
export async function getProfileSecure(userId: string): Promise<UserProfile | null> {
  try {
    // The driver internally prepares the query and binds parameters securely.
    // User inputs are treated strictly as data, never executable commands.
    const user = await db.oneOrNone<UserProfile>(
      'SELECT id as "userId", email FROM users WHERE id = $1',
      [userId]
    );
    return user;
  } catch (error) {
    console.error('[Database Error] Failed to fetch user profile:', error);
    throw new Error('Database operation exception');
  }
}

// INSECURE: NEVER DO THIS (Vulnerable to SQL Injection)
// export async function getProfileInsecure(userId: string) {
//   return await db.any(`SELECT * FROM users WHERE id = '${userId}'`); 
// }
```

### Secure File Upload Validation (If Implemented)
If users are permitted to upload avatars, PDF exports, or documents, enforce these server-side checks:
1. **Size Limits**: Enforce a strict file-size cap (e.g., max 2 MB).
2. **Extension & MIME Type Validation**: Validate both file extension and magic bytes (MIME sniffing). Never trust the `Content-Type` header sent by the client.
3. **Storage Isolation**: Store uploaded files on an isolated object storage bucket (e.g., AWS S3, Cloudflare R2) configured with private access. Set `Content-Disposition: attachment` when serving file downloads to block XSS execution.
4. **Malware Scanning**: Stream file uploads through an antivirus utility (like ClamAV) before persisting.

Example file validator module:

```typescript
import fileType from 'file-type'; // Snippet assumes file-type package usage

export async function validateUpload(fileBuffer: Buffer, fileName: string): Promise<boolean> {
  const allowedExtensions = ['pdf', 'png', 'jpg', 'jpeg'];
  const allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg'];

  // Check 1: Size check (Max 2MB)
  if (fileBuffer.length > 2 * 1024 * 1024) return false;

  // Check 2: Verify true MIME type by parsing magic numbers (file header bytes)
  const fileMeta = await fileType.fromBuffer(fileBuffer);
  if (!fileMeta || !allowedMimeTypes.includes(fileMeta.mime)) return false;

  // Check 3: Cross-reference file extension matches true MIME type
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (!ext || !allowedExtensions.includes(ext) || fileMeta.ext !== ext) return false;

  return true;
}
```

---

## 4. Monitoring & Logging (SIEM Integration)

### Structured Logging Format
Logs should be output in structured JSON format to allow ingestion by SIEM systems (Splunk, Datadog, ELK). This facilitates rapid incident response and trace analysis.

Example JSON Log schema definition:

```json
{
  "timestamp": "2026-07-11T12:34:56.789Z",
  "level": "WARN",
  "correlationId": "tx-8f2e41a9-90b1",
  "event": {
    "category": "security",
    "type": "rate_limit_exceeded",
    "message": "Client rate limit triggered on feedback endpoint"
  },
  "network": {
    "clientIp": "198.51.100.42",
    "httpMethod": "POST",
    "requestPath": "/api/feedback",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..."
  },
  "actor": {
    "id": "anonymous"
  }
}
```

### Log Integrity and Protection
Logs are high-value targets for attackers seeking to cover their tracks. Protect log files through:
- **Immutable Log Storage**: Stream logs immediately to external, write-once-read-many (WORM) storage systems.
- **HMAC Chaining**: In high-security systems, cryptographically sign log entries. By hashing each log entry with the hash of the previous log entry and a secret key (HMAC), tampering with older log records breaks the validation chain.

---

## 5. Regulatory Compliance Checklist

| Standard | Requirement | Zcalculate Implementation Plan | Status |
| :--- | :--- | :--- | :--- |
| **GDPR** | **Right to Erasure (Article 17)** | Any feedback or data saved must support a mechanism to delete user records based on request identifier or email. | Planned |
| **GDPR** | **Consent & Cookies (Article 6)** | Consent must be obtained before storing tracking cookies (Zcalculate runs fully cookie-less, minimizing compliance overhead). | Compliant |
| **GDPR** | **Encryption at Rest** | Feedback storage files (`user_feedback.json`) and database volumes must be encrypted using AES-256. | Planned |
| **PCI-DSS** | **Data Isolation (Req 1.3)** | Direct database access is blocked. Front-end calculator pages never directly communicate with any card processing layers. | Compliant |
| **PCI-DSS** | **Transmission Security (Req 4.1)** | Enforce modern TLS v1.3 and strong cipher suites. Strict HSTS headers prevent downgrade attacks. | Compliant |
| **OWASP Top 10**| **A03: Injection mitigation** | Enforce query parametrization, secure deserialization, and strict input validation. | Hardened |
