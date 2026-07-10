// ============================================================================
// scientificCalculator.ts — 4-Mode Scientific Calculator Engine
// Modes: Standard | Programmable | Graphing | CAS
// ============================================================================

// ==================== PHYSICAL CONSTANTS ====================
export const PHYSICAL_CONSTANTS: Record<string, { value: number; unit: string; label: string }> = {
  c:    { value: 299792458,       unit: 'm/s',    label: 'Speed of Light' },
  G:    { value: 6.67430e-11,     unit: 'N·m²/kg²', label: 'Gravitational Const' },
  Na:   { value: 6.02214076e23,   unit: '1/mol',  label: 'Avogadro Number' },
  h:    { value: 6.62607015e-34,  unit: 'J·s',    label: 'Planck Constant' },
  kB:   { value: 1.380649e-23,    unit: 'J/K',    label: 'Boltzmann Const' },
  qe:   { value: 1.602176634e-19, unit: 'C',      label: 'Electron Charge' },
  me:   { value: 9.1093837015e-31,unit: 'kg',     label: 'Electron Mass' },
  mp:   { value: 1.67262192369e-27, unit: 'kg',   label: 'Proton Mass' },
  R:    { value: 8.314462618,     unit: 'J/(mol·K)', label: 'Gas Constant' },
  sigma:{ value: 5.670374419e-8,  unit: 'W/(m²·K⁴)', label: 'Stefan-Boltzmann' },
  mu0:  { value: 1.25663706212e-6,unit: 'N/A²',   label: 'Vacuum Permeability' },
  eps0: { value: 8.8541878128e-12,unit: 'F/m',    label: 'Vacuum Permittivity' },
  atm:  { value: 101325,          unit: 'Pa',     label: 'Standard Atmosphere' },
};

// ==================== HELPER MATH FUNCTIONS ====================
export function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= Math.floor(n); i++) r *= i;
  return r;
}

export function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export function nPr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

export function mean(data: number[]): number {
  if (data.length === 0) return 0;
  return data.reduce((a, b) => a + b, 0) / data.length;
}

export function variance(data: number[], population = true): number {
  if (data.length === 0) return 0;
  const m = mean(data);
  const ss = data.reduce((s, v) => s + (v - m) ** 2, 0);
  return ss / (population ? data.length : Math.max(data.length - 1, 1));
}

export function stddev(data: number[], population = true): number {
  return Math.sqrt(variance(data, population));
}

// Rect to Polar
export function rectToPol(x: number, y: number): { r: number; theta: number } {
  return { r: Math.sqrt(x * x + y * y), theta: Math.atan2(y, x) };
}

// Polar to Rect
export function polToRect(r: number, theta: number): { x: number; y: number } {
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
}

// DMS to Decimal degrees
export function dmsToDec(deg: number, min: number, sec: number): number {
  const sign = deg < 0 ? -1 : 1;
  return sign * (Math.abs(deg) + min / 60 + sec / 3600);
}

// Decimal degrees to DMS
export function decToDms(decimal: number): { deg: number; min: number; sec: number } {
  const sign = decimal < 0 ? -1 : 1;
  const abs = Math.abs(decimal);
  const deg = Math.floor(abs);
  const mf = (abs - deg) * 60;
  const min = Math.floor(mf);
  const sec = (mf - min) * 60;
  return { deg: sign * deg, min, sec: Math.round(sec * 1000) / 1000 };
}

// ==================== STANDARD ENGINE ====================
export class StandardEngine {
  expr = '';
  angleMode: 'DEG' | 'RAD' | 'GRAD' = 'DEG';
  lastAnswer = 0;
  memory = 0;

  private toRad(v: number): number {
    if (this.angleMode === 'DEG') return v * Math.PI / 180;
    if (this.angleMode === 'GRAD') return v * Math.PI / 200;
    return v;
  }

  private fromRad(v: number): number {
    if (this.angleMode === 'DEG') return v * 180 / Math.PI;
    if (this.angleMode === 'GRAD') return v * 200 / Math.PI;
    return v;
  }

  evaluate(expression: string): number {
    let prep = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, `(${Math.PI})`)
      .replace(/Ans/gi, `(${this.lastAnswer})`);

    // Replace standalone 'e' (not inside function names)
    prep = prep.replace(/(?<![a-zA-Z])e(?![a-zA-Z])/g, `(${Math.E})`);

    // Handle factorial
    prep = prep.replace(/(\d+(?:\.\d+)?)\!/g, (_, n) => factorial(parseFloat(n)).toString());

    // nCr and nPr
    prep = prep.replace(/nCr\(([^,]+),([^)]+)\)/g, (_, a, b) => nCr(parseFloat(a), parseFloat(b)).toString());
    prep = prep.replace(/nPr\(([^,]+),([^)]+)\)/g, (_, a, b) => nPr(parseFloat(a), parseFloat(b)).toString());

    // 10^x and e^x
    prep = prep.replace(/tenPow\(([^)]+)\)/g, (_, a) => Math.pow(10, parseFloat(a)).toString());
    prep = prep.replace(/ePow\(([^)]+)\)/g, (_, a) => Math.exp(parseFloat(a)).toString());

    // x^-1
    prep = prep.replace(/inv\(([^)]+)\)/g, (_, a) => (1 / parseFloat(a)).toString());

    // Trig functions with angle mode
    const d2r = (v: string) => this.toRad(parseFloat(v)).toString();

    if (this.angleMode !== 'RAD') {
      prep = prep.replace(/sin\(([^)]+)\)/g, (_, a) => `Math.sin(${this.toRad(1)}*(${a}))`);
      prep = prep.replace(/cos\(([^)]+)\)/g, (_, a) => `Math.cos(${this.toRad(1)}*(${a}))`);
      prep = prep.replace(/tan\(([^)]+)\)/g, (_, a) => `Math.tan(${this.toRad(1)}*(${a}))`);
      prep = prep.replace(/asin\(([^)]+)\)/g, (_, a) => `(${this.fromRad(1)}*Math.asin(${a}))`);
      prep = prep.replace(/acos\(([^)]+)\)/g, (_, a) => `(${this.fromRad(1)}*Math.acos(${a}))`);
      prep = prep.replace(/atan\(([^)]+)\)/g, (_, a) => `(${this.fromRad(1)}*Math.atan(${a}))`);
    } else {
      prep = prep.replace(/sin\(/g, 'Math.sin(');
      prep = prep.replace(/cos\(/g, 'Math.cos(');
      prep = prep.replace(/tan\(/g, 'Math.tan(');
      prep = prep.replace(/asin\(/g, 'Math.asin(');
      prep = prep.replace(/acos\(/g, 'Math.acos(');
      prep = prep.replace(/atan\(/g, 'Math.atan(');
    }

    prep = prep.replace(/ln\(/g, 'Math.log(');
    prep = prep.replace(/log\(/g, 'Math.log10(');
    prep = prep.replace(/sqrt\(/g, 'Math.sqrt(');
    prep = prep.replace(/abs\(/g, 'Math.abs(');
    prep = prep.replace(/\^/g, '**');

    try {
      const result = new Function(`return ${prep}`)();
      if (typeof result === 'number' && !isNaN(result)) {
        this.lastAnswer = result;
        return result;
      }
      return NaN;
    } catch {
      return NaN;
    }
  }

  formatResult(n: number): string {
    if (isNaN(n)) return 'Error';
    if (!isFinite(n)) return n > 0 ? '∞' : '-∞';
    if (Math.abs(n) > 1e15 || (Math.abs(n) < 1e-10 && n !== 0)) {
      return n.toExponential(8);
    }
    return Number(n.toFixed(10)).toString();
  }
}

// ==================== PROGRAMMABLE ENGINE ====================
export class ProgrammableEngine {
  variables: Map<string, any> = new Map();
  output: string[] = [];
  running = false;
  private maxIterations = 100000;
  macroRecording: string[] = [];
  isRecording = false;
  programs: { name: string; code: string }[] = [];

  constructor() {
    this.loadPrograms();
  }

  recordKeystroke(key: string) {
    if (this.isRecording) this.macroRecording.push(key);
  }

  startRecording() {
    this.isRecording = true;
    this.macroRecording = [];
  }

  stopRecording(): string {
    this.isRecording = false;
    const code = this.macroRecording.map(k => {
      if (k === '=') return 'eval()';
      if (k === 'clear') return 'clear()';
      return `push("${k}")`;
    }).join('\n');
    return code;
  }

  run(code: string, stdEngine: StandardEngine): { output: string[]; variables: Record<string, any>; error?: string } {
    this.output = [];
    this.variables.clear();
    this.running = true;
    let iterCount = 0;

    // Inject standard math functions into scope
    const mathFuncs: Record<string, Function> = {
      sin: (x: number) => Math.sin(stdEngine.angleMode === 'DEG' ? x * Math.PI / 180 : stdEngine.angleMode === 'GRAD' ? x * Math.PI / 200 : x),
      cos: (x: number) => Math.cos(stdEngine.angleMode === 'DEG' ? x * Math.PI / 180 : stdEngine.angleMode === 'GRAD' ? x * Math.PI / 200 : x),
      tan: (x: number) => Math.tan(stdEngine.angleMode === 'DEG' ? x * Math.PI / 180 : stdEngine.angleMode === 'GRAD' ? x * Math.PI / 200 : x),
      sqrt: Math.sqrt,
      abs: Math.abs,
      log: Math.log10,
      ln: Math.log,
      exp: Math.exp,
      pow: Math.pow,
      floor: Math.floor,
      ceil: Math.ceil,
      round: Math.round,
      random: Math.random,
      PI: Math.PI,
      E: Math.E,
      factorial,
      nCr,
      nPr,
      mean: (arr: number[]) => mean(arr),
      stddev: (arr: number[]) => stddev(arr),
    };

    try {
      // Build a sandboxed function
      const varStore = this.variables;
      const outputArr = this.output;

      // Simple approach: evaluate as JavaScript with injected functions
      const funcNames = Object.keys(mathFuncs);
      const funcValues = Object.values(mathFuncs);

      const wrappedCode = `
        "use strict";
        let __iterCount = 0;
        const __maxIter = ${this.maxIterations};
        function __checkIter() { if (++__iterCount > __maxIter) throw new Error("Max iterations exceeded (infinite loop protection)"); }
        
        // Override loops with iteration checks
        ${code}
      `;

      // Inject print function and math functions
      const printFn = (...args: any[]) => {
        outputArr.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      };

      const fn = new Function('print', 'println', ...funcNames, wrappedCode);
      fn(printFn, (...args: any[]) => { printFn(...args); }, ...funcValues);

      // Extract variables from the code execution context
      // Since we can't easily get `let` variables, we parse assignments
      const assignRegex = /(?:let|var|const)?\s*(\w+)\s*=\s*(.+)/g;
      let match;
      while ((match = assignRegex.exec(code)) !== null) {
        const varName = match[1];
        if (!['let', 'var', 'const', 'function', 'if', 'for', 'while'].includes(varName)) {
          this.variables.set(varName, '(executed)');
        }
      }

    } catch (e: any) {
      this.output.push(`Error: ${e.message}`);
      return {
        output: this.output,
        variables: Object.fromEntries(this.variables),
        error: e.message
      };
    }

    this.running = false;
    return {
      output: this.output,
      variables: Object.fromEntries(this.variables)
    };
  }

  saveProgram(slot: number, name: string, code: string) {
    while (this.programs.length <= slot) this.programs.push({ name: '', code: '' });
    this.programs[slot] = { name, code };
    try { localStorage.setItem('zcalc_programs', JSON.stringify(this.programs)); } catch {}
  }

  loadPrograms() {
    try {
      const raw = localStorage.getItem('zcalc_programs');
      if (raw) this.programs = JSON.parse(raw);
    } catch {}
    while (this.programs.length < 10) this.programs.push({ name: '', code: '' });
  }

  getProgram(slot: number): { name: string; code: string } {
    return this.programs[slot] || { name: '', code: '' };
  }
}

// ==================== GRAPHING ENGINE ====================
export class GraphingEngine {
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  
  // Viewport
  xMin = -10;
  xMax = 10;
  yMin = -7;
  yMax = 7;

  // Functions
  functions: { expr: string; color: string; visible: boolean }[] = [
    { expr: '', color: '#0070f3', visible: true },
    { expr: '', color: '#ff0080', visible: true },
    { expr: '', color: '#50e3c2', visible: true },
    { expr: '', color: '#7928ca', visible: true },
  ];

  plotMode: 'cartesian' | 'parametric' | 'polar' = 'cartesian';
  showGrid = true;
  traceMode = false;
  tracePoint: { x: number; y: number } | null = null;

  // Scatter data overlay
  scatterData: { x: number; y: number }[] = [];

  // Table data
  tableData: { x: number; values: number[] }[] = [];

  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.render();
  }

  // Coordinate transforms
  toScreenX(x: number): number {
    if (!this.canvas) return 0;
    return ((x - this.xMin) / (this.xMax - this.xMin)) * this.canvas.width;
  }

  toScreenY(y: number): number {
    if (!this.canvas) return 0;
    return this.canvas.height - ((y - this.yMin) / (this.yMax - this.yMin)) * this.canvas.height;
  }

  toMathX(sx: number): number {
    if (!this.canvas) return 0;
    return this.xMin + (sx / this.canvas.width) * (this.xMax - this.xMin);
  }

  toMathY(sy: number): number {
    if (!this.canvas) return 0;
    return this.yMax - (sy / this.canvas.height) * (this.yMax - this.yMin);
  }

  zoom(factor: number) {
    const cx = (this.xMin + this.xMax) / 2;
    const cy = (this.yMin + this.yMax) / 2;
    const xRange = (this.xMax - this.xMin) * factor / 2;
    const yRange = (this.yMax - this.yMin) * factor / 2;
    this.xMin = cx - xRange;
    this.xMax = cx + xRange;
    this.yMin = cy - yRange;
    this.yMax = cy + yRange;
    this.render();
  }

  pan(dx: number, dy: number) {
    const xShift = dx * (this.xMax - this.xMin);
    const yShift = dy * (this.yMax - this.yMin);
    this.xMin -= xShift;
    this.xMax -= xShift;
    this.yMin += yShift;
    this.yMax += yShift;
    this.render();
  }

  resetView() {
    this.xMin = -10;
    this.xMax = 10;
    this.yMin = -7;
    this.yMax = 7;
    this.render();
  }

  private evaluateExpr(expr: string, varName: string, value: number): number {
    try {
      // Try math.js first if available
      const mathjs = (window as any).math;
      if (mathjs) {
        const scope: Record<string, number> = {};
        scope[varName] = value;
        scope['pi'] = Math.PI;
        scope['e'] = Math.E;
        return mathjs.evaluate(expr, scope);
      }
      // Fallback: simple JS eval
      let prep = expr
        .replace(/\bsin\b/g, 'Math.sin')
        .replace(/\bcos\b/g, 'Math.cos')
        .replace(/\btan\b/g, 'Math.tan')
        .replace(/\bsqrt\b/g, 'Math.sqrt')
        .replace(/\babs\b/g, 'Math.abs')
        .replace(/\blog\b/g, 'Math.log10')
        .replace(/\bln\b/g, 'Math.log')
        .replace(/\bexp\b/g, 'Math.exp')
        .replace(/\bpi\b/g, String(Math.PI))
        .replace(/\^/g, '**');
      const fn = new Function(varName, `return ${prep}`);
      return fn(value);
    } catch {
      return NaN;
    }
  }

  render() {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Get computed styles for theming
    const rootStyles = getComputedStyle(document.documentElement);
    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#0a0a0c' : '#fafafa';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const axisColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
    const textColor = isDark ? '#71717a' : '#888888';

    // Clear
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    // Grid
    if (this.showGrid) {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      const xStep = this.niceStep((this.xMax - this.xMin) / 10);
      const yStep = this.niceStep((this.yMax - this.yMin) / 8);

      const xStart = Math.ceil(this.xMin / xStep) * xStep;
      for (let x = xStart; x <= this.xMax; x += xStep) {
        const sx = this.toScreenX(x);
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx, h);
        ctx.stroke();
      }

      const yStart = Math.ceil(this.yMin / yStep) * yStep;
      for (let y = yStart; y <= this.yMax; y += yStep) {
        const sy = this.toScreenY(y);
        ctx.beginPath();
        ctx.moveTo(0, sy);
        ctx.lineTo(w, sy);
        ctx.stroke();
      }

      // Axis labels
      ctx.fillStyle = textColor;
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      for (let x = xStart; x <= this.xMax; x += xStep) {
        const sx = this.toScreenX(x);
        const label = Math.abs(x) < 1e-10 ? '0' : Number(x.toPrecision(4)).toString();
        ctx.fillText(label, sx, this.toScreenY(0) + 14);
      }
      ctx.textAlign = 'right';
      for (let y = yStart; y <= this.yMax; y += yStep) {
        if (Math.abs(y) < 1e-10) continue;
        const sy = this.toScreenY(y);
        ctx.fillText(Number(y.toPrecision(4)).toString(), this.toScreenX(0) - 6, sy + 4);
      }
    }

    // Axes
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1.5;
    const originX = this.toScreenX(0);
    const originY = this.toScreenY(0);
    if (originX >= 0 && originX <= w) {
      ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, h); ctx.stroke();
    }
    if (originY >= 0 && originY <= h) {
      ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(w, originY); ctx.stroke();
    }

    // Plot functions
    const samples = w * 2;
    this.functions.forEach((fn, idx) => {
      if (!fn.expr || !fn.visible) return;

      ctx.strokeStyle = fn.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      let started = false;

      if (this.plotMode === 'cartesian') {
        for (let i = 0; i <= samples; i++) {
          const x = this.xMin + (i / samples) * (this.xMax - this.xMin);
          const y = this.evaluateExpr(fn.expr, 'x', x);
          if (isNaN(y) || !isFinite(y)) { started = false; continue; }
          const sx = this.toScreenX(x);
          const sy = this.toScreenY(y);
          if (sy < -1000 || sy > h + 1000) { started = false; continue; }
          if (!started) { ctx.moveTo(sx, sy); started = true; }
          else ctx.lineTo(sx, sy);
        }
      } else if (this.plotMode === 'polar') {
        for (let i = 0; i <= samples; i++) {
          const theta = (i / samples) * 4 * Math.PI;
          const r = this.evaluateExpr(fn.expr, 'theta', theta);
          if (isNaN(r) || !isFinite(r)) { started = false; continue; }
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          const sx = this.toScreenX(x);
          const sy = this.toScreenY(y);
          if (!started) { ctx.moveTo(sx, sy); started = true; }
          else ctx.lineTo(sx, sy);
        }
      } else if (this.plotMode === 'parametric') {
        // Expression format: "cos(t), sin(t)"
        const parts = fn.expr.split(',').map(s => s.trim());
        if (parts.length === 2) {
          for (let i = 0; i <= samples; i++) {
            const t = this.xMin + (i / samples) * (this.xMax - this.xMin);
            const x = this.evaluateExpr(parts[0], 't', t);
            const y = this.evaluateExpr(parts[1], 't', t);
            if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) { started = false; continue; }
            const sx = this.toScreenX(x);
            const sy = this.toScreenY(y);
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
          }
        }
      }
      ctx.stroke();
    });

    // Scatter data overlay
    if (this.scatterData.length > 0) {
      ctx.fillStyle = isDark ? '#facc15' : '#d97706';
      this.scatterData.forEach(pt => {
        const sx = this.toScreenX(pt.x);
        const sy = this.toScreenY(pt.y);
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Trace point
    if (this.tracePoint) {
      const sx = this.toScreenX(this.tracePoint.x);
      const sy = this.toScreenY(this.tracePoint.y);
      
      // Crosshair
      ctx.strokeStyle = isDark ? '#ededed' : '#171717';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(w, sy); ctx.stroke();
      ctx.setLineDash([]);

      // Point
      ctx.fillStyle = '#0070f3';
      ctx.beginPath();
      ctx.arc(sx, sy, 5, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = isDark ? '#ededed' : '#171717';
      ctx.font = 'bold 11px monospace';
      const label = `(${this.tracePoint.x.toFixed(4)}, ${this.tracePoint.y.toFixed(4)})`;
      const lx = sx + 10 > w - 120 ? sx - 130 : sx + 10;
      const ly = sy - 10 < 20 ? sy + 20 : sy - 10;
      
      // Background for label
      const metrics = ctx.measureText(label);
      ctx.fillStyle = isDark ? 'rgba(18,18,20,0.9)' : 'rgba(255,255,255,0.9)';
      ctx.fillRect(lx - 4, ly - 12, metrics.width + 8, 18);
      ctx.fillStyle = isDark ? '#ededed' : '#171717';
      ctx.fillText(label, lx, ly);
    }
  }

  private niceStep(rough: number): number {
    const pow10 = Math.pow(10, Math.floor(Math.log10(rough)));
    const frac = rough / pow10;
    if (frac <= 1) return pow10;
    if (frac <= 2) return 2 * pow10;
    if (frac <= 5) return 5 * pow10;
    return 10 * pow10;
  }

  // Analysis tools
  findZeros(fnIndex: number): number[] {
    const fn = this.functions[fnIndex];
    if (!fn || !fn.expr) return [];
    const zeros: number[] = [];
    const step = (this.xMax - this.xMin) / 1000;
    let prevY = this.evaluateExpr(fn.expr, 'x', this.xMin);
    
    for (let x = this.xMin + step; x <= this.xMax; x += step) {
      const y = this.evaluateExpr(fn.expr, 'x', x);
      if (isNaN(prevY) || isNaN(y)) { prevY = y; continue; }
      if (prevY * y <= 0) {
        // Bisection refinement
        let lo = x - step, hi = x;
        for (let i = 0; i < 50; i++) {
          const mid = (lo + hi) / 2;
          const mv = this.evaluateExpr(fn.expr, 'x', mid);
          if (isNaN(mv)) break;
          if (this.evaluateExpr(fn.expr, 'x', lo) * mv <= 0) hi = mid;
          else lo = mid;
        }
        zeros.push(Number(((lo + hi) / 2).toFixed(6)));
      }
      prevY = y;
    }
    return zeros;
  }

  findExtrema(fnIndex: number): { minima: { x: number; y: number }[]; maxima: { x: number; y: number }[] } {
    const fn = this.functions[fnIndex];
    if (!fn || !fn.expr) return { minima: [], maxima: [] };
    const minima: { x: number; y: number }[] = [];
    const maxima: { x: number; y: number }[] = [];
    const step = (this.xMax - this.xMin) / 500;
    const h = step / 100;

    for (let x = this.xMin + step; x <= this.xMax - step; x += step) {
      const dy = (this.evaluateExpr(fn.expr, 'x', x + h) - this.evaluateExpr(fn.expr, 'x', x - h)) / (2 * h);
      const dyNext = (this.evaluateExpr(fn.expr, 'x', x + step + h) - this.evaluateExpr(fn.expr, 'x', x + step - h)) / (2 * h);
      
      if (isNaN(dy) || isNaN(dyNext)) continue;
      
      if (dy * dyNext < 0) {
        // Refinement
        let lo = x, hi = x + step;
        for (let i = 0; i < 40; i++) {
          const mid = (lo + hi) / 2;
          const dmid = (this.evaluateExpr(fn.expr, 'x', mid + h) - this.evaluateExpr(fn.expr, 'x', mid - h)) / (2 * h);
          if (isNaN(dmid)) break;
          const dlo = (this.evaluateExpr(fn.expr, 'x', lo + h) - this.evaluateExpr(fn.expr, 'x', lo - h)) / (2 * h);
          if (dlo * dmid < 0) hi = mid;
          else lo = mid;
        }
        const xExt = (lo + hi) / 2;
        const yExt = this.evaluateExpr(fn.expr, 'x', xExt);
        if (!isNaN(yExt)) {
          // Check second derivative for classification
          const d2y = (this.evaluateExpr(fn.expr, 'x', xExt + h) - 2 * this.evaluateExpr(fn.expr, 'x', xExt) + this.evaluateExpr(fn.expr, 'x', xExt - h)) / (h * h);
          if (d2y > 0) minima.push({ x: Number(xExt.toFixed(6)), y: Number(yExt.toFixed(6)) });
          else if (d2y < 0) maxima.push({ x: Number(xExt.toFixed(6)), y: Number(yExt.toFixed(6)) });
        }
      }
    }
    return { minima, maxima };
  }

  numericalIntegral(fnIndex: number, a: number, b: number): number {
    const fn = this.functions[fnIndex];
    if (!fn || !fn.expr) return NaN;
    // Simpson's rule with n=1000
    const n = 1000;
    const h = (b - a) / n;
    let sum = this.evaluateExpr(fn.expr, 'x', a) + this.evaluateExpr(fn.expr, 'x', b);
    for (let i = 1; i < n; i++) {
      const x = a + i * h;
      sum += (i % 2 === 0 ? 2 : 4) * this.evaluateExpr(fn.expr, 'x', x);
    }
    return (h / 3) * sum;
  }

  numericalDerivative(fnIndex: number, x0: number): number {
    const fn = this.functions[fnIndex];
    if (!fn || !fn.expr) return NaN;
    const h = 1e-7;
    return (this.evaluateExpr(fn.expr, 'x', x0 + h) - this.evaluateExpr(fn.expr, 'x', x0 - h)) / (2 * h);
  }

  generateTable(fnIndex: number = 0, start?: number, end?: number, step?: number): { x: number; values: number[] }[] {
    const s = start ?? this.xMin;
    const e = end ?? this.xMax;
    const st = step ?? (e - s) / 20;
    const table: { x: number; values: number[] }[] = [];
    
    for (let x = s; x <= e + st / 2; x += st) {
      const values = this.functions.map(fn => {
        if (!fn.expr || !fn.visible) return NaN;
        return this.evaluateExpr(fn.expr, 'x', x);
      });
      table.push({ x: Number(x.toFixed(6)), values });
    }
    this.tableData = table;
    return table;
  }

  parseScatterData(input: string) {
    this.scatterData = [];
    const lines = input.trim().split('\n');
    lines.forEach(line => {
      const parts = line.split(/[,\t\s]+/).map(Number);
      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        this.scatterData.push({ x: parts[0], y: parts[1] });
      }
    });
    this.render();
  }
}

// ==================== CAS ENGINE ====================
export class CASEngine {
  history: { input: string; output: string }[] = [];
  variables: Record<string, any> = {};

  private getMathJS(): any {
    return (window as any).math;
  }

  evaluate(input: string): string {
    const mathjs = this.getMathJS();
    if (!mathjs) return 'Error: math.js not loaded';

    try {
      // Check for operation commands
      const trimmed = input.trim();

      // Variable assignment
      if (trimmed.includes('=') && !trimmed.startsWith('solve') && !trimmed.includes('==')) {
        const parts = trimmed.split('=');
        if (parts.length === 2) {
          const varName = parts[0].trim();
          const value = mathjs.evaluate(parts[1].trim(), this.variables);
          this.variables[varName] = value;
          const result = this.formatCASResult(value);
          this.addHistory(input, result);
          return `${varName} = ${result}`;
        }
      }

      // Evaluate with current variables
      const result = mathjs.evaluate(trimmed, this.variables);
      const formatted = this.formatCASResult(result);
      this.addHistory(input, formatted);
      return formatted;
    } catch (e: any) {
      const errorMsg = `Error: ${e.message}`;
      this.addHistory(input, errorMsg);
      return errorMsg;
    }
  }

  factor(expr: string): string {
    const mathjs = this.getMathJS();
    if (!mathjs) return 'Error: math.js not loaded';
    try {
      const node = mathjs.parse(expr);
      const rationalized = mathjs.rationalize(expr);
      const result = rationalized.toString();
      this.addHistory(`factor(${expr})`, result);
      return result;
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }

  expand(expr: string): string {
    const mathjs = this.getMathJS();
    if (!mathjs) return 'Error: math.js not loaded';
    try {
      // Simplify will expand
      const simplified = mathjs.simplify(expr);
      const result = simplified.toString();
      this.addHistory(`expand(${expr})`, result);
      return result;
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }

  simplify(expr: string): string {
    const mathjs = this.getMathJS();
    if (!mathjs) return 'Error: math.js not loaded';
    try {
      const simplified = mathjs.simplify(expr);
      const result = simplified.toString();
      this.addHistory(`simplify(${expr})`, result);
      return result;
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }

  derivative(expr: string, variable: string = 'x'): string {
    const mathjs = this.getMathJS();
    if (!mathjs) return 'Error: math.js not loaded';
    try {
      const d = mathjs.derivative(expr, variable);
      const simplified = mathjs.simplify(d);
      const result = simplified.toString();
      this.addHistory(`d/d${variable}(${expr})`, result);
      return result;
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }

  integrate(expr: string, variable: string = 'x', a?: number, b?: number): string {
    const mathjs = this.getMathJS();
    if (!mathjs) return 'Error: math.js not loaded';

    if (a !== undefined && b !== undefined) {
      // Definite integral via Simpson's rule
      try {
        const n = 10000;
        const h = (b - a) / n;
        const scope: Record<string, number> = { ...this.variables as any };
        
        const f = (val: number) => {
          scope[variable] = val;
          return mathjs.evaluate(expr, scope);
        };
        
        let sum = f(a) + f(b);
        for (let i = 1; i < n; i++) {
          sum += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
        }
        const result = Number(((h / 3) * sum).toFixed(8)).toString();
        this.addHistory(`∫(${expr})d${variable} from ${a} to ${b}`, result);
        return result;
      } catch (e: any) {
        return `Error: ${e.message}`;
      }
    }

    // Symbolic — attempt common patterns
    try {
      // Try basic antiderivatives
      const result = this.symbolicIntegral(expr, variable);
      this.addHistory(`∫(${expr})d${variable}`, result);
      return result;
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }

  private symbolicIntegral(expr: string, v: string): string {
    const mathjs = this.getMathJS();
    // Common antiderivatives
    const trimmed = expr.trim();
    
    // Power rule: x^n -> x^(n+1)/(n+1)
    const powerMatch = trimmed.match(new RegExp(`^${v}\\^(\\d+)$`));
    if (powerMatch) {
      const n = parseInt(powerMatch[1]);
      return `${v}^${n + 1}/${n + 1} + C`;
    }
    
    // Just x -> x^2/2
    if (trimmed === v) return `${v}^2/2 + C`;
    
    // Constant
    if (!trimmed.includes(v)) return `${trimmed} * ${v} + C`;
    
    // sin(x) -> -cos(x)
    if (trimmed === `sin(${v})`) return `-cos(${v}) + C`;
    if (trimmed === `cos(${v})`) return `sin(${v}) + C`;
    if (trimmed === `exp(${v})`) return `exp(${v}) + C`;
    if (trimmed === `1/${v}`) return `ln(abs(${v})) + C`;

    // Fallback: numerical note
    return `[No closed form found. Use definite integral for numerical results.]`;
  }

  solve(equation: string, variable: string = 'x'): string {
    const mathjs = this.getMathJS();
    if (!mathjs) return 'Error: math.js not loaded';
    try {
      // Parse equation: expr = 0 or expr1 = expr2
      let lhs: string, rhs: string;
      if (equation.includes('=')) {
        const parts = equation.split('=');
        lhs = parts[0].trim();
        rhs = parts[1].trim();
      } else {
        lhs = equation;
        rhs = '0';
      }

      // Move everything to left side
      const fullExpr = `(${lhs}) - (${rhs})`;

      // Newton-Raphson for numerical roots
      const roots: number[] = [];
      const scope: Record<string, number> = {};
      const f = (val: number) => {
        scope[variable] = val;
        return mathjs.evaluate(fullExpr, scope);
      };
      const df = (val: number) => {
        const h = 1e-8;
        return (f(val + h) - f(val - h)) / (2 * h);
      };

      // Try multiple starting points
      const starts = [-10, -5, -2, -1, -0.5, 0, 0.5, 1, 2, 5, 10];
      for (const x0 of starts) {
        let x = x0;
        let converged = false;
        for (let i = 0; i < 100; i++) {
          const fx = f(x);
          const dfx = df(x);
          if (Math.abs(dfx) < 1e-15) break;
          const xNew = x - fx / dfx;
          if (Math.abs(xNew - x) < 1e-10) { converged = true; x = xNew; break; }
          x = xNew;
        }
        if (converged && Math.abs(f(x)) < 1e-8) {
          const rounded = Number(x.toFixed(8));
          if (!roots.some(r => Math.abs(r - rounded) < 1e-6)) {
            roots.push(rounded);
          }
        }
      }

      if (roots.length === 0) {
        this.addHistory(`solve(${equation})`, 'No real solutions found');
        return 'No real solutions found in [-10, 10]';
      }

      const result = `${variable} = ${roots.join(', ')}`;
      this.addHistory(`solve(${equation})`, result);
      return result;
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }

  taylor(expr: string, variable: string = 'x', center: number = 0, order: number = 5): string {
    const mathjs = this.getMathJS();
    if (!mathjs) return 'Error: math.js not loaded';
    try {
      const scope: Record<string, number> = {};
      const f = (val: number) => {
        scope[variable] = val;
        return mathjs.evaluate(expr, scope);
      };

      // Compute coefficients via numerical differentiation
      const h = 1e-5;
      const coeffs: number[] = [];
      
      // f(a)
      coeffs.push(f(center));
      
      // Higher order derivatives via finite differences
      for (let n = 1; n <= order; n++) {
        let deriv = 0;
        for (let k = 0; k <= n; k++) {
          const sign = (n - k) % 2 === 0 ? 1 : -1;
          const binom = nCr(n, k);
          deriv += sign * binom * f(center + k * h);
        }
        deriv /= Math.pow(h, n);
        coeffs.push(deriv / factorial(n));
      }

      // Build polynomial string
      const terms: string[] = [];
      for (let n = 0; n <= order; n++) {
        const c = Number(coeffs[n].toPrecision(6));
        if (Math.abs(c) < 1e-12) continue;
        
        let term = '';
        if (n === 0) {
          term = c.toString();
        } else if (n === 1) {
          if (center === 0) term = `${c}${variable}`;
          else term = `${c}(${variable}-${center})`;
        } else {
          if (center === 0) term = `${c}${variable}^${n}`;
          else term = `${c}(${variable}-${center})^${n}`;
        }
        
        if (terms.length > 0 && c > 0) term = '+ ' + term;
        terms.push(term);
      }

      const result = terms.join(' ') || '0';
      this.addHistory(`taylor(${expr}, order=${order})`, result);
      return result;
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }

  limit(expr: string, variable: string = 'x', approach: number = 0): string {
    const mathjs = this.getMathJS();
    if (!mathjs) return 'Error: math.js not loaded';
    try {
      const scope: Record<string, number> = {};
      const f = (val: number) => {
        scope[variable] = val;
        return mathjs.evaluate(expr, scope);
      };

      // Approach from both sides
      const deltas = [1e-3, 1e-5, 1e-7, 1e-9, 1e-11];
      const fromLeft = deltas.map(d => f(approach - d));
      const fromRight = deltas.map(d => f(approach + d));

      const leftLimit = fromLeft[fromLeft.length - 1];
      const rightLimit = fromRight[fromRight.length - 1];

      if (isNaN(leftLimit) && isNaN(rightLimit)) return 'Undefined';
      if (!isFinite(leftLimit) || !isFinite(rightLimit)) {
        if (leftLimit === rightLimit) return leftLimit > 0 ? '∞' : '-∞';
        return 'Does not exist (diverges)';
      }
      if (Math.abs(leftLimit - rightLimit) > 1e-4) {
        return `Does not exist (left: ${leftLimit.toFixed(6)}, right: ${rightLimit.toFixed(6)})`;
      }

      const result = Number(((leftLimit + rightLimit) / 2).toFixed(8)).toString();
      this.addHistory(`lim(${expr}) as ${variable}→${approach}`, result);
      return result;
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }

  private formatCASResult(value: any): string {
    if (value === null || value === undefined) return 'undefined';
    const mathjs = this.getMathJS();
    if (mathjs) {
      try {
        // Check if it's a matrix
        if (value.type === 'Matrix' || value.type === 'DenseMatrix') {
          return mathjs.format(value, { precision: 6 });
        }
        // Check if it's a complex number
        if (value.re !== undefined && value.im !== undefined) {
          const re = Number(value.re.toFixed(8));
          const im = Number(value.im.toFixed(8));
          if (im === 0) return re.toString();
          if (re === 0) return `${im}i`;
          return `${re} ${im > 0 ? '+' : '-'} ${Math.abs(im)}i`;
        }
        // fraction representation
        if (typeof value === 'number') {
          const frac = mathjs.fraction(value);
          if (frac.d !== 1 && frac.d < 10000 && Math.abs(value) < 1e10) {
            const fracStr = `${frac.s * frac.n}/${frac.d}`;
            const decStr = Number(value.toFixed(10)).toString();
            if (fracStr.length < decStr.length + 5) {
              return `${fracStr}  (≈ ${decStr})`;
            }
          }
        }
      } catch {}
    }
    if (typeof value === 'number') {
      if (!isFinite(value)) return value > 0 ? '∞' : '-∞';
      if (isNaN(value)) return 'NaN';
      return Number(value.toFixed(10)).toString();
    }
    return String(value);
  }

  private addHistory(input: string, output: string) {
    this.history.unshift({ input, output });
    if (this.history.length > 50) this.history.pop();
  }
}

// ==================== MAIN CONTROLLER ====================
export class ScientificCalculatorController {
  standard = new StandardEngine();
  programmable = new ProgrammableEngine();
  graphing = new GraphingEngine();
  cas = new CASEngine();
  currentMode: 'standard' | 'programmable' | 'graphing' | 'cas' = 'standard';

  switchMode(mode: 'standard' | 'programmable' | 'graphing' | 'cas') {
    this.currentMode = mode;
  }
}
