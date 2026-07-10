// Zcalculate Math Utilities for Client-Side Computations

// ==================== FINANCIAL FORMULAS ====================

export function calculateMortgage(homeValue: number, downPayment: number, interestRate: number, loanTermYears: number) {
  const principal = Math.max(0, homeValue - downPayment);
  const monthlyRate = interestRate / 12 / 100;
  const numPayments = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyPayment = principal / numPayments;
  }

  const totalCost = monthlyPayment * numPayments;
  const totalInterest = totalCost - principal;

  // Generate Amortization Table (Monthly)
  const schedule = [];
  let remainingBalance = principal;
  let accumulatedInterest = 0;
  let accumulatedPrincipal = 0;

  for (let m = 1; m <= numPayments; m++) {
    const interestPaid = remainingBalance * monthlyRate;
    const principalPaid = monthlyPayment - interestPaid;
    remainingBalance = Math.max(0, remainingBalance - principalPaid);
    accumulatedInterest += interestPaid;
    accumulatedPrincipal += principalPaid;

    // Save only annual or milestone values to keep table light
    if (m % 12 === 0 || m === numPayments) {
      schedule.push({
        year: m / 12,
        month: m,
        payment: monthlyPayment,
        principal: principalPaid,
        interest: interestPaid,
        accumulatedInterest,
        accumulatedPrincipal,
        balance: remainingBalance
      });
    }
  }

  return {
    monthlyPayment,
    principal,
    totalInterest,
    totalCost,
    schedule
  };
}

export function calculateLoan(loanAmount: number, interestRate: number, loanTermYears: number) {
  const monthlyRate = interestRate / 12 / 100;
  const numPayments = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyPayment = loanAmount / numPayments;
  }

  const totalCost = monthlyPayment * numPayments;
  const totalInterest = totalCost - loanAmount;

  return {
    monthlyPayment,
    totalInterest,
    totalCost
  };
}

export function calculateAutoLoan(autoPrice: number, downPayment: number, tradeIn: number, interestRate: number, termMonths: number, salesTaxRate: number) {
  const taxAmount = autoPrice * (salesTaxRate / 100);
  const netAutoPrice = autoPrice + taxAmount;
  const principal = Math.max(0, netAutoPrice - downPayment - tradeIn);
  const monthlyRate = interestRate / 12 / 100;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
  } else {
    monthlyPayment = principal / termMonths;
  }

  const totalCost = monthlyPayment * termMonths;
  const totalInterest = totalCost - principal;

  return {
    monthlyPayment,
    totalInterest,
    totalCost,
    taxAmount,
    principal
  };
}

export function calculateInterest(principal: number, interestRate: number, timeYears: number, type: 'compound' | 'simple') {
  const rateFraction = interestRate / 100;
  let totalBalance = 0;
  let totalInterest = 0;

  if (type === 'simple') {
    totalInterest = principal * rateFraction * timeYears;
    totalBalance = principal + totalInterest;
  } else {
    // Standard compound annually
    totalBalance = principal * Math.pow(1 + rateFraction, timeYears);
    totalInterest = totalBalance - principal;
  }

  return {
    totalBalance,
    totalInterest
  };
}

export function calculatePayment(itemPrice: number, downPayment: number, interestRate: number, termMonths: number) {
  const principal = Math.max(0, itemPrice - downPayment);
  const monthlyRate = interestRate / 12 / 100;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
  } else {
    monthlyPayment = principal / termMonths;
  }

  return {
    monthlyPayment,
    totalInterest: (monthlyPayment * termMonths) - principal,
    totalCost: monthlyPayment * termMonths
  };
}

export function calculateRetirement(currentAge: number, retirementAge: number, currentSavings: number, monthlyDeposit: number, returnRate: number, inflationRate: number) {
  const years = retirementAge - currentAge;
  const realReturnRate = (returnRate - inflationRate) / 100;
  const monthlyRate = realReturnRate / 12;
  const months = years * 12;

  let balance = currentSavings;
  let totalDeposits = 0;

  for (let m = 0; m < months; m++) {
    balance = balance * (1 + monthlyRate) + monthlyDeposit;
    totalDeposits += monthlyDeposit;
  }

  const interestEarned = balance - currentSavings - totalDeposits;

  // Assuming a 4% standard retirement draw-down rule
  const monthlyRetirementIncome = (balance * 0.04) / 12;

  return {
    balanceAtRetirement: balance,
    totalDeposits,
    interestEarned,
    monthlyRetirementIncome
  };
}

export function calculateInvestment(startingAmount: number, monthlyContribution: number, annualReturn: number, years: number) {
  const months = years * 12;
  const monthlyRate = annualReturn / 12 / 100;

  let balance = startingAmount;
  let totalContributions = 0;

  for (let m = 0; m < months; m++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
    totalContributions += monthlyContribution;
  }

  const totalInterest = balance - startingAmount - totalContributions;

  return {
    endBalance: balance,
    totalContributions,
    totalInterest
  };
}

export function calculateInflation(startingAmount: number, inflationRate: number, years: number) {
  const rateFraction = inflationRate / 100;
  const futureValue = startingAmount * Math.pow(1 + rateFraction, years);
  const purchasingPower = startingAmount / Math.pow(1 + rateFraction, years);

  return {
    futureValue,
    purchasingPower
  };
}

export function calculateFinanceTVM(pv: number, fv: number, annualRate: number, periods: number) {
  // Calculates missing values (basic time value of money helper)
  const r = annualRate / 100;
  const calculatedFv = pv * Math.pow(1 + r, periods);
  return {
    calculatedFv,
    growthMultiplier: Math.pow(1 + r, periods)
  };
}

export function calculateIncomeTax(grossIncome: number, filingStatus: 'single' | 'married' | 'head') {
  // Standard Deductions 2026 Estimates
  let standardDeduction = 15000;
  if (filingStatus === 'married') standardDeduction = 30000;
  else if (filingStatus === 'head') standardDeduction = 22500;

  const taxableIncome = Math.max(0, grossIncome - standardDeduction);

  // US Federal Tax Brackets (Simplified)
  const brackets = [
    { rate: 0.10, single: 11600, married: 23200, head: 16550 },
    { rate: 0.12, single: 47150, married: 94300, head: 63100 },
    { rate: 0.22, single: 100525, married: 201050, head: 100500 },
    { rate: 0.24, single: 191950, married: 383900, head: 191950 },
    { rate: 0.32, single: 243725, married: 487450, head: 243700 },
    { rate: 0.35, single: 609350, married: 731200, head: 609300 },
    { rate: 0.37, single: Infinity, married: Infinity, head: Infinity }
  ];

  let tax = 0;
  let lastThreshold = 0;

  for (let i = 0; i < brackets.length; i++) {
    const limit = brackets[i][filingStatus];
    const rate = brackets[i].rate;

    if (taxableIncome > limit) {
      tax += (limit - lastThreshold) * rate;
      lastThreshold = limit;
    } else {
      tax += (taxableIncome - lastThreshold) * rate;
      break;
    }
  }

  const effectiveRate = grossIncome > 0 ? (tax / grossIncome) * 100 : 0;

  return {
    taxableIncome,
    taxLiability: tax,
    effectiveRate,
    takeHome: grossIncome - tax
  };
}

export function calculateCompoundInterest(principal: number, interestRate: number, years: number, compoundingFrequency: number) {
  const rateFraction = interestRate / 100;
  const endBalance = principal * Math.pow(1 + (rateFraction / compoundingFrequency), compoundingFrequency * years);
  return {
    endBalance,
    totalInterest: endBalance - principal
  };
}

export function calculateSalary(salaryAmount: number, hoursPerWeek: number) {
  const monthly = salaryAmount / 12;
  const biweekly = salaryAmount / 26;
  const weekly = salaryAmount / 52;
  const daily = weekly / 5;
  const hourly = weekly / hoursPerWeek;

  return {
    monthly,
    biweekly,
    weekly,
    daily,
    hourly
  };
}

export function calculateInterestRate(loanAmount: number, monthlyPayment: number, termMonths: number) {
  // Solves for rate using numerical approximation (Newton-Raphson method)
  const P = loanAmount;
  const M = monthlyPayment;
  const n = termMonths;

  let r = 0.05 / 12; // initial guess (5% annual)
  for (let i = 0; i < 100; i++) {
    const f = P * r * Math.pow(1 + r, n) - M * (Math.pow(1 + r, n) - 1);
    const df = P * (Math.pow(1 + r, n) + n * r * Math.pow(1 + r, n - 1)) - M * n * Math.pow(1 + r, n - 1);
    const rNext = r - f / df;
    if (Math.abs(rNext - r) < 0.0000001) {
      r = rNext;
      break;
    }
    r = rNext;
  }

  const annualRate = r * 12 * 100;
  return {
    annualRate,
    effectiveRate: (Math.pow(1 + r, 12) - 1) * 100
  };
}

export function calculateSalesTax(basePrice: number, taxRate: number) {
  const taxAmount = basePrice * (taxRate / 100);
  const total = basePrice + taxAmount;
  return {
    taxAmount,
    total
  };
}


// ==================== FITNESS & HEALTH FORMULAS ====================

export function calculateBMI(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category = 'Normal';
  let colorClass = 'text-emerald-600';
  if (bmi < 18.5) {
    category = 'Underweight';
    colorClass = 'text-blue-600';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    colorClass = 'text-amber-600';
  } else if (bmi >= 30) {
    category = 'Obese';
    colorClass = 'text-rose-600';
  }

  return {
    bmi,
    category,
    colorClass
  };
}

export function calculateCalorieTDEE(age: number, gender: 'male' | 'female', weightKg: number, heightCm: number, activityFactor: number) {
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const tdee = bmr * activityFactor;
  return {
    bmr,
    tdee,
    weightLoss: tdee - 500, // 0.5 kg loss target per week
    weightGain: tdee + 500  // 0.5 kg gain target per week
  };
}

export function calculateBodyFat(gender: 'male' | 'female', heightCm: number, neckCm: number, waistCm: number, hipCm: number) {
  let bodyFat = 0;

  if (gender === 'male') {
    bodyFat = 86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76;
  } else {
    bodyFat = 163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387;
  }

  return {
    bodyFatPercentage: Math.max(2, bodyFat)
  };
}

export function calculateBMR(age: number, gender: 'male' | 'female', weightKg: number, heightCm: number) {
  let bmr = 0;
  if (gender === 'male') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  return { bmr };
}

export function calculateIdealWeight(gender: 'male' | 'female', heightCm: number) {
  const heightInches = heightCm / 2.54;
  const inchesOver5Foot = Math.max(0, heightInches - 60);

  let devine = 0;
  let robinson = 0;

  if (gender === 'male') {
    devine = 50.0 + 2.3 * inchesOver5Foot;
    robinson = 52.0 + 1.9 * inchesOver5Foot;
  } else {
    devine = 45.5 + 2.3 * inchesOver5Foot;
    robinson = 49.0 + 1.7 * inchesOver5Foot;
  }

  return {
    devineWeight: devine,
    robinsonWeight: robinson
  };
}

export function calculatePace(distanceKm: number, timeMinutes: number) {
  const pace = timeMinutes / distanceKm; // mins/km
  const paceMinutes = Math.floor(pace);
  const paceSeconds = Math.round((pace - paceMinutes) * 60);

  const speedKmh = distanceKm / (timeMinutes / 60);

  return {
    paceString: `${paceMinutes}:${paceSeconds < 10 ? '0' : ''}${paceSeconds} /km`,
    speedKmh
  };
}

function parseLocalDate(dateStr: string): Date {
  const parts = String(dateStr).split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateStr);
}

export function calculatePregnancy(lastPeriodDateStr: string) {
  const lmp = parseLocalDate(lastPeriodDateStr);
  const today = new Date();
  const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffTime = todayLocal.getTime() - lmp.getTime();
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  
  const totalWeeks = Math.floor(diffDays / 7);
  const remainingDays = diffDays % 7;

  // Due Date is standard 280 days from LMP
  const dueDate = new Date(lmp.getTime());
  dueDate.setDate(dueDate.getDate() + 280);

  let trimester = 1;
  if (totalWeeks >= 13 && totalWeeks < 27) trimester = 2;
  else if (totalWeeks >= 27) trimester = 3;

  return {
    gestationWeeks: totalWeeks,
    gestationDays: remainingDays,
    trimester,
    dueDate
  };
}

export function calculateConception(dueDateStr: string) {
  const dueDate = parseLocalDate(dueDateStr);
  // Conception is generally 266 days prior to due date
  const conceptionStart = new Date(dueDate.getTime());
  conceptionStart.setDate(conceptionStart.getDate() - 273); // 273 days to 259 days range

  const conceptionEnd = new Date(dueDate.getTime());
  conceptionEnd.setDate(conceptionEnd.getDate() - 259);

  return {
    conceptionStart,
    conceptionEnd
  };
}

export function calculateDueDate(lastPeriodDateStr: string, cycleLengthDays: number) {
  const lmp = parseLocalDate(lastPeriodDateStr);
  // Adjusted Naegele's rule for cycle lengths
  const dueDate = new Date(lmp.getTime());
  dueDate.setDate(dueDate.getDate() + 280 + (cycleLengthDays - 28));
  return {
    dueDate
  };
}


// ==================== MATH UTILITIES ====================

export function calculatePercentage(x: number, y: number, type: string) {
  let result = 0;
  if (type === 'percent_of') {
    result = (x / 100) * y;
  } else if (type === 'what_percent') {
    result = y !== 0 ? (x / y) * 100 : 0;
  } else if (type === 'percent_change') {
    result = x !== 0 ? ((y - x) / x) * 100 : 0;
  }
  return { result };
}

export function calculateRandomNumbers(min: number, max: number, count: number, allowDuplicates: boolean) {
  const results = [];
  const range = max - min + 1;

  if (!allowDuplicates && count > range) {
    count = range; // Cap output size if duplicates disabled
  }

  const pool = new Set();
  while (results.length < count) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (allowDuplicates) {
      results.push(num);
    } else {
      if (!pool.has(num)) {
        pool.add(num);
        results.push(num);
      }
    }
  }

  return { results };
}

export function calculateStandardDeviation(numbersCsv: string) {
  const parsed = numbersCsv.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
  if (parsed.length === 0) return { mean: 0, variance: 0, sdPopulation: 0, sdSample: 0 };

  const mean = parsed.reduce((a, b) => a + b, 0) / parsed.length;
  const sqDiffs = parsed.map(n => Math.pow(n - mean, 2));
  const sumSqDiffs = sqDiffs.reduce((a, b) => a + b, 0);

  const variancePop = sumSqDiffs / parsed.length;
  const varianceSample = parsed.length > 1 ? sumSqDiffs / (parsed.length - 1) : 0;

  return {
    mean,
    variance: variancePop,
    sdPopulation: Math.sqrt(variancePop),
    sdSample: Math.sqrt(varianceSample),
    count: parsed.length
  };
}


// ==================== OTHER UTILITIES ====================

export function calculateAge(dobStr: string, targetStr: string) {
  const dob = parseLocalDate(dobStr);
  const target = parseLocalDate(targetStr);

  let years = target.getFullYear() - dob.getFullYear();
  let months = target.getMonth() - dob.getMonth();
  let days = target.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    // Add days of the previous month
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffTime = Math.abs(target.getTime() - dob.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays
  };
}

export function calculateDateOffset(startDateStr: string, offsetDays: number, operation: 'add' | 'subtract') {
  const date = parseLocalDate(startDateStr);
  if (operation === 'add') {
    date.setDate(date.getDate() + offsetDays);
  } else {
    date.setDate(date.getDate() - offsetDays);
  }
  return { date };
}

export function calculateTimeAdd(h1: number, m1: number, h2: number, m2: number, operation: 'add' | 'subtract') {
  const totalM1 = h1 * 60 + m1;
  const totalM2 = h2 * 60 + m2;
  
  let resultM = 0;
  if (operation === 'add') {
    resultM = totalM1 + totalM2;
  } else {
    resultM = Math.max(0, totalM1 - totalM2);
  }

  const resultH = Math.floor(resultM / 60);
  const remainingM = resultM % 60;

  return {
    hours: resultH,
    minutes: remainingM
  };
}

export function calculateHoursWorked(workdays: number[]) {
  const totalHours = workdays.reduce((sum, h) => sum + Math.max(0, h), 0);
  return { totalHours };
}

export function calculateGPA(creditsAndGrades: { credit: number; grade: number }[]) {
  let totalGradePoints = 0;
  let totalCredits = 0;

  creditsAndGrades.forEach(item => {
    totalGradePoints += item.credit * item.grade;
    totalCredits += item.credit;
  });

  const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  return { gpa };
}

export function calculateGrade(current: number, target: number, weight: number) {
  const w = weight / 100;
  const required = (target - current * (1 - w)) / w;
  return { required };
}

export function calculateConcrete(lengthFt: number, widthFt: number, depthIn: number) {
  const depthFt = depthIn / 12;
  const cubicFeet = lengthFt * widthFt * depthFt;
  const cubicYards = cubicFeet / 27;

  // Approximate 80lb concrete bags needed (1 bag = 0.6 cu ft)
  const bags80lb = Math.ceil(cubicFeet / 0.6);

  return {
    cubicFeet,
    cubicYards,
    bags80lb
  };
}

export function calculateConversion(value: number, type: string) {
  let result = 0;
  let unit = '';
  switch (type) {
    case 'm_to_ft':
      result = value * 3.28084;
      unit = 'ft';
      break;
    case 'ft_to_m':
      result = value / 3.28084;
      unit = 'm';
      break;
    case 'kg_to_lb':
      result = value * 2.20462;
      unit = 'lbs';
      break;
    case 'lb_to_kg':
      result = value / 2.20462;
      unit = 'kg';
      break;
    case 'c_to_f':
      result = (value * 9/5) + 32;
      unit = '°F';
      break;
    case 'f_to_c':
      result = (value - 32) * 5/9;
      unit = '°C';
      break;
  }
  return { result, unit };
}
