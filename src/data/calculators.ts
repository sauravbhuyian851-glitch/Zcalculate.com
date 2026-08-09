export interface CalculatorManualFunction {
  name: string;
  description: string;
  example: string;
}

export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'range' | 'date' | 'checkbox';
  default: any;
  placeholder?: string;
  unit?: string;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
}

export interface CalculatorMetadata {
  slug: string;
  name: string;
  category: 'financial' | 'health' | 'math' | 'other';
  description: string;
  seoTitle: string;
  seoDescription: string;
  faqs: CalculatorFAQ[];
  manual?: CalculatorManualFunction[];
  relatedSlugs: string[];
  customUI?: boolean;
  inputs: CalculatorInput[];
}

export const CATEGORIES = {
  financial: {
    name: 'Financial',
    icon: 'wallet',
    description: 'Calculate loans, mortgages, tax rates, inflation, compound interest, and investment growth.'
  },
  health: {
    name: 'Fitness & Health',
    icon: 'heart',
    description: 'Track your BMI, body fat percentage, calorie requirements, BMR, and pregnancy milestones.'
  },
  math: {
    name: 'Math & Science',
    icon: 'calculator',
    description: 'Solve equations, fractions, triangles, standard deviation, and percentage offsets.'
  },
  other: {
    name: 'Other Tools',
    icon: 'tool',
    description: 'Age differences, subnet configurations, concrete volumes, GPA tracks, and password strengths.'
  }
};

export const calculatorsList: CalculatorMetadata[] = [
  // ==================== FINANCIAL CALCULATORS ====================
  {
    slug: 'mortgage-calculator',
    manual: [
          {
                "name": "Home Value",
                "description": "Total purchase price of the home.",
                "example": "Home Value = $400,000"
          },
          {
                "name": "Down Payment",
                "description": "Upfront cash paid toward purchase price.",
                "example": "Down Payment = $80,000 (20%)"
          },
          {
                "name": "Interest Rate",
                "description": "Annual percentage interest rate (APR).",
                "example": "Interest Rate = 6.5%"
          },
          {
                "name": "Loan Term",
                "description": "Total loan duration in years.",
                "example": "Loan Term = 30 years"
          },
          {
                "name": "Monthly Payment Calculation",
                "description": "Computes fixed monthly principal and interest payment.",
                "example": "$400,000 Home Value - $80,000 Down Payment @ 6.5% for 30 yrs = $2,022.62 / mo"
          },
          {
                "name": "Amortization Schedule",
                "description": "Generates annual principal paid, interest paid, and remaining balance.",
                "example": "Year 1 Balance = $315,400"
          }
    ],
    name: 'Mortgage Calculator',
    category: 'financial',
    description: 'Estimate monthly mortgage payments, total interest costs, and view a complete amortization schedule.',
    seoTitle: 'Free Mortgage Calculator 2026 — Monthly Payment & Amortization Schedule',
    seoDescription: 'Calculate your monthly mortgage payment, total interest, and full amortization schedule. Enter home value, down payment, interest rate, and loan term for instant results.',
    faqs: [
      { question: 'How is a monthly mortgage payment calculated?', answer: 'Monthly mortgage payments are calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n – 1], where P is the principal loan amount, r is the monthly interest rate, and n is the total number of monthly payments.' },
      { question: 'What is a good down payment percentage for a home?', answer: 'A common recommendation is 20% of the home value to avoid private mortgage insurance (PMI). However, many programs allow as low as 3-5% down payment.' },
      { question: 'How does interest rate affect total mortgage cost?', answer: 'Even a small change in interest rate significantly impacts total cost. For example, on a $300,000 loan over 30 years, a 1% rate increase can add over $60,000 in total interest paid.' }
    ],
    relatedSlugs: ['loan-calculator', 'amortization-calculator', 'interest-rate-calculator', 'payment-calculator'],
    inputs: [
      { id: 'home_value', label: 'Home Value', type: 'number', default: 400000, unit: '$' },
      { id: 'down_payment', label: 'Down Payment', type: 'number', default: 80000, unit: '$' },
      { id: 'interest_rate', label: 'Interest Rate', type: 'number', default: 6.5, unit: '%' },
      { id: 'loan_term', label: 'Loan Term', type: 'number', default: 30, unit: 'years' }
    ]
  },
  {
    slug: 'loan-calculator',
    manual: [
          {
                "name": "Loan Amount",
                "description": "Total principal money borrowed.",
                "example": "Loan Amount = $25,000"
          },
          {
                "name": "Interest Rate",
                "description": "Annual interest rate charged for the loan.",
                "example": "Interest Rate = 7.2%"
          },
          {
                "name": "Loan Term",
                "description": "Repayment term duration in years.",
                "example": "Loan Term = 5 years"
          },
          {
                "name": "Monthly Payment",
                "description": "Calculates fixed monthly installment.",
                "example": "$25,000 @ 7.2% for 5 yrs = $497.41 / mo"
          },
          {
                "name": "Total Interest",
                "description": "Calculates total interest paid over loan lifetime.",
                "example": "Total Interest = $4,844.75"
          }
    ],
    name: 'Loan Calculator',
    category: 'financial',
    description: 'Compute payments and total interest for general personal or business loans.',
    seoTitle: 'Free Loan Calculator — Monthly Payment & Total Interest Estimator',
    seoDescription: 'Calculate monthly loan payments and total interest for personal, business, or student loans. Enter loan amount, interest rate, and term for instant results.',
    faqs: [
      { question: 'How do I calculate my monthly loan payment?', answer: 'Your monthly loan payment is calculated with the amortization formula using the principal amount, annual interest rate divided by 12, and total number of monthly payments.' },
      { question: 'What factors affect loan interest rates?', answer: 'Credit score, loan term, loan amount, collateral, and current market conditions all influence the interest rate a lender offers.' }
    ],
    relatedSlugs: ['mortgage-calculator', 'auto-loan-calculator', 'interest-calculator', 'payment-calculator'],
    inputs: [
      { id: 'loan_amount', label: 'Loan Amount', type: 'number', default: 25000, unit: '$' },
      { id: 'interest_rate', label: 'Interest Rate', type: 'number', default: 7.2, unit: '%' },
      { id: 'loan_term', label: 'Loan Term', type: 'number', default: 5, unit: 'years' }
    ]
  },
  {
    slug: 'auto-loan-calculator',
    manual: [
          {
                "name": "Vehicle Price",
                "description": "Base sticker price of vehicle.",
                "example": "Vehicle Price = $35,000"
          },
          {
                "name": "Down Payment",
                "description": "Upfront cash paid.",
                "example": "Down Payment = $5,000"
          },
          {
                "name": "Trade-in Value",
                "description": "Allowance given for trade-in vehicle.",
                "example": "Trade-in Value = $2,000"
          },
          {
                "name": "Interest Rate",
                "description": "Annual financing percentage rate.",
                "example": "Interest Rate = 5.9%"
          },
          {
                "name": "Loan Term",
                "description": "Financing duration in months.",
                "example": "Loan Term = 60 months"
          },
          {
                "name": "Sales Tax Rate",
                "description": "Local vehicle sales tax percentage.",
                "example": "Sales Tax Rate = 7.0%"
          },
          {
                "name": "Monthly Auto Payment",
                "description": "Calculates net financed amount and monthly payment.",
                "example": "$35,000 + $2,450 tax - $5,000 down - $2,000 trade = $30,450 financed -> $586.82 / mo"
          }
    ],
    name: 'Auto Loan Calculator',
    category: 'financial',
    description: 'Determine monthly payments, total costs, and tax schedules for vehicle financing.',
    seoTitle: 'Free Auto Loan Calculator — Car Payment & Financing Estimator',
    seoDescription: 'Calculate monthly car payments including trade-in value, down payment, sales tax, and interest rate. Plan your vehicle purchase with accurate financing estimates.',
    faqs: [
      { question: 'How is an auto loan payment calculated?', answer: 'Auto loan payments are calculated by taking the vehicle price, adding sales tax, subtracting down payment and trade-in value to get the financed amount, then applying the standard amortization formula.' },
      { question: 'Should I include sales tax in my auto loan?', answer: 'Most states charge sales tax on vehicle purchases. Including it in your loan calculation gives you a more accurate monthly payment estimate.' }
    ],
    relatedSlugs: ['loan-calculator', 'payment-calculator', 'sales-tax-calculator', 'interest-rate-calculator'],
    inputs: [
      { id: 'auto_price', label: 'Vehicle Price', type: 'number', default: 35000, unit: '$' },
      { id: 'down_payment', label: 'Down Payment', type: 'number', default: 5000, unit: '$' },
      { id: 'trade_in', label: 'Trade-in Value', type: 'number', default: 2000, unit: '$' },
      { id: 'interest_rate', label: 'Interest Rate', type: 'number', default: 5.9, unit: '%' },
      { id: 'loan_term', label: 'Loan Term', type: 'number', default: 60, unit: 'months' },
      { id: 'sales_tax', label: 'Sales Tax Rate', type: 'number', default: 7.0, unit: '%' }
    ]
  },
  {
    slug: 'interest-calculator',
    manual: [
          {
                "name": "Principal Amount",
                "description": "Initial amount invested or deposited.",
                "example": "Principal = $10,000"
          },
          {
                "name": "Interest Rate",
                "description": "Annual percentage interest rate.",
                "example": "Interest Rate = 5.0%"
          },
          {
                "name": "Term Duration",
                "description": "Total duration in years.",
                "example": "Term = 10 years"
          },
          {
                "name": "Compound Interest Mode",
                "description": "Calculates exponential compound interest growth.",
                "example": "$10,000 @ 5% for 10 yrs (Compound) = $16,288.95"
          },
          {
                "name": "Simple Interest Mode",
                "description": "Calculates linear interest growth on principal.",
                "example": "$10,000 @ 5% for 10 yrs (Simple) = $15,000.00"
          }
    ],
    name: 'Interest Calculator',
    category: 'financial',
    description: 'Compare simple and compound interest returns over time.',
    seoTitle: 'Free Interest Calculator — Simple vs. Compound Interest Comparison',
    seoDescription: 'Compare simple and compound interest on your savings or investments. See how your money grows over time with different interest types and rates.',
    faqs: [
      { question: 'What is the difference between simple and compound interest?', answer: 'Simple interest is calculated only on the initial principal, while compound interest is calculated on the principal plus accumulated interest. Compound interest grows exponentially over time.' },
      { question: 'How often should interest compound for maximum returns?', answer: 'More frequent compounding (daily > monthly > quarterly > annually) results in higher returns. Daily compounding produces the maximum yield for a given rate.' }
    ],
    relatedSlugs: ['compound-interest-calculator', 'investment-calculator', 'interest-rate-calculator'],
    inputs: [
      { id: 'principal', label: 'Principal Amount', type: 'number', default: 10000, unit: '$' },
      { id: 'interest_rate', label: 'Interest Rate', type: 'number', default: 5.0, unit: '%' },
      { id: 'time_years', label: 'Term Duration', type: 'number', default: 10, unit: 'years' },
      {
        id: 'compound_type',
        label: 'Type',
        type: 'select',
        default: 'compound',
        options: [
          { label: 'Compound Interest', value: 'compound' },
          { label: 'Simple Interest', value: 'simple' }
        ]
      }
    ]
  },
  {
    slug: 'payment-calculator',
    manual: [
          {
                "name": "Purchase Price",
                "description": "Price of item being financed.",
                "example": "Purchase Price = $15,000"
          },
          {
                "name": "Down Payment",
                "description": "Initial down payment.",
                "example": "Down Payment = $1,500"
          },
          {
                "name": "Interest Rate",
                "description": "Annual interest percentage rate.",
                "example": "Interest Rate = 8.0%"
          },
          {
                "name": "Term Duration",
                "description": "Duration in months.",
                "example": "Term = 36 months"
          },
          {
                "name": "Installment Calculation",
                "description": "Computes monthly payment installment.",
                "example": "$13,500 financed @ 8% for 36 mos = $423.23 / mo"
          }
    ],
    name: 'Payment Calculator',
    category: 'financial',
    description: 'Convert total item cost, sales tax, down payments, and finance terms into regular payments.',
    seoTitle: 'Free Payment Calculator — Monthly Installment Estimator',
    seoDescription: 'Calculate monthly payments for any financed purchase. Enter price, down payment, interest rate, and term to see your exact monthly installment amount.',
    faqs: [
      { question: 'How do I estimate my monthly payment for a purchase?', answer: 'Enter the purchase price, subtract your down payment to get the financed amount, then apply the interest rate over your chosen term using the standard amortization formula.' }
    ],
    relatedSlugs: ['loan-calculator', 'auto-loan-calculator', 'mortgage-calculator'],
    inputs: [
      { id: 'item_price', label: 'Purchase Price', type: 'number', default: 15000, unit: '$' },
      { id: 'down_payment', label: 'Down Payment', type: 'number', default: 1500, unit: '$' },
      { id: 'interest_rate', label: 'Interest Rate', type: 'number', default: 8.0, unit: '%' },
      { id: 'term_months', label: 'Term Duration', type: 'number', default: 36, unit: 'months' }
    ]
  },
  {
    slug: 'retirement-calculator',
    manual: [
          {
                "name": "Current Age",
                "description": "Your starting age today.",
                "example": "Current Age = 30"
          },
          {
                "name": "Retirement Age",
                "description": "Target age to begin retirement.",
                "example": "Retirement Age = 65"
          },
          {
                "name": "Current Savings",
                "description": "Total nest egg currently saved.",
                "example": "Current Savings = $50,000"
          },
          {
                "name": "Monthly Deposit",
                "description": "Recurring monthly contribution.",
                "example": "Monthly Deposit = $500"
          },
          {
                "name": "Expected Return",
                "description": "Projected annual market return rate.",
                "example": "Expected Return = 7.5%"
          },
          {
                "name": "Inflation Adjustment",
                "description": "Estimated annual inflation rate.",
                "example": "Inflation Rate = 2.5%"
          },
          {
                "name": "Retirement Projection",
                "description": "Calculates retirement nest egg and 4% rule monthly income.",
                "example": "Balance at age 65 = $976,511 -> $3,255.04 / mo income"
          }
    ],
    name: 'Retirement Calculator',
    category: 'financial',
    description: 'Determine if your current savings, contributions, and expected returns will meet retirement goals.',
    seoTitle: 'Free Retirement Calculator — Savings & Income Projection Tool',
    seoDescription: 'Plan your retirement by projecting savings growth with monthly contributions, expected returns, and inflation adjustments. See your estimated retirement income.',
    faqs: [
      { question: 'How much should I save for retirement?', answer: 'Financial advisors often recommend saving 10-15% of your gross income for retirement. The exact amount depends on your desired retirement age, lifestyle, and expected Social Security benefits.' },
      { question: 'What is the 4% retirement withdrawal rule?', answer: 'The 4% rule suggests withdrawing 4% of your retirement savings annually in the first year, then adjusting for inflation. This approach is designed to make your savings last approximately 30 years.' }
    ],
    relatedSlugs: ['investment-calculator', 'compound-interest-calculator', 'inflation-calculator', 'salary-calculator'],
    inputs: [
      { id: 'current_age', label: 'Current Age', type: 'number', default: 30, unit: 'years' },
      { id: 'retirement_age', label: 'Retirement Age', type: 'number', default: 65, unit: 'years' },
      { id: 'current_savings', label: 'Current Savings', type: 'number', default: 50000, unit: '$' },
      { id: 'monthly_deposit', label: 'Monthly Deposit', type: 'number', default: 500, unit: '$' },
      { id: 'return_rate', label: 'Expected Return', type: 'number', default: 7.5, unit: '%' },
      { id: 'inflation_rate', label: 'Inflation Adjustment', type: 'number', default: 2.5, unit: '%' }
    ]
  },
  {
    slug: 'amortization-calculator',
    manual: [
          {
                "name": "Loan Amount",
                "description": "Total principal loan balance.",
                "example": "Loan Amount = $250,000"
          },
          {
                "name": "Interest Rate",
                "description": "Fixed interest rate.",
                "example": "Interest Rate = 6.2%"
          },
          {
                "name": "Loan Term",
                "description": "Repayment duration in years.",
                "example": "Loan Term = 15 years"
          },
          {
                "name": "Amortization Breakdown",
                "description": "Shows period breakdown of principal and interest.",
                "example": "Month 1: $909.10 Principal + $1,291.67 Interest = $2,200.77"
          }
    ],
    name: 'Amortization Calculator',
    category: 'financial',
    description: 'Examine detailed periodic payment breakdowns, principal payouts, and running interest balances.',
    seoTitle: 'Free Amortization Calculator — Loan Payment Breakdown & Schedule',
    seoDescription: 'Generate a complete amortization schedule showing principal vs. interest breakdown for each payment period. Visualize your loan payoff timeline.',
    faqs: [
      { question: 'What is an amortization schedule?', answer: 'An amortization schedule is a detailed table showing each periodic payment on a loan, broken down into how much goes toward principal and how much goes toward interest, along with the remaining balance.' }
    ],
    relatedSlugs: ['mortgage-calculator', 'loan-calculator', 'interest-rate-calculator'],
    inputs: [
      { id: 'loan_amount', label: 'Loan Amount', type: 'number', default: 250000, unit: '$' },
      { id: 'interest_rate', label: 'Interest Rate', type: 'number', default: 6.2, unit: '%' },
      { id: 'loan_term', label: 'Loan Term', type: 'number', default: 15, unit: 'years' }
    ]
  },
  {
    slug: 'investment-calculator',
    manual: [
          {
                "name": "Starting Capital",
                "description": "Initial portfolio balance.",
                "example": "Starting Capital = $20,000"
          },
          {
                "name": "Monthly Contribution",
                "description": "Added monthly investment.",
                "example": "Monthly Contribution = $300"
          },
          {
                "name": "Expected Annual Return",
                "description": "Projected annual growth rate.",
                "example": "Annual Return = 8.0%"
          },
          {
                "name": "Investment Horizon",
                "description": "Investment duration in years.",
                "example": "Horizon = 20 years"
          },
          {
                "name": "End Balance Calculation",
                "description": "Calculates total future portfolio value.",
                "example": "$20k + $300/mo @ 8% for 20 yrs = $267,048 total"
          }
    ],
    name: 'Investment Calculator',
    category: 'financial',
    description: 'Forecast the end balance of a portfolio with recurring contributions and compound growth.',
    seoTitle: 'Free Investment Calculator — Portfolio Growth & Returns Projector',
    seoDescription: 'Project your investment portfolio growth with starting capital, monthly contributions, and compound returns. See your future balance over any time horizon.',
    faqs: [
      { question: 'How do compound returns affect investment growth?', answer: 'Compound returns create exponential growth because you earn returns not only on your initial investment but also on previously accumulated returns. Over long periods, this dramatically increases your portfolio value.' },
      { question: 'What is a realistic annual return rate for investments?', answer: 'Historically, the S&P 500 has returned approximately 10% annually before inflation, or about 7% after inflation. However, past performance does not guarantee future results.' }
    ],
    relatedSlugs: ['compound-interest-calculator', 'retirement-calculator', 'inflation-calculator'],
    inputs: [
      { id: 'starting_amount', label: 'Starting Capital', type: 'number', default: 20000, unit: '$' },
      { id: 'monthly_contribution', label: 'Monthly Contribution', type: 'number', default: 300, unit: '$' },
      { id: 'annual_return', label: 'Expected Annual Return', type: 'number', default: 8.0, unit: '%' },
      { id: 'years', label: 'Investment Horizon', type: 'number', default: 20, unit: 'years' }
    ]
  },
  {
    slug: 'inflation-calculator',
    manual: [
          {
                "name": "Starting Value",
                "description": "Baseline amount in current dollars.",
                "example": "Starting Value = $1,000"
          },
          {
                "name": "Average Annual Inflation",
                "description": "Annual inflation percentage rate.",
                "example": "Inflation Rate = 3.2%"
          },
          {
                "name": "Number of Years",
                "description": "Future time horizon in years.",
                "example": "Years = 15 years"
          },
          {
                "name": "Purchasing Power Calculation",
                "description": "Calculates real future purchasing power and equivalent cost.",
                "example": "$1,000 today buys $624.49 worth of goods in 15 yrs"
          }
    ],
    name: 'Inflation Calculator',
    category: 'financial',
    description: 'Calculate purchase power shifts and value changes over time due to average inflation.',
    seoTitle: 'Free Inflation Calculator — Purchasing Power & Future Value Tool',
    seoDescription: 'Calculate how inflation erodes purchasing power over time. See the future equivalent cost of goods and the real value of your money.',
    faqs: [
      { question: 'How does inflation affect my savings?', answer: 'Inflation reduces the purchasing power of money over time. If inflation averages 3% annually, $100 today will only buy about $74 worth of goods in 10 years.' }
    ],
    relatedSlugs: ['investment-calculator', 'retirement-calculator', 'compound-interest-calculator'],
    inputs: [
      { id: 'starting_amount', label: 'Starting Value', type: 'number', default: 1000, unit: '$' },
      { id: 'inflation_rate', label: 'Average Annual Inflation', type: 'number', default: 3.2, unit: '%' },
      { id: 'years', label: 'Number of Years', type: 'number', default: 15, unit: 'years' }
    ]
  },
  {
    slug: 'finance-calculator',
    manual: [
          {
                "name": "Present Value (PV)",
                "description": "Initial monetary value today.",
                "example": "PV = $10,000"
          },
          {
                "name": "Future Value (FV)",
                "description": "Target or calculated future value.",
                "example": "FV = $15,000"
          },
          {
                "name": "Annual Rate",
                "description": "Periodic interest rate.",
                "example": "Annual Rate = 5.5%"
          },
          {
                "name": "Number of Periods",
                "description": "Total compounding periods.",
                "example": "Periods = 8"
          },
          {
                "name": "TVM Growth Calculation",
                "description": "Computes compound future value and growth multiplier.",
                "example": "$10,000 @ 5.5% for 8 periods = $15,346.86 (1.5347x multiplier)"
          }
    ],
    name: 'Finance Calculator (TVM)',
    category: 'financial',
    description: 'Compute Time Value of Money (TVM) parameters: Present Value, Future Value, Term, and Payments.',
    seoTitle: 'Free Time Value of Money Calculator — TVM Finance Tool',
    seoDescription: 'Solve Time Value of Money (TVM) problems. Calculate present value, future value, growth multiplier, and period relationships for financial planning.',
    faqs: [
      { question: 'What is the Time Value of Money?', answer: 'TVM is the concept that money available today is worth more than the same amount in the future due to its potential earning capacity. It is a core principle of finance and investment analysis.' }
    ],
    relatedSlugs: ['interest-calculator', 'compound-interest-calculator', 'investment-calculator'],
    inputs: [
      { id: 'pv', label: 'Present Value (PV)', type: 'number', default: 10000, unit: '$' },
      { id: 'fv', label: 'Future Value (FV)', type: 'number', default: 15000, unit: '$' },
      { id: 'annual_rate', label: 'Annual Rate', type: 'number', default: 5.5, unit: '%' },
      { id: 'periods', label: 'Number of Periods', type: 'number', default: 8, unit: 'periods' }
    ]
  },
  {
    slug: 'income-tax-calculator',
    manual: [
          {
                "name": "Annual Gross Income",
                "description": "Total taxable gross earnings.",
                "example": "Gross Income = $85,000"
          },
          {
                "name": "Filing Status",
                "description": "Filing status (Single, Married, Head of Household).",
                "example": "Filing Status = Single"
          },
          {
                "name": "Net Take-Home Calculation",
                "description": "Computes progressive federal tax liability and net pay.",
                "example": "$85,000 Single -> $10,020 Tax (11.8% Effective Rate) -> $74,980 Take-Home"
          }
    ],
    name: 'Income Tax Calculator',
    category: 'financial',
    description: 'Estimate federal income tax liabilities, marginal brackets, and net take-home salary.',
    seoTitle: 'Free Income Tax Calculator 2026 — Federal Tax Bracket Estimator',
    seoDescription: 'Estimate your federal income tax liability, effective tax rate, and take-home pay. Supports single, married filing jointly, and head of household filing statuses.',
    faqs: [
      { question: 'How are federal income taxes calculated?', answer: 'Federal income tax uses a progressive bracket system. Your income is taxed at increasing rates as it moves through each bracket, and you only pay the higher rate on income above each threshold.' },
      { question: 'What is an effective tax rate vs. marginal tax rate?', answer: 'Your marginal rate is the highest bracket your income falls into. Your effective rate is the total tax divided by total income — it is always lower than your marginal rate because lower portions of income are taxed at lower rates.' }
    ],
    relatedSlugs: ['salary-calculator', 'retirement-calculator'],
    inputs: [
      { id: 'gross_income', label: 'Annual Gross Income', type: 'number', default: 85000, unit: '$' },
      {
        id: 'filing_status',
        label: 'Filing Status',
        type: 'select',
        default: 'single',
        options: [
          { label: 'Single', value: 'single' },
          { label: 'Married Filing Jointly', value: 'married' },
          { label: 'Head of Household', value: 'head' }
        ]
      }
    ]
  },
  {
    slug: 'compound-interest-calculator',
    manual: [
          {
                "name": "Initial Deposit",
                "description": "Starting principal balance.",
                "example": "Principal = $10,000"
          },
          {
                "name": "Interest Rate",
                "description": "Annual percentage interest rate.",
                "example": "Rate = 6.0%"
          },
          {
                "name": "Duration",
                "description": "Total duration in years.",
                "example": "Duration = 15 years"
          },
          {
                "name": "Compounding Frequency",
                "description": "Compounding frequency (Annually, Quarterly, Monthly, Daily).",
                "example": "Frequency = Monthly (12x/yr)"
          },
          {
                "name": "Compounded Balance",
                "description": "Calculates end balance with compounding.",
                "example": "$10,000 @ 6% monthly for 15 yrs = $24,540.94"
          }
    ],
    name: 'Compound Interest Calculator',
    category: 'financial',
    description: 'Investigate the compound growth curve for principal savings compounding daily, monthly, or annually.',
    seoTitle: 'Free Compound Interest Calculator — Daily, Monthly & Annual Compounding',
    seoDescription: 'Calculate compound interest with different compounding frequencies: daily, monthly, quarterly, or annually. See how your principal grows over time.',
    faqs: [
      { question: 'How does compounding frequency affect returns?', answer: 'More frequent compounding results in higher returns. Daily compounding earns slightly more than monthly, which earns more than annual. The difference is most significant with larger principals and longer time periods.' }
    ],
    relatedSlugs: ['interest-calculator', 'investment-calculator', 'inflation-calculator'],
    inputs: [
      { id: 'principal', label: 'Initial Deposit', type: 'number', default: 10000, unit: '$' },
      { id: 'interest_rate', label: 'Interest Rate', type: 'number', default: 6.0, unit: '%' },
      { id: 'years', label: 'Duration', type: 'number', default: 15, unit: 'years' },
      {
        id: 'compounding',
        label: 'Compounding Frequency',
        type: 'select',
        default: 12,
        options: [
          { label: 'Annually', value: 1 },
          { label: 'Quarterly', value: 4 },
          { label: 'Monthly', value: 12 },
          { label: 'Daily', value: 365 }
        ]
      }
    ]
  },
  {
    slug: 'salary-calculator',
    manual: [
          {
                "name": "Base Gross Salary",
                "description": "Total yearly gross salary.",
                "example": "Salary = $75,000"
          },
          {
                "name": "Hours per Week",
                "description": "Standard working hours per week.",
                "example": "Hours = 40 hours/week"
          },
          {
                "name": "Salary Conversions",
                "description": "Converts annual salary to hourly, daily, weekly, bi-weekly, monthly.",
                "example": "$75,000 / year = $36.06 / hr = $288.46 / day = $1,442.31 / wk = $6,250.00 / mo"
          }
    ],
    name: 'Salary Calculator',
    category: 'financial',
    description: 'Convert annual gross earnings into daily, weekly, bi-weekly, or hourly equivalents.',
    seoTitle: 'Free Salary Calculator — Annual to Hourly, Weekly & Monthly Converter',
    seoDescription: 'Convert your annual salary to hourly, daily, weekly, bi-weekly, and monthly equivalents. Know exactly what your time is worth.',
    faqs: [
      { question: 'How do I convert annual salary to hourly wage?', answer: 'Divide your annual salary by the number of working weeks (typically 52), then divide by your hours per week. For example, $75,000 / 52 / 40 = $36.06 per hour.' }
    ],
    relatedSlugs: ['income-tax-calculator', 'retirement-calculator'],
    inputs: [
      { id: 'salary_amount', label: 'Base Gross Salary', type: 'number', default: 75000, unit: '$' },
      { id: 'hours_per_week', label: 'Hours per Week', type: 'number', default: 40, unit: 'hours' }
    ]
  },
  {
    slug: 'interest-rate-calculator',
    manual: [
          {
                "name": "Loan Principal",
                "description": "Total borrowed loan principal.",
                "example": "Principal = $10,000"
          },
          {
                "name": "Monthly Payment",
                "description": "Regular monthly payment amount.",
                "example": "Payment = $210"
          },
          {
                "name": "Term Duration",
                "description": "Total loan term in months.",
                "example": "Term = 60 months"
          },
          {
                "name": "Effective APR",
                "description": "Solves for actual annual percentage rate using Newton-Raphson method.",
                "example": "$10,000 loan with $210/mo for 60 mos -> 9.88% APR (10.34% APY)"
          }
    ],
    name: 'Interest Rate Calculator',
    category: 'financial',
    description: 'Find the effective interest rate of a loan or investment based on payment structures.',
    seoTitle: 'Free Interest Rate Calculator — Find Your Loan\'s Effective APR',
    seoDescription: 'Calculate the effective interest rate of any loan from your payment amount, principal, and term. Uses Newton-Raphson numerical approximation for precision.',
    faqs: [
      { question: 'What is the difference between APR and effective interest rate?', answer: 'APR (Annual Percentage Rate) is the simple annual rate, while the effective interest rate accounts for compounding. The effective rate is always equal to or higher than the APR.' }
    ],
    relatedSlugs: ['loan-calculator', 'mortgage-calculator', 'interest-calculator'],
    inputs: [
      { id: 'loan_amount', label: 'Loan Principal', type: 'number', default: 10000, unit: '$' },
      { id: 'monthly_payment', label: 'Monthly Payment', type: 'number', default: 210, unit: '$' },
      { id: 'term_months', label: 'Term Duration', type: 'number', default: 60, unit: 'months' }
    ]
  },
  {
    slug: 'sales-tax-calculator',
    manual: [
          {
                "name": "Base Price",
                "description": "Pre-tax purchase cost.",
                "example": "Base Price = $150.00"
          },
          {
                "name": "Tax Rate",
                "description": "Sales tax percentage rate.",
                "example": "Tax Rate = 8.25%"
          },
          {
                "name": "Sales Tax Calculation",
                "description": "Computes exact tax amount and grand total.",
                "example": "$150.00 @ 8.25% tax = $12.38 tax -> Total = $162.38"
          }
    ],
    name: 'Sales Tax Calculator',
    category: 'financial',
    description: 'Calculate net price, gross tax values, and purchase totals with sales tax percentages.',
    seoTitle: 'Free Sales Tax Calculator — Tax Amount & Total Price Estimator',
    seoDescription: 'Calculate sales tax and total purchase price instantly. Enter the base price and tax rate to see the exact tax amount and final cost.',
    faqs: [
      { question: 'How do I calculate sales tax?', answer: 'Multiply the pre-tax price by the tax rate as a decimal. For example, $150 at 8.25% tax: $150 × 0.0825 = $12.38 tax, for a total of $162.38.' }
    ],
    relatedSlugs: ['auto-loan-calculator', 'payment-calculator'],
    inputs: [
      { id: 'base_price', label: 'Base Price', type: 'number', default: 150, unit: '$' },
      { id: 'tax_rate', label: 'Tax Rate', type: 'number', default: 8.25, unit: '%' }
    ]
  },

  // ==================== FITNESS & HEALTH CALCULATORS ====================
  {
    slug: 'bmi-calculator',
    manual: [
          {
                "name": "Weight (kg)",
                "description": "Total body mass in kilograms.",
                "example": "Weight = 70 kg"
          },
          {
                "name": "Height (cm)",
                "description": "Body height in centimeters.",
                "example": "Height = 175 cm"
          },
          {
                "name": "BMI Calculation",
                "description": "Calculates Body Mass Index ratio (kg/m²) and WHO health category.",
                "example": "70 kg / (1.75m)² = 22.9 BMI (Normal Category)"
          }
    ],
    name: 'BMI Calculator',
    category: 'health',
    description: 'Calculate Body Mass Index (BMI) and discover your health category based on medical standards.',
    seoTitle: 'Free BMI Calculator — Body Mass Index & Health Category Checker',
    seoDescription: 'Calculate your Body Mass Index (BMI) and find your health category: underweight, normal, overweight, or obese. Based on WHO medical standards.',
    faqs: [
      { question: 'What is a healthy BMI range?', answer: 'A healthy BMI is between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30 or above is classified as obese.' },
      { question: 'How is BMI calculated?', answer: 'BMI is calculated by dividing your weight in kilograms by the square of your height in meters: BMI = weight(kg) / height(m)².' }
    ],
    relatedSlugs: ['calorie-calculator', 'body-fat-calculator', 'ideal-weight-calculator', 'bmr-calculator'],
    inputs: [
      { id: 'weight_kg', label: 'Weight', type: 'number', default: 70, unit: 'kg' },
      { id: 'height_cm', label: 'Height', type: 'number', default: 175, unit: 'cm' }
    ]
  },
  {
    slug: 'calorie-calculator',
    manual: [
          {
                "name": "Age & Biological Sex",
                "description": "Demographic parameters for metabolic baseline.",
                "example": "Age = 28, Sex = Male"
          },
          {
                "name": "Weight & Height",
                "description": "Physical body parameters.",
                "example": "Weight = 75 kg, Height = 180 cm"
          },
          {
                "name": "Activity Intensity",
                "description": "Activity multiplier factor.",
                "example": "Activity = Moderate (1.55x)"
          },
          {
                "name": "TDEE Calculation",
                "description": "Computes Total Daily Energy Expenditure and weight targets.",
                "example": "BMR = 1,730 cal -> TDEE = 2,682 cal/day (Weight Loss Target = 2,182 cal/day)"
          }
    ],
    name: 'Calorie Calculator (TDEE)',
    category: 'health',
    description: 'Calculate Total Daily Energy Expenditure (TDEE) and target calories for weight shifts.',
    seoTitle: 'Free Calorie Calculator — TDEE & Daily Calorie Needs Estimator',
    seoDescription: 'Calculate your Total Daily Energy Expenditure (TDEE) based on age, gender, weight, height, and activity level. Get targets for weight loss and weight gain.',
    faqs: [
      { question: 'What is TDEE?', answer: 'Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day, including basal metabolism, physical activity, and the thermic effect of food.' },
      { question: 'How many calories should I eat to lose weight?', answer: 'A safe rate of weight loss is 0.5-1 kg per week, which requires a daily deficit of 500-1000 calories below your TDEE. Never go below 1200 calories/day without medical supervision.' }
    ],
    relatedSlugs: ['bmr-calculator', 'bmi-calculator', 'body-fat-calculator', 'ideal-weight-calculator'],
    inputs: [
      { id: 'age', label: 'Age', type: 'number', default: 28, unit: 'years' },
      {
        id: 'gender',
        label: 'Biological Sex',
        type: 'select',
        default: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      },
      { id: 'weight_kg', label: 'Weight', type: 'number', default: 75, unit: 'kg' },
      { id: 'height_cm', label: 'Height', type: 'number', default: 180, unit: 'cm' },
      {
        id: 'activity_level',
        label: 'Activity Intensity',
        type: 'select',
        default: 1.375,
        options: [
          { label: 'Sedentary (Little/No Exercise)', value: 1.2 },
          { label: 'Light (Exercise 1-3 days/week)', value: 1.375 },
          { label: 'Moderate (Exercise 3-5 days/week)', value: 1.55 },
          { label: 'Active (Exercise 6-7 days/week)', value: 1.725 }
        ]
      }
    ]
  },
  {
    slug: 'body-fat-calculator',
    manual: [
          {
                "name": "Circumference Measurements",
                "description": "Neck, waist, and hip circumferences in cm.",
                "example": "Neck = 38 cm, Waist = 88 cm"
          },
          {
                "name": "US Navy Body Fat",
                "description": "Calculates estimated body fat percentage using US Navy formula.",
                "example": "Male, Height 175 cm, Neck 38 cm, Waist 88 cm -> 18.4% Body Fat"
          }
    ],
    name: 'Body Fat Calculator',
    category: 'health',
    description: 'Estimate your body fat percentage using standard US Navy circumference measurements.',
    seoTitle: 'Free Body Fat Calculator — US Navy Method Body Composition Estimator',
    seoDescription: 'Estimate your body fat percentage using the US Navy circumference method. Enter height, neck, waist, and hip measurements for accurate results.',
    faqs: [
      { question: 'How accurate is the US Navy body fat method?', answer: 'The US Navy method typically has a margin of error of 1-3% compared to more advanced methods like DEXA scans. It is widely used because it only requires a tape measure.' }
    ],
    relatedSlugs: ['bmi-calculator', 'ideal-weight-calculator', 'calorie-calculator'],
    inputs: [
      {
        id: 'gender',
        label: 'Biological Sex',
        type: 'select',
        default: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      },
      { id: 'height_cm', label: 'Height', type: 'number', default: 175, unit: 'cm' },
      { id: 'neck_cm', label: 'Neck Circumference', type: 'number', default: 38, unit: 'cm' },
      { id: 'waist_cm', label: 'Waist Circumference', type: 'number', default: 88, unit: 'cm' },
      { id: 'hip_cm', label: 'Hip Circumference (Females Only)', type: 'number', default: 94, unit: 'cm' }
    ]
  },
  {
    slug: 'bmr-calculator',
    manual: [
          {
                "name": "Mifflin-St Jeor Parameters",
                "description": "Age, biological sex, weight, height.",
                "example": "30 yr Male, 80 kg, 180 cm"
          },
          {
                "name": "Basal Metabolic Rate",
                "description": "Calculates minimum calories burned at rest.",
                "example": "BMR = 1,780 cal/day"
          }
    ],
    name: 'BMR Calculator',
    category: 'health',
    description: 'Calculate your Basal Metabolic Rate (BMR) - the calorie scale needed to sustain vital functions.',
    seoTitle: 'Free BMR Calculator — Basal Metabolic Rate & Resting Calorie Needs',
    seoDescription: 'Calculate your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation. Know the minimum calories your body needs at complete rest.',
    faqs: [
      { question: 'What is Basal Metabolic Rate?', answer: 'BMR is the number of calories your body needs to perform basic life-sustaining functions like breathing, circulation, and cell production while completely at rest.' }
    ],
    relatedSlugs: ['calorie-calculator', 'bmi-calculator', 'ideal-weight-calculator'],
    inputs: [
      { id: 'age', label: 'Age', type: 'number', default: 30, unit: 'years' },
      {
        id: 'gender',
        label: 'Biological Sex',
        type: 'select',
        default: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      },
      { id: 'weight_kg', label: 'Weight', type: 'number', default: 80, unit: 'kg' },
      { id: 'height_cm', label: 'Height', type: 'number', default: 180, unit: 'cm' }
    ]
  },
  {
    slug: 'ideal-weight-calculator',
    manual: [
          {
                "name": "Devine Formula",
                "description": "Medical ideal weight formula.",
                "example": "175 cm Male (5'9\") -> 70.7 kg Ideal Weight"
          },
          {
                "name": "Robinson Formula",
                "description": "Alternative medical ideal weight formula.",
                "example": "175 cm Male -> 69.1 kg Ideal Weight"
          }
    ],
    name: 'Ideal Weight Calculator',
    category: 'health',
    description: 'Review ideal body weight estimates based on Devine, Robinson, and Miller formulas.',
    seoTitle: 'Free Ideal Weight Calculator — Devine & Robinson Formula Estimator',
    seoDescription: 'Calculate your ideal body weight using the Devine and Robinson medical formulas. Get science-based weight targets for your height and gender.',
    faqs: [
      { question: 'How is ideal weight calculated?', answer: 'The Devine formula estimates ideal weight as a base weight for the first 5 feet of height, plus an increment for each additional inch. Different formulas (Devine, Robinson, Miller) give slightly different results.' }
    ],
    relatedSlugs: ['bmi-calculator', 'body-fat-calculator', 'calorie-calculator'],
    inputs: [
      {
        id: 'gender',
        label: 'Biological Sex',
        type: 'select',
        default: 'male',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' }
        ]
      },
      { id: 'height_cm', label: 'Height', type: 'number', default: 175, unit: 'cm' }
    ]
  },
  {
    slug: 'pace-calculator',
    manual: [
          {
                "name": "Total Distance",
                "description": "Distance in kilometers.",
                "example": "Distance = 10 km"
          },
          {
                "name": "Duration Time",
                "description": "Elapsed time in minutes.",
                "example": "Time = 50 minutes"
          },
          {
                "name": "Pace & Speed Calculation",
                "description": "Calculates average pace per km and speed in km/h.",
                "example": "10 km in 50 mins = 5:00 /km pace (12.00 km/h speed)"
          }
    ],
    name: 'Pace Calculator',
    category: 'health',
    description: 'Calculate race splits, distance metrics, and target pace profiles.',
    seoTitle: 'Free Pace Calculator — Running Speed & Race Split Estimator',
    seoDescription: 'Calculate your running pace, speed in km/h, and race split estimates. Enter distance and time to get your pace per kilometer.',
    faqs: [
      { question: 'What is a good running pace?', answer: 'For recreational runners, a pace of 5:30-6:30 per km is considered good. Elite marathon runners maintain about 3:00 per km, while beginners often start around 7:00-8:00 per km.' }
    ],
    relatedSlugs: ['calorie-calculator', 'bmi-calculator'],
    inputs: [
      { id: 'distance_km', label: 'Total Distance', type: 'number', default: 10, unit: 'km' },
      { id: 'time_minutes', label: 'Duration Time', type: 'number', default: 50, unit: 'mins' }
    ]
  },
  {
    slug: 'pregnancy-calculator',
    manual: [
          {
                "name": "Last Period Date",
                "description": "First day of last menstrual period (LMP).",
                "example": "LMP = 2026-01-01"
          },
          {
                "name": "Gestational Age & Trimester",
                "description": "Computes pregnancy week, day, trimester, and due date.",
                "example": "LMP 2026-01-01 on 2026-08-09 -> 31 weeks 3 days (3rd Trimester, Due Oct 8, 2026)"
          }
    ],
    name: 'Pregnancy Weeks Calculator',
    category: 'health',
    description: 'Identify pregnancy gestational timeline, key trimester benchmarks, and baby size metrics.',
    seoTitle: 'Free Pregnancy Weeks Calculator — Gestational Age & Trimester Tracker',
    seoDescription: 'Track your pregnancy by weeks and days from your last menstrual period. See which trimester you are in and your estimated due date.',
    faqs: [
      { question: 'How are pregnancy weeks calculated?', answer: 'Pregnancy weeks are counted from the first day of your last menstrual period (LMP). A full-term pregnancy is 40 weeks (280 days) from the LMP date.' }
    ],
    relatedSlugs: ['due-date-calculator', 'pregnancy-conception-calculator'],
    inputs: [
      { id: 'last_period', label: 'First Day of Last Period', type: 'date', default: '2026-01-01' }
    ]
  },
  {
    slug: 'pregnancy-conception-calculator',
    manual: [
          {
                "name": "Expected Due Date",
                "description": "Anticipated delivery date.",
                "example": "Due Date = 2026-10-08"
          },
          {
                "name": "Conception Window",
                "description": "Calculates probable conception window.",
                "example": "Due Date Oct 8, 2026 -> Conception Window: Jan 8 – Jan 22, 2026"
          }
    ],
    name: 'Pregnancy Conception Calculator',
    category: 'health',
    description: 'Calculate historical conception date windows based on due dates or last periods.',
    seoTitle: 'Free Conception Date Calculator — Estimate When You Conceived',
    seoDescription: 'Estimate your conception date window from your expected due date. Calculate the probable date range when conception occurred.',
    faqs: [
      { question: 'How is the conception date estimated?', answer: 'Conception typically occurs 266 days before the due date. Since the exact date is uncertain, a conception window spanning approximately 2 weeks is provided.' }
    ],
    relatedSlugs: ['pregnancy-calculator', 'due-date-calculator'],
    inputs: [
      { id: 'due_date', label: 'Expected Due Date', type: 'date', default: '2026-10-08' }
    ]
  },
  {
    slug: 'due-date-calculator',
    manual: [
          {
                "name": "Last Period & Cycle",
                "description": "LMP date and average cycle length in days.",
                "example": "LMP = 2026-01-01, Cycle = 28 days"
          },
          {
                "name": "Naegele's Rule Calculation",
                "description": "Calculates adjusted due date.",
                "example": "2026-01-01 + 280 days = October 8, 2026"
          }
    ],
    name: 'Pregnancy Due Date Calculator',
    category: 'health',
    description: 'Locate conception windows and due dates using standard gestational cycle adjustments.',
    seoTitle: 'Free Due Date Calculator — Pregnancy Due Date from Last Period',
    seoDescription: 'Calculate your pregnancy due date using Naegele\'s rule adjusted for your cycle length. Enter your last period date and cycle duration.',
    faqs: [
      { question: 'How is the due date calculated?', answer: 'Due date is calculated using Naegele\'s rule: add 280 days to the first day of your last menstrual period, then adjust for cycle length variations from the standard 28-day cycle.' }
    ],
    relatedSlugs: ['pregnancy-calculator', 'pregnancy-conception-calculator'],
    inputs: [
      { id: 'last_period', label: 'First Day of Last Period', type: 'date', default: '2026-01-01' },
      { id: 'cycle_length', label: 'Cycle Duration', type: 'number', default: 28, unit: 'days' }
    ]
  },

  // ==================== MATH CALCULATORS ====================
  {
    slug: 'scientific-calculator',
    manual: [
          {
                "name": "Arithmetic (+, -, ×, ÷)",
                "description": "Performs basic arithmetic operations.",
                "example": "4 + 4 = 8 | 20 ÷ 4 = 5"
          },
          {
                "name": "Percentage (%)",
                "description": "Calculates standalone or relative percentage.",
                "example": "50% = 0.5 | 100 + 10% = 110"
          },
          {
                "name": "Trigonometry (sin, cos, tan)",
                "description": "Computes trigonometric functions in DEG/RAD/GRAD modes.",
                "example": "sin(30°) = 0.5"
          },
          {
                "name": "Inverse Trig (sin⁻¹, cos⁻¹, tan⁻¹)",
                "description": "Computes arc-trigonometric functions.",
                "example": "asin(0.5) = 30°"
          },
          {
                "name": "Logarithms (log, ln)",
                "description": "Base-10 logarithm and natural logarithm.",
                "example": "log(100) = 2 | ln(e) = 1"
          },
          {
                "name": "Exponents & Powers (xʸ, 10ˣ, eˣ)",
                "description": "Calculates powers and exponential values.",
                "example": "2^3 = 8 | 10^2 = 100"
          },
          {
                "name": "Factorial (x!)",
                "description": "Computes factorial of non-negative integers.",
                "example": "5! = 120"
          },
          {
                "name": "Combinatorics (nCr, nPr)",
                "description": "Calculates combinations and permutations.",
                "example": "nCr(5, 2) = 10 | nPr(5, 2) = 20"
          },
          {
                "name": "Physical Constants",
                "description": "Inserts physical and mathematical constants.",
                "example": "2 * π = 6.2831853"
          }
    ],
    name: 'Scientific Calculator',
    category: 'math',
    description: 'A professional online scientific calculator. Includes trigonometry, logarithms, powers, root functions, factorial, permutations (nPr), combinations (nCr), and statistics with standard physical constants.',
    seoTitle: 'Free Online Scientific Calculator — Standard Scientific Math Solver',
    seoDescription: 'Use our free online scientific calculator with standard mathematical functions, trigonometric operations, logarithms, exponentials, combinatorics, and physical constants.',
    faqs: [
      { question: 'What functions does this scientific calculator support?', answer: 'This calculator supports standard arithmetic, trigonometric functions (sin, cos, tan, and their inverses), logarithms (log, ln), exponents, powers (x^y), roots, factorials, permutations, and combinations.' },
      { question: 'What angle units are supported?', answer: 'You can toggle between Degree (DEG), Radian (RAD), and Gradian (GRAD) angle modes for trigonometric calculations.' }
    ],
    relatedSlugs: ['programmable-calculator', 'graphing-calculator', 'cas-calculator', 'fraction-calculator'],
    customUI: true,
    inputs: []
  },
  {
    slug: 'programmable-calculator',
    manual: [
          {
                "name": "Script Editor",
                "description": "Write JavaScript code with print() output.",
                "example": "let sum = 0; for(let i=1;i<=4;i++) sum += i; print(sum); -> 10"
          },
          {
                "name": "Macro Recorder",
                "description": "Record keystrokes to automate calculation sequences.",
                "example": "Record [4, +, 4, =] -> Executed"
          },
          {
                "name": "Memory Slots",
                "description": "Save and load up to 10 persistent script programs in local storage.",
                "example": "Slot 1 Saved"
          }
    ],
    name: 'Programmable Calculator',
    category: 'math',
    description: 'A JavaScript-based programmable scripting calculator. Write custom functions, use conditions, loops, variable declarations, and save/load scripts directly in browser memory.',
    seoTitle: 'Free Online Programmable Calculator — Scripting & Macros',
    seoDescription: 'Write and run custom scripts online using our programmable calculator. Store custom programs, write loops/conditions, and record standard keyboard macro plays.',
    faqs: [
      { question: 'How do I run a custom script?', answer: 'Write your script using JavaScript syntax in the script editor and click the Run button. Your output will appear in the output console.' },
      { question: 'Can I save programs?', answer: 'Yes. The calculator includes 10 save/load slots stored directly in your browser\'s local storage.' }
    ],
    relatedSlugs: ['scientific-calculator', 'graphing-calculator', 'cas-calculator'],
    customUI: true,
    inputs: []
  },
  {
    slug: 'graphing-calculator',
    manual: [
          {
                "name": "Function Plotter f(x)",
                "description": "Graph 2D Cartesian equations in real time.",
                "example": "f1(x) = x^2"
          },
          {
                "name": "Polar & Parametric Plotting",
                "description": "Graph r=f(θ) and (x(t), y(t)).",
                "example": "r = cos(3*theta)"
          },
          {
                "name": "Root & Extrema Finder",
                "description": "Calculate analytical zeros and local min/max points.",
                "example": "y = x^2 - 4 -> Zeros at x = -2, x = 2"
          },
          {
                "name": "Numerical Calculus",
                "description": "Calculate definite integral area under curve or derivative slope.",
                "example": "∫ x^2 dx from 0 to 3 = 9"
          }
    ],
    name: 'Graphing Calculator',
    category: 'math',
    description: 'An interactive 2D function plotter. Graph multiple equations, zoom, pan, trace coordinates, and compute numerical derivatives or integrations.',
    seoTitle: 'Free Online Graphing Calculator — Plot 2D Mathematical Functions',
    seoDescription: 'Graph mathematical equations in real time. Plot Cartesian, Polar, or Parametric equations, trace coordinates, find zeros, and perform numerical calculus.',
    faqs: [
      { question: 'How do I plot a function?', answer: 'Type the equation (e.g. y = x^2 or f(x) = sin(x)) into the input field and click Plot. You can add up to 4 functions simultaneously.' },
      { question: 'Can I find zeros and extrema?', answer: 'Yes. The graphing interface includes analytical tools to compute zeros, extrema, and numerical integrals under curves.' }
    ],
    relatedSlugs: ['scientific-calculator', 'programmable-calculator', 'cas-calculator'],
    customUI: true,
    inputs: []
  },
  {
    slug: 'cas-calculator',
    manual: [
          {
                "name": "Symbolic Evaluation",
                "description": "Evaluate mathematical expressions symbolically.",
                "example": "x^2 + 2*x + 1 with x=3 -> 16"
          },
          {
                "name": "Polynomial Factorization",
                "description": "Factor expressions into prime factors.",
                "example": "factor(x^2 - 9) -> (x - 3)*(x + 3)"
          },
          {
                "name": "Expression Expansion",
                "description": "Expand algebraic products.",
                "example": "expand((x + 2)^2) -> x^2 + 4*x + 4"
          },
          {
                "name": "Symbolic Differentiation & Integration",
                "description": "Compute exact analytical derivatives and antiderivatives.",
                "example": "d/dx(x^3) -> 3*x^2"
          }
    ],
    name: 'CAS Calculator (Computer Algebra System)',
    category: 'math',
    description: 'Solve mathematical equations and simplify expressions symbolically. Calculate exact analytical derivatives, integrals, polynomial factors, and Taylor series expansions.',
    seoTitle: 'Free Online CAS Calculator — Symbolic Algebra & Calculus Solver',
    seoDescription: 'Solve equations and simplify expressions symbolically. Compute exact derivatives, indefinite integrals, factor polynomials, and expand expressions online.',
    faqs: [
      { question: 'What is a Computer Algebra System (CAS)?', answer: 'A CAS performs symbolic mathematics rather than numerical approximations. It simplifies expressions, integrates, differentiates, and solves equations algebraically.' },
      { question: 'Can it compute exact integrals and derivatives?', answer: 'Yes. The CAS engine computes exact algebraic antiderivatives and analytical derivative expressions.' }
    ],
    relatedSlugs: ['scientific-calculator', 'programmable-calculator', 'graphing-calculator'],
    customUI: true,
    inputs: []
  },
  {
    slug: 'fraction-calculator',
    manual: [
          {
                "name": "Fraction Addition (+)",
                "description": "Adds two fractions with LCD reduction.",
                "example": "1/2 + 1/3 = 5/6 (0.8333)"
          },
          {
                "name": "Fraction Subtraction (-)",
                "description": "Subtracts second fraction from first.",
                "example": "3/4 - 1/2 = 1/4 (0.25)"
          },
          {
                "name": "Fraction Multiplication (×)",
                "description": "Multiplies numerators and denominators.",
                "example": "2/3 × 3/5 = 2/5 (0.4)"
          },
          {
                "name": "Fraction Division (÷)",
                "description": "Divides by multiplying by reciprocal.",
                "example": "1/2 ÷ 1/4 = 2 (2.0)"
          }
    ],
    name: 'Fraction Calculator',
    category: 'math',
    description: 'Compute fractional operations (add, subtract, multiply, divide) with full reduction steps.',
    seoTitle: 'Free Fraction Calculator — Add, Subtract, Multiply & Divide Fractions',
    seoDescription: 'Calculate fraction operations with step-by-step solutions. Add, subtract, multiply, or divide fractions and see the reduced result and decimal equivalent.',
    faqs: [
      { question: 'How do I add fractions with different denominators?', answer: 'Find the least common denominator (LCD), convert each fraction to an equivalent fraction with the LCD, add the numerators, then reduce the result to its simplest form.' }
    ],
    relatedSlugs: ['percentage-calculator', 'scientific-calculator'],
    customUI: true,
    inputs: []
  },
  {
    slug: 'percentage-calculator',
    manual: [
          {
                "name": "What is X% of Y?",
                "description": "Calculates specified percentage of a number.",
                "example": "25% of 200 = 50"
          },
          {
                "name": "X is what % of Y?",
                "description": "Determines what percentage X represents of Y.",
                "example": "25 is what % of 200 = 12.5%"
          },
          {
                "name": "Percentage Change X to Y",
                "description": "Calculates percentage increase or decrease.",
                "example": "Change from 25 to 200 = 700% increase"
          }
    ],
    name: 'Percentage Calculator',
    category: 'math',
    description: 'Solve common percentage calculations: increases/decreases, fraction equivalents, and ratios.',
    seoTitle: 'Free Percentage Calculator — Percent Of, Change & Ratio Solver',
    seoDescription: 'Solve percentage problems instantly: find X% of Y, what percent X is of Y, or the percentage change between two values.',
    faqs: [
      { question: 'How do I calculate percentage change?', answer: 'Percentage change = ((New Value - Old Value) / Old Value) × 100. A positive result means an increase, negative means a decrease.' }
    ],
    relatedSlugs: ['fraction-calculator', 'sales-tax-calculator', 'scientific-calculator'],
    inputs: [
      { id: 'value_x', label: 'First Value (X)', type: 'number', default: 25 },
      { id: 'value_y', label: 'Second Value (Y)', type: 'number', default: 200 },
      {
        id: 'calc_type',
        label: 'Type',
        type: 'select',
        default: 'percent_of',
        options: [
          { label: 'What is X% of Y?', value: 'percent_of' },
          { label: 'X is what percentage of Y?', value: 'what_percent' },
          { label: 'Percentage change from X to Y', value: 'percent_change' }
        ]
      }
    ]
  },
  {
    slug: 'random-number-generator',
    manual: [
          {
                "name": "Min / Max Range",
                "description": "Defines bounds for random integer generation.",
                "example": "Min = 1, Max = 100"
          },
          {
                "name": "Quantity & Duplicates",
                "description": "Specifies quantity of numbers and toggle for duplicate values.",
                "example": "Generate 5 unique numbers -> [14, 42, 67, 88, 93]"
          }
    ],
    name: 'Random Number Generator',
    category: 'math',
    description: 'Create arrays of random integers in ranges, allowing or preventing duplicates.',
    seoTitle: 'Free Random Number Generator — Integer Ranges With or Without Duplicates',
    seoDescription: 'Generate random numbers within any range. Choose how many numbers to generate and whether duplicates are allowed. Perfect for lotteries, sampling, and games.',
    faqs: [
      { question: 'Are the random numbers truly random?', answer: 'This generator uses JavaScript\'s Math.random() which produces cryptographically pseudo-random numbers. For most purposes (games, sampling, education), this provides sufficient randomness.' }
    ],
    relatedSlugs: ['password-generator', 'percentage-calculator'],
    inputs: [
      { id: 'min_val', label: 'Min Range Value', type: 'number', default: 1 },
      { id: 'max_val', label: 'Max Range Value', type: 'number', default: 100 },
      { id: 'count', label: 'Quantity to Generate', type: 'number', default: 5 },
      { id: 'allow_duplicates', label: 'Allow Duplicates', type: 'checkbox', default: false }
    ]
  },
  {
    slug: 'triangle-calculator',
    manual: [
          {
                "name": "Sides (a, b, c)",
                "description": "Side lengths of triangle.",
                "example": "a = 3, b = 4, c = 5"
          },
          {
                "name": "Heron's Area Calculation",
                "description": "Computes exact area and perimeter.",
                "example": "a=3, b=4, c=5 -> Right Triangle, Area = 6.0, Perimeter = 12"
          },
          {
                "name": "Law of Cosines Angles",
                "description": "Calculates internal angles in degrees.",
                "example": "Angles: A = 36.87°, B = 53.13°, C = 90.00°"
          }
    ],
    name: 'Triangle Calculator',
    category: 'math',
    description: 'Solve missing sides, angles, area, and perimeter of any triangle from three parameters.',
    seoTitle: 'Free Triangle Calculator — Sides, Angles, Area & Perimeter Solver',
    seoDescription: 'Calculate triangle properties from three side lengths. Find angles using law of cosines, area using Heron\'s formula, and perimeter. Interactive SVG visualization.',
    faqs: [
      { question: 'How is the area of a triangle calculated from three sides?', answer: 'Using Heron\'s formula: first calculate the semi-perimeter s = (a+b+c)/2, then Area = √(s(s-a)(s-b)(s-c)). This works for any triangle when all three sides are known.' }
    ],
    relatedSlugs: ['scientific-calculator', 'percentage-calculator'],
    customUI: true,
    inputs: []
  },
  {
    slug: 'standard-deviation-calculator',
    manual: [
          {
                "name": "Data Input",
                "description": "Comma-separated list of numeric values.",
                "example": "Data: 10, 20, 30, 40, 50"
          },
          {
                "name": "Mean & Variance",
                "description": "Computes arithmetic mean and variance.",
                "example": "Mean = 30.00, Population Variance = 200.00"
          },
          {
                "name": "Sample & Population Standard Deviation",
                "description": "Computes standard deviation.",
                "example": "Sample SD = 15.8114, Population SD = 14.1421"
          }
    ],
    name: 'Standard Deviation Calculator',
    category: 'math',
    description: 'Compute mean, variance, population standard deviation, and sample standard deviation from lists of values.',
    seoTitle: 'Free Standard Deviation Calculator — Mean, Variance & SD for Data Sets',
    seoDescription: 'Calculate standard deviation, mean, and variance for any data set. Supports both population and sample standard deviation with step-by-step results.',
    faqs: [
      { question: 'What is the difference between population and sample standard deviation?', answer: 'Population SD divides by N (total count), while sample SD divides by N-1 (Bessel\'s correction). Use sample SD when analyzing a subset of a larger population, and population SD when you have data for the entire group.' }
    ],
    relatedSlugs: ['percentage-calculator', 'scientific-calculator'],
    inputs: [
      { id: 'number_list', label: 'Data Points (comma separated)', type: 'number', default: '10, 20, 30, 40, 50', placeholder: 'e.g. 10, 15, 23, 42' }
    ]
  },

  // ==================== OTHER CALCULATORS ====================
  {
    slug: 'age-calculator',
    manual: [
          {
                "name": "Date of Birth & Target Date",
                "description": "Start and end dates.",
                "example": "DOB = 1995-06-15, Target = 2026-06-14"
          },
          {
                "name": "Exact Age Breakdown",
                "description": "Calculates age in years, months, days, and total days.",
                "example": "Age = 30 years, 11 months, 30 days (11,322 total days)"
          }
    ],
    name: 'Age Calculator',
    category: 'other',
    description: 'Extract exact age calculations down to years, months, days, minutes, and seconds from dates of birth.',
    seoTitle: 'Free Age Calculator — Exact Age in Years, Months & Days',
    seoDescription: 'Calculate your exact age in years, months, days, and total days between any two dates. Perfect for age verification, milestone tracking, and date math.',
    faqs: [
      { question: 'How is exact age calculated?', answer: 'Exact age is calculated by finding the difference between two dates in years, months, and remaining days, accounting for varying month lengths and leap years.' }
    ],
    relatedSlugs: ['date-calculator', 'time-calculator'],
    inputs: [
      { id: 'dob', label: 'Date of Birth', type: 'date', default: '1995-06-15' },
      { id: 'target_date', label: 'Target Date', type: 'date', default: '2026-06-14' }
    ]
  },
  {
    slug: 'date-calculator',
    manual: [
          {
                "name": "Start Date & Days Offset",
                "description": "Base date and offset amount.",
                "example": "Start = 2026-01-01, Offset = 30 days"
          },
          {
                "name": "Date Addition / Subtraction",
                "description": "Calculates future or past target date.",
                "example": "2026-01-01 + 30 days = Friday, January 31, 2026"
          }
    ],
    name: 'Date Calculator',
    category: 'other',
    description: 'Add or subtract days, weeks, and months from dates, or compute direct duration intervals.',
    seoTitle: 'Free Date Calculator — Add or Subtract Days From Any Date',
    seoDescription: 'Add or subtract days from any date to find the resulting date. Calculate deadlines, delivery dates, or any future or past date.',
    faqs: [
      { question: 'How do I calculate a date in the future?', answer: 'Enter your start date and the number of days to add. The calculator accounts for varying month lengths and leap years to give you the exact future date.' }
    ],
    relatedSlugs: ['age-calculator', 'time-calculator'],
    inputs: [
      { id: 'start_date', label: 'Start Date', type: 'date', default: '2026-01-01' },
      { id: 'days_offset', label: 'Days Offset', type: 'number', default: 30 },
      {
        id: 'operation',
        label: 'Action',
        type: 'select',
        default: 'add',
        options: [
          { label: 'Add Days', value: 'add' },
          { label: 'Subtract Days', value: 'subtract' }
        ]
      }
    ]
  },
  {
    slug: 'time-calculator',
    manual: [
          {
                "name": "Hours & Minutes Input",
                "description": "Two time durations (h1, m1) and (h2, m2).",
                "example": "2h 30m and 1h 45m"
          },
          {
                "name": "Time Duration Addition / Subtraction",
                "description": "Computes cumulative time.",
                "example": "2h 30m + 1h 45m = 4h 15m (255 total minutes)"
          }
    ],
    name: 'Time Duration Calculator',
    category: 'other',
    description: 'Sum or subtract custom hour, minute, and second intervals.',
    seoTitle: 'Free Time Duration Calculator — Add or Subtract Hours & Minutes',
    seoDescription: 'Add or subtract time durations in hours and minutes. Perfect for timesheet calculations, project planning, and scheduling.',
    faqs: [
      { question: 'How do I add time durations together?', answer: 'Add the minutes first — if the total exceeds 60, carry over the extra hours. Then add the hours together. For example, 2h 45m + 1h 30m = 4h 15m.' }
    ],
    relatedSlugs: ['hours-calculator', 'date-calculator', 'age-calculator'],
    inputs: [
      { id: 'hours_1', label: 'Hours', type: 'number', default: 2 },
      { id: 'mins_1', label: 'Minutes', type: 'number', default: 45 },
      { id: 'hours_2', label: 'Hours (Second Set)', type: 'number', default: 1 },
      { id: 'mins_2', label: 'Minutes (Second Set)', type: 'number', default: 30 },
      {
        id: 'operation',
        label: 'Action',
        type: 'select',
        default: 'add',
        options: [
          { label: 'Add Time', value: 'add' },
          { label: 'Subtract Time', value: 'subtract' }
        ]
      }
    ]
  },
  {
    slug: 'hours-calculator',
    manual: [
          {
                "name": "Daily Clock In / Out",
                "description": "Shift start and end hours for Mon-Fri.",
                "example": "Mon: 9am - 5pm (8 hrs), Tue: 9am - 5pm (8 hrs)"
          },
          {
                "name": "Total Weekly Hours",
                "description": "Sums weekly working hours.",
                "example": "5 days × 8 hrs = 40.0 total weekly hours"
          }
    ],
    name: 'Hours Worked Calculator',
    category: 'other',
    description: 'Compile daily workcard clocks to estimate weekly hours, breaks, and payroll values.',
    seoTitle: 'Free Hours Worked Calculator — Weekly Timecard & Payroll Estimator',
    seoDescription: 'Calculate total weekly hours worked from daily clock-in and clock-out times. Track your work hours for payroll and time management.',
    faqs: [
      { question: 'How do I calculate total hours worked per week?', answer: 'Enter your clock-in and clock-out times for each day. The calculator subtracts the start time from end time for each day and sums them to give your total weekly hours.' }
    ],
    relatedSlugs: ['time-calculator', 'salary-calculator'],
    inputs: [
      { id: 'mon_in', label: 'Mon In', type: 'number', default: 9, placeholder: 'e.g. 9.0' },
      { id: 'mon_out', label: 'Mon Out', type: 'number', default: 17, placeholder: 'e.g. 17.0' },
      { id: 'tue_in', label: 'Tue In', type: 'number', default: 9 },
      { id: 'tue_out', label: 'Tue Out', type: 'number', default: 17 },
      { id: 'wed_in', label: 'Wed In', type: 'number', default: 9 },
      { id: 'wed_out', label: 'Wed Out', type: 'number', default: 17 },
      { id: 'thu_in', label: 'Thu In', type: 'number', default: 9 },
      { id: 'thu_out', label: 'Thu Out', type: 'number', default: 17 },
      { id: 'fri_in', label: 'Fri In', type: 'number', default: 9 },
      { id: 'fri_out', label: 'Fri Out', type: 'number', default: 17 }
    ]
  },
  {
    slug: 'gpa-calculator',
    manual: [
          {
                "name": "Course Credits & Grades",
                "description": "Credit hours and letter grades (A=4, B=3, C=2, D=1, F=0).",
                "example": "Course 1: 3 cr (A), Course 2: 4 cr (B), Course 3: 3 cr (A)"
          },
          {
                "name": "Semester GPA Calculation",
                "description": "Computes weighted Grade Point Average.",
                "example": "(3*4 + 4*3 + 3*4) / 10 credits = 3.60 GPA"
          }
    ],
    name: 'GPA Calculator',
    category: 'other',
    description: 'Combine course grades and credit parameters to estimate semester and cumulative GPA.',
    seoTitle: 'Free GPA Calculator — Semester & Cumulative Grade Point Average',
    seoDescription: 'Calculate your GPA from course grades and credit hours. Enter up to 3 courses with letter grades to compute your semester grade point average.',
    faqs: [
      { question: 'How is GPA calculated?', answer: 'GPA = Total Grade Points / Total Credits. Each course\'s grade points equal the credit hours multiplied by the grade value (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).' }
    ],
    relatedSlugs: ['grade-calculator'],
    inputs: [
      { id: 'c1_credit', label: 'Course 1 Credits', type: 'number', default: 3 },
      {
        id: 'c1_grade',
        label: 'Course 1 Grade',
        type: 'select',
        default: 4.0,
        options: [
          { label: 'A (4.0)', value: 4.0 },
          { label: 'B (3.0)', value: 3.0 },
          { label: 'C (2.0)', value: 2.0 },
          { label: 'D (1.0)', value: 1.0 },
          { label: 'F (0.0)', value: 0.0 }
        ]
      },
      { id: 'c2_credit', label: 'Course 2 Credits', type: 'number', default: 4 },
      {
        id: 'c2_grade',
        label: 'Course 2 Grade',
        type: 'select',
        default: 3.0,
        options: [
          { label: 'A (4.0)', value: 4.0 },
          { label: 'B (3.0)', value: 3.0 },
          { label: 'C (2.0)', value: 2.0 },
          { label: 'D (1.0)', value: 1.0 },
          { label: 'F (0.0)', value: 0.0 }
        ]
      },
      { id: 'c3_credit', label: 'Course 3 Credits', type: 'number', default: 3 },
      {
        id: 'c3_grade',
        label: 'Course 3 Grade',
        type: 'select',
        default: 4.0,
        options: [
          { label: 'A (4.0)', value: 4.0 },
          { label: 'B (3.0)', value: 3.0 },
          { label: 'C (2.0)', value: 2.0 },
          { label: 'D (1.0)', value: 1.0 },
          { label: 'F (0.0)', value: 0.0 }
        ]
      }
    ]
  },
  {
    slug: 'grade-calculator',
    manual: [
          {
                "name": "Current Grade & Target Grade",
                "description": "Existing course percentage and desired final grade.",
                "example": "Current Grade = 85%, Target Grade = 90%"
          },
          {
                "name": "Exam Weight",
                "description": "Percentage weight of final exam.",
                "example": "Final Exam Weight = 20%"
          },
          {
                "name": "Required Final Exam Score",
                "description": "Calculates necessary score on final.",
                "example": "To get 90% target with 85% current grade & 20% exam weight -> Required Final Score = 110.0% (⚠ Needs >100%)"
          }
    ],
    name: 'Grade Calculator',
    category: 'other',
    description: 'Calculate the required score on final exams to hit target term grades.',
    seoTitle: 'Free Grade Calculator — Required Final Exam Score Estimator',
    seoDescription: 'Calculate the score you need on your final exam to achieve your target grade. Enter your current grade, target grade, and exam weight.',
    faqs: [
      { question: 'How do I calculate the grade I need on my final exam?', answer: 'The formula is: Required Score = (Target Grade - Current Grade × (1 - Exam Weight)) / Exam Weight. For example, if you have 85% and want 90% with a 20% weighted final, you need a score of 110% — meaning 90% may not be achievable.' }
    ],
    relatedSlugs: ['gpa-calculator', 'percentage-calculator'],
    inputs: [
      { id: 'current_grade', label: 'Current Grade Percentage', type: 'number', default: 85, unit: '%' },
      { id: 'target_grade', label: 'Target Grade Percentage', type: 'number', default: 90, unit: '%' },
      { id: 'exam_weight', label: 'Final Exam Weight', type: 'number', default: 20, unit: '%' }
    ]
  },
  {
    slug: 'concrete-calculator',
    manual: [
          {
                "name": "Dimensions (Length, Width, Depth)",
                "description": "Length (ft), Width (ft), Depth (in).",
                "example": "Length = 10 ft, Width = 10 ft, Depth = 4 in"
          },
          {
                "name": "Concrete Volume & Bag Count",
                "description": "Calculates cubic feet, cubic yards, and 80lb bags needed.",
                "example": "10ft × 10ft × 4in = 33.3 ft³ = 1.23 yd³ -> 56 bags (80lb)"
          }
    ],
    name: 'Concrete Calculator',
    category: 'other',
    description: 'Calculate slab volume and estimate bag counts for concrete construction.',
    seoTitle: 'Free Concrete Calculator — Slab Volume & Bag Count Estimator',
    seoDescription: 'Calculate the volume of concrete needed for a slab and estimate the number of 80lb bags required. Enter length, width, and thickness for instant results.',
    faqs: [
      { question: 'How many bags of concrete do I need?', answer: 'Calculate the volume in cubic feet (Length × Width × Depth in feet), then divide by 0.6 (cubic feet per 80lb bag) and round up. For example, a 10×10 ft slab at 4 inches deep needs about 56 bags.' }
    ],
    relatedSlugs: ['conversion-calculator'],
    inputs: [
      { id: 'length_ft', label: 'Slab Length', type: 'number', default: 10, unit: 'ft' },
      { id: 'width_ft', label: 'Slab Width', type: 'number', default: 10, unit: 'ft' },
      { id: 'depth_in', label: 'Slab Thickness', type: 'number', default: 4, unit: 'inches' }
    ]
  },
  {
    slug: 'subnet-calculator',
    manual: [
          {
                "name": "Base IP & CIDR Prefix",
                "description": "IP address and subnet CIDR mask.",
                "example": "IP = 192.168.1.1, CIDR = /24"
          },
          {
                "name": "Subnet Architecture",
                "description": "Computes netmask, network ID, broadcast IP, and usable host count.",
                "example": "192.168.1.1/24 -> Subnet Mask: 255.255.255.0, Network: 192.168.1.0, Broadcast: 192.168.1.255, Usable Hosts: 254"
          }
    ],
    name: 'Subnet Calculator (CIDR)',
    category: 'other',
    description: 'Compute IP subnet bounds, binary breakdowns, wildcard masks, and host quantity ranges.',
    seoTitle: 'Free Subnet Calculator — CIDR, Subnet Mask & Network Address Tool',
    seoDescription: 'Calculate subnet mask, network address, broadcast address, and usable host range from any IP address and CIDR prefix. Essential networking tool.',
    faqs: [
      { question: 'What is CIDR notation?', answer: 'CIDR (Classless Inter-Domain Routing) notation expresses an IP address and its associated subnet mask as a suffix indicating the number of network bits. For example, /24 means the first 24 bits are the network portion, giving a subnet mask of 255.255.255.0.' }
    ],
    relatedSlugs: ['password-generator', 'conversion-calculator'],
    customUI: true,
    inputs: []
  },
  {
    slug: 'password-generator',
    manual: [
          {
                "name": "Length Slider",
                "description": "Desired character length (6 to 64 chars).",
                "example": "Length = 16 chars"
          },
          {
                "name": "Character Sets",
                "description": "Toggle uppercase, lowercase, numbers, special symbols.",
                "example": "All sets enabled"
          },
          {
                "name": "Crypto Generator & Entropy",
                "description": "Generates cryptographically secure password and calculates entropy bits.",
                "example": "Generated: k9#mP2$xL8!vQ5@w -> 105.1 bits entropy (Very Strong)"
          }
    ],
    name: 'Password Generator',
    category: 'other',
    description: 'Generate high-entropy random password strings based on character checklists.',
    seoTitle: 'Free Password Generator — Secure Random Passwords With Entropy Analysis',
    seoDescription: 'Generate strong random passwords with customizable length and character types: uppercase, lowercase, numbers, and symbols. Includes entropy and strength analysis.',
    faqs: [
      { question: 'What makes a password strong?', answer: 'Strong passwords are at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols. Password entropy (measured in bits) indicates overall strength — aim for 60+ bits.' }
    ],
    relatedSlugs: ['random-number-generator', 'subnet-calculator'],
    customUI: true,
    inputs: []
  },
  {
    slug: 'conversion-calculator',
    manual: [
          {
                "name": "Value & Unit Pair",
                "description": "Input number and conversion category (Length, Weight, Temperature).",
                "example": "Value = 100"
          },
          {
                "name": "Unit Conversion",
                "description": "Converts between metric and imperial units.",
                "example": "100 m -> 328.084 ft | 100 kg -> 220.462 lbs | 100 °C -> 212 °F"
          }
    ],
    name: 'Conversion Calculator',
    category: 'other',
    description: 'Quick unit conversions for length, mass, volume, and temperature scales.',
    seoTitle: 'Free Unit Conversion Calculator — Length, Mass & Temperature Converter',
    seoDescription: 'Convert between meters and feet, kilograms and pounds, Celsius and Fahrenheit instantly. Quick and accurate unit conversion tool.',
    faqs: [
      { question: 'How do I convert Celsius to Fahrenheit?', answer: 'Multiply the Celsius temperature by 9/5 (or 1.8) and add 32. For example, 100°C × 1.8 + 32 = 212°F.' }
    ],
    relatedSlugs: ['concrete-calculator', 'scientific-calculator'],
    inputs: [
      { id: 'input_value', label: 'Value to Convert', type: 'number', default: 100 },
      {
        id: 'conv_type',
        label: 'Conversion Type',
        type: 'select',
        default: 'm_to_ft',
        options: [
          { label: 'Meters to Feet', value: 'm_to_ft' },
          { label: 'Feet to Meters', value: 'ft_to_m' },
          { label: 'Kilograms to Pounds', value: 'kg_to_lb' },
          { label: 'Pounds to Kilograms', value: 'lb_to_kg' },
          { label: 'Celsius to Fahrenheit', value: 'c_to_f' },
          { label: 'Fahrenheit to Celsius', value: 'f_to_c' }
        ]
      }
    ]
  },
  {
    slug: 'screen-size-calculator',
    manual: [
          {
                "name": "Resolution & Pixel Ratio",
                "description": "Screen width/height in px and device pixel ratio.",
                "example": "1920 × 1080 px @ 15.6\""
          },
          {
                "name": "PPI & Physical Dimensions",
                "description": "Calculates pixel density (PPI) and width/height in inches.",
                "example": "1920×1080 on 15.6\" screen -> 141.21 PPI (Width: 13.60\", Height: 7.65\")"
          }
    ],
    name: 'Screen Size Calibrator',
    category: 'other',
    description: 'Determine exact physical screen dimensions, aspect ratios, and PPI/DPI using calibration slides, direct diagonals, or automated device recognition.',
    seoTitle: 'Free Screen Size Calculator — PPI, DPI & Physical Dimension Calibrator',
    seoDescription: 'Determine your screen\'s physical dimensions, PPI density, and aspect ratio using auto-detection, diagonal measurement, or physical card calibration.',
    faqs: [
      { question: 'What is PPI and why does it matter?', answer: 'PPI (Pixels Per Inch) measures pixel density. Higher PPI means sharper, more detailed images. Modern phones typically have 300+ PPI, while monitors range from 72-220 PPI.' }
    ],
    relatedSlugs: ['conversion-calculator'],
    customUI: true,
    inputs: []
  }
];
