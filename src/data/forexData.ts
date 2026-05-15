export interface TradeSetup {
  entry: number;
  stopLoss: number;
  tp1: number;
  tp2: number;
  rrRatio: number;
  invalidation: number;
  management: string;
}

export interface Scenario {
  title: string;
  bias: "Bullish" | "Bearish" | "Neutral" | "Strong Bullish" | "Strong Bearish";
  probability: number;
  levels: string[];
  description: string;
}

export interface FundamentalDriver {
  factor: string;
  impact: "High" | "Medium" | "Low";
  description: string;
}

export interface NewsEvent {
  time: string;
  currency: string;
  event: string;
  forecast: string;
  previous: string;
  impact: "High" | "Medium" | "Low";
}

export interface SMCConcept {
  name: string;
  priceZone: string;
  type: "FVG" | "Order Block" | "Liquidity Pool" | "Breaker Block" | "Mitigation Block";
  description: string;
}

export interface TechnicalIndicatorsState {
  ema50: number;
  ema100: number;
  ema200: number;
  rsi14: number;
  macdLine: number;
  signalLine: number;
  macdHist: number;
  bollingerUpper: number;
  bollingerLower: number;
  atr14: number;
}

export interface ForexPairData {
  symbol: string;
  fullName: string;
  currentPrice: number;
  lastUpdated: string;
  trend: "Strong Bullish" | "Bullish" | "Neutral" | "Bearish" | "Strong Bearish";
  confidence: number; // 1-10
  sentimentRetail: { buyPercent: number; sellPercent: number };
  
  // 1. Market Narrative & Bias
  marketNarrative: {
    story: string;
    marketPhase: string;
    immediateBias: "Bullish" | "Bearish" | "Neutral" | "Strong Bullish" | "Strong Bearish";
  };

  // 2. Higher Timeframe Structure (Weekly & Daily)
  higherTimeframe: {
    longTermTrend: string;
    keyLevels: { type: string; price: number; description: string }[];
    majorExtremes: string;
    htfBias: "Bullish" | "Bearish" | "Neutral" | "Strong Bullish" | "Strong Bearish";
  };

  // 3. Multi-Timeframe Price Action (Daily → 4H → 1H)
  multiTimeframe: {
    alignment: string;
    priceActionCharacter: string;
    candlestickPatterns: string;
    sessionContext: string;
    liquiditySweeps: string;
  };

  // 4. Technical Analysis
  technicalAnalysis: TechnicalIndicatorsState & {
    summaryText: string;
    fibConfluences: string;
  };

  // 5. SMC / Advanced Price Action
  smcConcepts: SMCConcept[];

  // 6. Fundamental & Sentiment Context
  fundamentals: {
    overview: string;
    drivers: FundamentalDriver[];
    upcomingNews: NewsEvent[];
    dxyCorrelation: string;
    riskSentiment: string;
  };

  // 7. Scenario Analysis
  scenarios: Scenario[];

  // 8. Trading Setup & Risk Management
  setup: TradeSetup;

  // 9. Final Verdict
  verdict: {
    recommendedAction: string;
    keyLevelsToWatch: string[];
    riskWarning: string;
  };

  // SVG Chart Mock Points for Daily, 4H, 1H
  timeframesData: {
    Daily: { time: string; open: number; high: number; low: number; close: number; volume: number }[];
    "4H": { time: string; open: number; high: number; low: number; close: number; volume: number }[];
    "1H": { time: string; open: number; high: number; low: number; close: number; volume: number }[];
  };
}

export const FOREX_PAIRS: Record<string, ForexPairData> = {
  EURUSD: {
    symbol: "EURUSD",
    fullName: "Euro / US Dollar",
    currentPrice: 1.08450,
    lastUpdated: "2026-03-31",
    trend: "Bearish",
    confidence: 8,
    sentimentRetail: { buyPercent: 62, sellPercent: 38 },
    
    marketNarrative: {
      story: "The EURUSD is navigating a decisive bearish expansion as divergence between European Central Bank (ECB) policy expectations and a resilient US economic print keeps the pair under structural selling pressure. Price recently cleared significant swing lows, confirming structural order flow remains strongly bearish on the daily scale, with sellers looking to target the major liquidity sweep at the quarterly lows.",
      marketPhase: "Bearish Continuation / Expansion",
      immediateBias: "Bearish"
    },

    higherTimeframe: {
      longTermTrend: "Overall Bearish trend on the Weekly and Daily frames. A decisive Break of Structure (BOS) occurred when the daily candle closed below the structural swing low at 1.08900. Price is recording cleaner Lower Highs and Lower Lows.",
      keyLevels: [
        { type: "Institutional Resistance Zone", price: 1.09200, description: "Daily Breaker Block and 50% Equilibrium Fibonacci level." },
        { type: "Major Swing Support", price: 1.07650, description: "Key daily swing low and previous HTF liquidity sweep point." },
        { type: "Monthly Resistance Extreme", price: 1.10500, description: "Quarterly high and major institutional liquidity pool." }
      ],
      majorExtremes: "Monthly Range Extremes: 1.07200 (Extreme Discount/Support) to 1.11400 (Premium/Supply). Currently, the pair resides in the discount territory of the quarterly range, but lacks any HTF bullish reversal markers.",
      htfBias: "Bearish"
    },

    multiTimeframe: {
      alignment: "Daily, 4H, and 1H trends are completely aligned to the downside. The Daily timeframe shows clean bearish candles closing near their lows, while the 4H is printing a corrective bearish flag back into premium supply zones. The 1H timeframe displays minor structure shifts (CHOCH) which frequently get run over by session volatility.",
      priceActionCharacter: "Impulsive expansions downward, followed by low-velocity, choppy corrections upward (bearish flags). Volume and volatility expand during London and NY sessions, creating clear, clean directional runs.",
      candlestickPatterns: "Strong bearish engulfing patterns on the Daily chart at the 1.09150 level, followed by small-bodied, long-upper-shadow pin bars on the 4H chart, indicating heavy active institutional distribution.",
      sessionContext: "London session regularly engineers the high of the day (liquidity hunt) followed by NY session expansion which triggers heavy retail stop-losses beneath the Asian session range.",
      liquiditySweeps: "Recent sweep of buy-side liquidity above Asian Session high at 1.08800 triggered the massive NY displacement downward."
    },

    technicalAnalysis: {
      ema50: 1.09120,
      ema100: 1.09450,
      ema200: 1.09880,
      rsi14: 38.5,
      macdLine: -0.0042,
      signalLine: -0.0031,
      macdHist: -0.0011,
      bollingerUpper: 1.09650,
      bollingerLower: 1.08120,
      atr14: 0.0068,
      summaryText: "The 50 EMA is currently positioned below the 100 and 200 EMAs (perfect bearish alignment). RSI (14) stands at 38.5, indicating stable downward momentum without hitting extreme oversold conditions yet. The MACD histogram is negative and widening, highlighting building downside pressure. Price is hugging the lower Bollinger Band, with ATR expansion pointing to active high-volatility selling.",
      fibConfluences: "The 0.618 Fib Golden Ratio of the recent daily swing high to low aligns perfectly with the 1.09200 daily Order Block, making this an extremely high-probability area of interest."
    },

    smcConcepts: [
      { name: "Daily Bearish Order Block", priceZone: "1.09150 - 1.09320", type: "Order Block", description: "The last up-candle before the aggressive displacement downward that broke the major structural daily support level." },
      { name: "4H Fair Value Gap (FVG)", priceZone: "1.08850 - 1.09020", type: "FVG", description: "A high-probability imbalance zone where institutional sell orders left price inefficiently filled. High likelihood of immediate retest and sell reaction." },
      { name: "Sell-Side Liquidity Pool (SSL)", priceZone: "1.07950 - 1.08050", type: "Liquidity Pool", description: "Aggregated stop-losses from retail trendline buyers who entered on double-bottom patterns. This zone is a magnetic target for institutional players." },
      { name: "Daily Breaker Block", priceZone: "1.08900", type: "Breaker Block", description: "A broken support zone that has now flipped into a highly validated institutional resistance area." }
    ],

    fundamentals: {
      overview: "The US Dollar index (DXY) remains robust due to higher-for-longer Fed interest rate expectations, supported by strong US core retail sales and inflation figures. Conversely, the Eurozone inflation continues to cool rapidly, giving the ECB plenty of leeway to consider further interest rate cuts, widening the transatlantic yield spread in favor of the Greenback.",
      drivers: [
        { factor: "Fed Interest Rate Policy", impact: "High", description: "Federal Reserve maintains hawkish rhetoric, resisting premature rate cuts." },
        { factor: "Eurozone GDP Growth", impact: "Medium", description: "Stagnating growth in Germany and France puts pressure on ECB monetary policy." },
        { factor: "Yield Differentials", impact: "High", description: "US Treasury 10-Year yields rising above 4.25% versus German Bunds at 2.30%." }
      ],
      upcomingNews: [
        { time: "14:30 EST", currency: "USD", event: "Core PCE Price Index MoM", forecast: "0.2%", previous: "0.3%", impact: "High" },
        { time: "09:00 EST", currency: "EUR", event: "German Flash CPI YoY", forecast: "1.9%", previous: "2.1%", impact: "High" },
        { time: "08:30 EST", currency: "USD", event: "Weekly Unemployment Claims", forecast: "215K", previous: "210K", impact: "Medium" }
      ],
      dxyCorrelation: "Strongly negative (-0.92 correlation). A break of DXY above key structural resistance at 104.50 will accelerate the EURUSD dump towards the 1.0750 zone.",
      riskSentiment: "Risk-off sentiment. Weak global indices and rising geopolitical yields have accelerated defensive buying flows towards the safe-haven Greenback."
    },

    scenarios: [
      {
        title: "Bearish Continuation (Primary / High Probability)",
        bias: "Bearish",
        probability: 75,
        levels: ["1.08850", "1.08100", "1.07650"],
        description: "Price rises during the early London session to tap into the 4H FVG and test the 1.08850 resistance. Following a liquidity sweep of Asian session highs, a sharp Market Structure Shift (MSS) on the 15M chart sends price tumbling down to target the Sell-side Liquidity (SSL) at 1.08000, continuing down to 1.07650."
      },
      {
        title: "Bullish Relief / Short Squeeze (Alternative)",
        bias: "Bullish",
        probability: 25,
        levels: ["1.09350", "1.09800", "1.10100"],
        description: "If upcoming US PCE data misses forecasts significantly, the dollar will pull back aggressively. EURUSD would break and close a 4H candle above 1.09200, invalidating the bearish structure, and forcing a short-squeeze up to the 200-day EMA near 1.09800."
      }
    ],

    setup: {
      entry: 1.08850,
      stopLoss: 1.09250,
      tp1: 1.08050,
      tp2: 1.07650,
      rrRatio: 3.0,
      invalidation: 1.09350,
      management: "Once price reaches 1.08350 (1:1.25 RR), secure profit by trailing stop loss to break-even (BE) and taking 50% partial profits. Hold the remaining position for target 2."
    },

    verdict: {
      recommendedAction: "Sell rally / short inside premium Fair Value Gap during early London/NY session crossover.",
      keyLevelsToWatch: ["1.08850 (FVG/Entry)", "1.09200 (Breaker Block/Stop Zone)", "1.08000 (Major SSL Target)"],
      riskWarning: "High volatility expected around Core PCE release. Avoid entering positions 30 minutes prior to and after the release. Utilize rigid 1% maximum account risk per trade."
    },

    timeframesData: {
      Daily: [
        { time: "Mon", open: 1.0980, high: 1.0995, low: 1.0950, close: 1.0962, volume: 142000 },
        { time: "Tue", open: 1.0962, high: 1.0975, low: 1.0910, close: 1.0915, volume: 168000 },
        { time: "Wed", open: 1.0915, high: 1.0935, low: 1.0880, close: 1.0890, volume: 185000 },
        { time: "Thu", open: 1.0890, high: 1.0922, low: 1.0865, close: 1.0872, volume: 155000 },
        { time: "Fri", open: 1.0872, high: 1.0895, low: 1.0830, close: 1.0845, volume: 210000 },
        { time: "Today", open: 1.0845, high: 1.0890, low: 1.0825, close: 1.0845, volume: 195000 }
      ],
      "4H": [
        { time: "Bar 1", open: 1.0875, high: 1.0890, low: 1.0860, close: 1.0865, volume: 45000 },
        { time: "Bar 2", open: 1.0865, high: 1.0880, low: 1.0850, close: 1.0855, volume: 38000 },
        { time: "Bar 3", open: 1.0855, high: 1.0870, low: 1.0835, close: 1.0840, volume: 55000 },
        { time: "Bar 4", open: 1.0840, high: 1.0855, low: 1.0825, close: 1.0845, volume: 48000 },
        { time: "Bar 5", open: 1.0845, high: 1.0860, low: 1.0830, close: 1.0850, volume: 42000 },
        { time: "Current", open: 1.0850, high: 1.0890, low: 1.0835, close: 1.0845, volume: 51000 }
      ],
      "1H": [
        { time: "09:00", open: 1.0840, high: 1.0855, low: 1.0835, close: 1.0850, volume: 12000 },
        { time: "10:00", open: 1.0850, high: 1.0865, low: 1.0845, close: 1.0860, volume: 14000 },
        { time: "11:00", open: 1.0860, high: 1.0885, low: 1.0855, close: 1.0880, volume: 19000 },
        { time: "12:00", open: 1.0880, high: 1.0890, low: 1.0870, close: 1.0875, volume: 16000 },
        { time: "13:00", open: 1.0875, high: 1.0880, low: 1.0850, close: 1.0855, volume: 15000 },
        { time: "Current", open: 1.0855, high: 1.0865, low: 1.0830, close: 1.0845, volume: 18000 }
      ]
    }
  },
  GBPUSD: {
    symbol: "GBPUSD",
    fullName: "British Pound / US Dollar",
    currentPrice: 1.26120,
    lastUpdated: "2026-03-31",
    trend: "Neutral",
    confidence: 6,
    sentimentRetail: { buyPercent: 48, sellPercent: 52 },
    
    marketNarrative: {
      story: "GBPUSD continues to demonstrate relative resilience compared to other forex majors, trading inside a defined multi-week daily consolidation range. Although the broader USD bid keeps gains capped, sticky inflation in the UK has fueled market expectations that the Bank of England (BoE) will delay cuts. This creates a balanced, range-bound backdrop ideal for mean reversion players.",
      marketPhase: "Consolidation / Range-Bound",
      immediateBias: "Neutral"
    },

    higherTimeframe: {
      longTermTrend: "The higher timeframe trend is structurally neutral to slightly bullish on the weekly frame, but currently locked inside a massive horizontal bracket between 1.25000 and 1.28200. On the Daily frame, the pair is alternating between supply and demand zones with no persistent direction.",
      keyLevels: [
        { type: "Range High Resistance", price: 1.28000, description: "Major psychological level and historical range extreme." },
        { type: "Range Low Support", price: 1.25150, description: "Highly validated demand block that has rejected price 4 times." },
        { type: "Daily Equilibrium", price: 1.26500, description: "The 50% level of the multi-month trading range, acting as a magnet." }
      ],
      majorExtremes: "Support floor sits at 1.24800 (quarterly liquidity sweep) while resistance stands firm at 1.28800.",
      htfBias: "Neutral"
    },

    multiTimeframe: {
      alignment: "Conflicting alignment. The Daily timeframe is flat, hovering near its 200 EMA. The 4H timeframe shows local bearish structure following a rejection of the 1.27200 range high, while the 1H timeframe is printing accumulation patterns at the daily mid-range support around 1.26000.",
      priceActionCharacter: "Highly corrective, overlapping waves with high levels of retail stop hunts on both sides of the range. Trend continuation trades have faced severe failure rates, while range-reversal trades have excelled.",
      candlestickPatterns: "Frequent doji candles and spinning tops on the daily chart, accompanied by multiple long-tailed rejection pin-bars at the 1.25800 - 1.26000 area.",
      sessionContext: "London session usually pushes price to test the extreme edges of the intra-day range, while NY session reverses the flow back toward the range equilibrium.",
      liquiditySweeps: "A sweep of 1.25800 (previous daily low) triggered a quick 35-pip relief bounce in NY session."
    },

    technicalAnalysis: {
      ema50: 1.26550,
      ema100: 1.26420,
      ema200: 1.26180,
      rsi14: 48.0,
      macdLine: -0.0005,
      signalLine: -0.0003,
      macdHist: -0.0002,
      bollingerUpper: 1.27450,
      bollingerLower: 1.25350,
      atr14: 0.0075,
      summaryText: "The 50, 100, and 200 EMAs are converging and flatlining directly around the 1.26200 - 1.26500 price level, illustrating a perfect textbook consolidation state. RSI (14) is at 48.0, which reflects neutral momentum. MACD lines are clustered closely around the zero-line with a microscopic histogram, confirming low momentum. Bollinger Bands are starting to contract, hinting at an impending volatility squeeze.",
      fibConfluences: "Fibonacci 50% equilibrium level of the primary daily range sits precisely at 1.26500, acting as a structural anchor."
    },

    smcConcepts: [
      { name: "Daily Demands Order Block", priceZone: "1.25150 - 1.25400", type: "Order Block", description: "Extreme range-low demand block. Institutional buy orders are heavily nested here." },
      { name: "Daily Supply Pool", priceZone: "1.27800 - 1.28100", type: "Order Block", description: "Aggregated sell-orders waiting to defend the multi-month range extreme." },
      { name: "Internal Buy-side Liquidity (BSL)", priceZone: "1.27100", type: "Liquidity Pool", description: "Swing highs of the previous week, acting as an immediate draw on liquidity." },
      { name: "Fair Value Gap (FVG) 4H", priceZone: "1.26600 - 1.26800", type: "FVG", description: "An unmitigated bearish imbalance that needs to be filled prior to any sustained move lower." }
    ],

    fundamentals: {
      overview: "The British Pound is currently supported by sticky services inflation and a relatively conservative Bank of England tone, keeping rates at 5.25%. However, UK macroeconomic performance is brittle, with retail sales hovering in contraction. Strong US data keeps the US Dollar highly competitive, leading to a constant tug-of-war.",
      drivers: [
        { factor: "BoE Rate Expectations", impact: "High", description: "BoE expected to keep rates higher for longer than the ECB, backing the Pound." },
        { factor: "UK CPI Updates", impact: "High", description: "Any upside surprise in UK CPI spikes GBP instantly as traders push out rate cut bets." },
        { factor: "Global Risk Appetite", impact: "Medium", description: "GBP acts as a risk-on currency; positive equity markets help sustain GBP against USD." }
      ],
      upcomingNews: [
        { time: "05:30 EST", currency: "GBP", event: "BoE Governor Bailey Speaks", forecast: "N/A", previous: "N/A", impact: "High" },
        { time: "08:30 EST", currency: "USD", event: "GDP Growth Rate QoQ Final", forecast: "2.1%", previous: "2.0%", impact: "High" }
      ],
      dxyCorrelation: "Moderately negative (-0.75). GBP's idiosyncratic domestic factors often decouple it briefly from absolute dollar dominance.",
      riskSentiment: "Mixed global equity performance is translating to range-bound consolidation on cross pairs."
    },

    scenarios: [
      {
        title: "Range Bounce from Support (Primary)",
        bias: "Bullish",
        probability: 60,
        levels: ["1.25800", "1.26800", "1.27200"],
        description: "Price slides into the internal demand pool around 1.25800-1.26000. It sweeps the minor liquidity and prints a bullish pin bar. Buyers trigger positions to ride the bounce back to the daily equilibrium at 1.26800 and local range high of 1.27200."
      },
      {
        title: "Range Breakdown & Expansion (Alternative)",
        bias: "Bearish",
        probability: 40,
        levels: ["1.25150", "1.24500", "1.23800"],
        description: "A super strong US data release pushes DXY through the roof, forcing a breakdown below the major range support of 1.25150. A successful daily retest of 1.25150 as resistance confirms a massive structural shift targeting the 1.23800 level."
      }
    ],

    setup: {
      entry: 1.25950,
      stopLoss: 1.25500,
      tp1: 1.26800,
      tp2: 1.27300,
      rrRatio: 3.0,
      invalidation: 1.25350,
      management: "Take 40% profits at TP1 and move stop loss to entry. Move remaining 60% stop loss progressively behind 4H swing lows to target TP2."
    },

    verdict: {
      recommendedAction: "Buy near range low demand (1.25800 - 1.26000) or sell near range high supply (1.27500 - 1.27800) with tight invalidations. Avoid trading the range midpoint.",
      keyLevelsToWatch: ["1.25150 (Range Bottom)", "1.26500 (Range Midpoint)", "1.28000 (Range Ceiling)"],
      riskWarning: "Range consolidations can break violently when a catalyst appears. Ensure you have hard stop losses in place."
    },

    timeframesData: {
      Daily: [
        { time: "Mon", open: 1.2680, high: 1.2740, low: 1.2650, close: 1.2710, volume: 110000 },
        { time: "Tue", open: 1.2710, high: 1.2725, low: 1.2620, close: 1.2645, volume: 130000 },
        { time: "Wed", open: 1.2645, high: 1.2690, low: 1.2610, close: 1.2630, volume: 115000 },
        { time: "Thu", open: 1.2630, high: 1.2685, low: 1.2580, close: 1.2610, volume: 145000 },
        { time: "Fri", open: 1.2610, high: 1.2650, low: 1.2590, close: 1.2612, volume: 120000 },
        { time: "Today", open: 1.2612, high: 1.2660, low: 1.2595, close: 1.2612, volume: 95000 }
      ],
      "4H": [
        { time: "Bar 1", open: 1.2640, high: 1.2675, low: 1.2615, close: 1.2625, volume: 32000 },
        { time: "Bar 2", open: 1.2625, high: 1.2650, low: 1.2600, close: 1.2610, volume: 29000 },
        { time: "Bar 3", open: 1.2610, high: 1.2635, low: 1.2585, close: 1.2595, volume: 44000 },
        { time: "Bar 4", open: 1.2595, high: 1.2630, low: 1.2590, close: 1.2615, volume: 38000 },
        { time: "Bar 5", open: 1.2615, high: 1.2645, low: 1.2610, close: 1.2630, volume: 31000 },
        { time: "Current", open: 1.2630, high: 1.2660, low: 1.2595, close: 1.2612, volume: 37000 }
      ],
      "1H": [
        { time: "09:00", open: 1.2605, high: 1.2625, low: 1.2595, close: 1.2615, volume: 9000 },
        { time: "10:00", open: 1.2615, high: 1.2635, low: 1.2600, close: 1.2605, volume: 11000 },
        { time: "11:00", open: 1.2605, high: 1.2640, low: 1.2595, close: 1.2635, volume: 15000 },
        { time: "12:00", open: 1.2635, high: 1.2650, low: 1.2620, close: 1.2645, volume: 13000 },
        { time: "13:00", open: 1.2645, high: 1.2655, low: 1.2610, close: 1.2612, volume: 12000 },
        { time: "Current", open: 1.2612, high: 1.2635, low: 1.2595, close: 1.2612, volume: 14000 }
      ]
    }
  },
  USDJPY: {
    symbol: "USDJPY",
    fullName: "US Dollar / Japanese Yen",
    currentPrice: 151.850,
    lastUpdated: "2026-03-31",
    trend: "Strong Bullish",
    confidence: 9,
    sentimentRetail: { buyPercent: 24, sellPercent: 76 },
    
    marketNarrative: {
      story: "USDJPY continues its aggressive ascent toward multi-decade highs, fueled by the massive yield gap between the US Federal Reserve and the Bank of Japan (BoJ). Despite the BoJ's historic departure from negative interest rates, their communication remains highly accommodative, making the Yen an ideal funding currency for carry trades. However, extreme intervention warnings from Japanese officials keep volatility exceptionally high at these key psychological ceilings.",
      marketPhase: "Parabolic Expansion / Resistance Testing",
      immediateBias: "Strong Bullish"
    },

    higherTimeframe: {
      longTermTrend: "Clean, undeniable bullish trend on the Monthly, Weekly, and Daily charts. The structure consists of successive Higher Highs and Higher Lows, with a significant Break of Structure (BOS) occurring at 149.200. Price is holding comfortably above all major HTF moving averages.",
      keyLevels: [
        { type: "Psychological Barrier / Intervention Risk Zone", price: 152.000, description: "Historical double-top and rumored level for BoJ currency intervention." },
        { type: "Institutional Demand / Daily Order Block", price: 149.500, description: "Key daily demand block aligned with the 50-day EMA." },
        { type: "Swing Support Zone", price: 147.800, description: "Major weekly structural HL and key corrective support." }
      ],
      majorExtremes: "Support extreme at 146.500 (deep discount), and overhead resistance is blue sky if 152.000 is cleared cleanly without intervention.",
      htfBias: "Strong Bullish"
    },

    multiTimeframe: {
      alignment: "Weekly, Daily, and 4H timeframes are in absolute alignment. The 1H timeframe is undergoing a tight consolidation just underneath the 152.000 level, printing a bullish ascending triangle. This is a classic pattern indicating strong buying pressure absorbing all available supply.",
      priceActionCharacter: "Strong, high-velocity upward impulses followed by shallow, horizontal consolidations. The pair refuses to retrace deeply, reflecting extreme buy-side pressure and continuous carry trade accumulation.",
      candlestickPatterns: "Strong daily bullish candles with very small wicks, indicating total control by buyers. Multiple failed rejection candles at 151.900 show that sellers are rapidly being squeezed out.",
      sessionContext: "Asian session experiences low volatility but steady grind; London session creates brief fake-outs; New York session triggers heavy institutional flow, frequently pushing the pair to daily highs.",
      liquiditySweeps: "Repeated sweeps of Asian session highs at 151.950 trigger minor 20-pip liquidations but find instant buyers."
    },

    technicalAnalysis: {
      ema50: 149.820,
      ema100: 148.550,
      ema200: 146.450,
      rsi14: 68.2,
      macdLine: 0.85,
      signalLine: 0.68,
      macdHist: 0.17,
      bollingerUpper: 152.200,
      bollingerLower: 148.900,
      atr14: 1.15,
      summaryText: "The technical indicators are heavily bullish. Price is trading far above the 50, 100, and 200 EMAs. RSI (14) stands at 68.2, approaching overbought status but showing zero signs of bearish divergence, indicating high momentum. MACD is positive and expanding, and Bollinger Bands are widening as ATR rises, showcasing expanding momentum.",
      fibConfluences: "Fibonacci 0.236 retracement aligns with the key 1H demand at 151.200, creating an ideal dip buy."
    },

    smcConcepts: [
      { name: "Daily Bullish Breaker Block", priceZone: "148.800 - 149.300", type: "Breaker Block", description: "Previous key resistance level that has flipped to major support upon breakout." },
      { name: "1H Bullish Order Block", priceZone: "151.100 - 151.300", type: "Order Block", description: "The local structural block that launched the recent leg up to 151.850." },
      { name: "Buy-Side Liquidity Pool (BSL)", priceZone: "152.000", type: "Liquidity Pool", description: "Massive pool of stop-losses from long-term retail swing short sellers. Running this will trigger high-velocity expansion." },
      { name: "FVG Daily Imbalance", priceZone: "149.800 - 150.400", type: "FVG", description: "High timeframe imbalance zone that remains completely open, acting as an ultimate support cushion." }
    ],

    fundamentals: {
      overview: "The core driver is the wide interest rate gap. The US Federal funds rate sits at 5.25%-5.50% while the Bank of Japan's rate is at a mere 0.0%-0.10%. This 500+ basis point differential guarantees that financial institutions receive premium payments for holding long USDJPY positions overnight, leading to relentless carry-trade bids.",
      drivers: [
        { factor: "Carry Trade Yield Spread", impact: "High", description: "Relentless yield-seeking flow keeps the Yen extremely weak." },
        { factor: "BoJ Intervention Threat", impact: "High", description: "Ministry of Finance (MoF) verbal warnings of direct Yen-buying intervention." },
        { factor: "US Bond Yields", impact: "High", description: "US 10-year Treasury yield moves dictate USDJPY intraday trends closely." }
      ],
      upcomingNews: [
        { time: "19:30 EST", currency: "JPY", event: "Tokyo Core CPI YoY", forecast: "2.2%", previous: "2.5%", impact: "High" },
        { time: "08:30 EST", currency: "USD", event: "ISM Manufacturing PMI", forecast: "50.1", previous: "48.8", impact: "High" }
      ],
      dxyCorrelation: "Extremely high positive correlation (+0.88). If DXY is strong, USDJPY rises rapidly unless official intervention is triggered.",
      riskSentiment: "Relentless global demand for high-interest carry trades overrides safe-haven flight, resulting in Yen weakness."
    },

    scenarios: [
      {
        title: "Ascending Triangle Breakout (Primary)",
        bias: "Strong Bullish",
        probability: 65,
        levels: ["152.100", "153.500", "154.800"],
        description: "Price breaks cleanly above 152.000, triggering billions in stop-losses. This short squeeze drives price rapidly to 153.500 and 154.800, before any official intervention takes place or the market finds new equilibrium."
      },
      {
        title: "BoJ Intervention Dump (Alternative)",
        bias: "Bearish",
        probability: 35,
        levels: ["151.900", "148.500", "146.200"],
        description: "Price breaks above 152.00, prompting the Bank of Japan to immediately step into the market on instructions from the Ministry of Finance. Direct Yen buying triggers a high-velocity 300-500 pip crash, slamming the pair down to key HTF support levels at 148.500 and 146.200."
      }
    ],

    setup: {
      entry: 151.300,
      stopLoss: 150.750,
      tp1: 152.450,
      tp2: 153.800,
      rrRatio: 4.5,
      invalidation: 150.500,
      management: "Enter half position at 151.300. Place another limit buy at 150.950. Move stop loss to break-even once 152.100 is taken out and closed above on a 4H basis."
    },

    verdict: {
      recommendedAction: "Buy on shallow pullbacks to 1H order blocks, but reduce position sizes significantly to mitigate potential BoJ intervention volatility.",
      keyLevelsToWatch: ["152.000 (Critical Multi-Year Resistance)", "151.100 (1H Support Floor)", "149.500 (HTF Daily Demand)"],
      riskWarning: "A sudden BoJ intervention can erase weeks of gains in seconds with massive slippage. Never trade USDJPY at these extremes without a verified hard stop-loss."
    },

    timeframesData: {
      Daily: [
        { time: "Mon", open: 148.80, high: 149.90, low: 148.50, close: 149.65, volume: 220000 },
        { time: "Tue", open: 149.65, high: 150.40, low: 149.30, close: 150.12, volume: 198000 },
        { time: "Wed", open: 150.12, high: 151.20, low: 149.95, close: 150.90, volume: 240000 },
        { time: "Thu", open: 150.90, high: 151.65, low: 150.60, close: 151.35, volume: 215000 },
        { time: "Fri", open: 151.35, high: 151.95, low: 151.10, close: 151.85, volume: 280000 },
        { time: "Today", open: 151.85, high: 151.97, low: 151.40, close: 151.85, volume: 310000 }
      ],
      "4H": [
        { time: "Bar 1", open: 151.20, high: 151.45, low: 151.10, close: 151.35, volume: 55000 },
        { time: "Bar 2", open: 151.35, high: 151.60, low: 151.20, close: 151.50, volume: 49000 },
        { time: "Bar 3", open: 151.50, high: 151.80, low: 151.40, close: 151.70, volume: 62000 },
        { time: "Bar 4", open: 151.70, high: 151.95, low: 151.60, close: 151.85, volume: 58000 },
        { time: "Bar 5", open: 151.85, high: 151.97, low: 151.75, close: 151.80, volume: 41000 },
        { time: "Current", open: 151.80, high: 151.97, low: 151.65, close: 151.85, volume: 53000 }
      ],
      "1H": [
        { time: "09:00", open: 151.65, high: 151.80, low: 151.60, close: 151.75, volume: 18000 },
        { time: "10:00", open: 151.75, high: 151.90, low: 151.70, close: 151.80, volume: 21000 },
        { time: "11:00", open: 151.80, high: 151.97, low: 151.75, close: 151.92, volume: 29000 },
        { time: "12:00", open: 151.92, high: 151.97, low: 151.80, close: 151.85, volume: 25000 },
        { time: "13:00", open: 151.85, high: 151.90, low: 151.70, close: 151.80, volume: 22000 },
        { time: "Current", open: 151.80, high: 151.97, low: 151.65, close: 151.85, volume: 26000 }
      ]
    }
  },
  XAUUSD: {
    symbol: "XAUUSD",
    fullName: "Gold / US Dollar (Commodity Major)",
    currentPrice: 2175.50,
    lastUpdated: "2026-03-31",
    trend: "Strong Bullish",
    confidence: 9,
    sentimentRetail: { buyPercent: 33, sellPercent: 67 },
    
    marketNarrative: {
      story: "Gold has broken into historical price discovery mode, printing dynamic higher highs. Rising global central bank reserve diversification and sovereign-wealth fund hedging are driving an absolute physical premium. Any short-term pullback in Gold is being rapidly absorbed by official institutions, establishing a resilient macro base.",
      marketPhase: "Breakout / Price Discovery",
      immediateBias: "Strong Bullish"
    },

    higherTimeframe: {
      longTermTrend: "Clean parabolic long-term bullish trend on Weekly and Daily frames. Major Break of Structure (BOS) occurred on the weekly chart at 2135.00, flipping a multi-year triple-top resistance into the ultimate institutional demand floor.",
      keyLevels: [
        { type: "Critical Weekly Demand Floor", price: 2135.00, description: "Previous massive historical triple top and multi-year breakout point." },
        { type: "Daily Order Block Support", price: 2150.00, description: "Highly validated daily consolidation block before the last parabolic leg up." },
        { type: "Major Psychological Extension High", price: 2200.00, description: "Target psychological extreme and key option concentration barrier." }
      ],
      majorExtremes: "Monthly Range Extremes: 2085.00 (Extreme Discount/Demand) to 2210.00 (Overhead Extension Target). Currently residing in severe premium territories.",
      htfBias: "Strong Bullish"
    },

    multiTimeframe: {
      alignment: "Weekly, Daily, and 4H timeframes are completely aligned to the upside. The 1H timeframe shows a clean bullish flag consolidation pattern bouncing off the local 50-period EMA, showing that buyers are keeping structural control on every micro scale.",
      priceActionCharacter: "Clean, high-momentum impulsive candles up, followed by very tight horizontal flags (high-tight flags). Volume has expanded heavily on up-days, confirming true institutional accumulation.",
      candlestickPatterns: "Strong bullish engulfing on the Daily frame, with multiple bullish hammers printed on the 4H charts during London session open tests.",
      sessionContext: "London session regularly sweeps Asian session lows to trap premature breakout sellers, followed by aggressive NY session expansion to new highs.",
      liquiditySweeps: "A sweep of 2162.00 (prior day NY session low) triggered a quick 20-dollar expansion up to the current 2175.50 level."
    },

    technicalAnalysis: {
      ema50: 2145.20,
      ema100: 2110.80,
      ema200: 2072.40,
      rsi14: 72.8,
      macdLine: 35.5,
      signalLine: 28.2,
      macdHist: 7.3,
      bollingerUpper: 2195.00,
      bollingerLower: 2125.00,
      atr14: 28.5,
      summaryText: "The 50, 100, and 200 EMAs are perfectly fanned and rising. RSI (14) stands at 72.8, reflecting heavy momentum in bullish territory, but showing zero signs of bearish divergence, indicating steady accumulation. MACD is positive and expanding, and Bollinger Bands are expanding upwards, indicating structural volatility expansion.",
      fibConfluences: "The 0.382 Fibonacci retracement of the recent swing aligns perfectly with the 2150.00 Daily Order Block, creating a massive confluence for buyers."
    },

    smcConcepts: [
      { name: "Daily Bullish Breaker Block", priceZone: "2135.00 - 2145.00", type: "Breaker Block", description: "Flipped multi-year resistance block, now representing the most robust institutional buying zone on earth." },
      { name: "4H Bullish Order Block", priceZone: "2158.00 - 2164.00", type: "Order Block", description: "The local structural consolidation block that launched the recent leg up to 2175.50." },
      { name: "Buy-Side Liquidity Pool (BSL)", priceZone: "2200.00", type: "Liquidity Pool", description: "Overhead psychological target and major options dealer hedging barrier." },
      { name: "FVG Daily Imbalance", priceZone: "2115.00 - 2128.00", type: "FVG", description: "Deep unmitigated daily Fair Value Gap that remains open as an ultimate fallback support zone." }
    ],

    fundamentals: {
      overview: "The gold bull run is structurally driven by sovereign central banks (led by China, Poland, and Singapore) diversifying away from USD reserve assets amid geopolitical tensions. Additionally, markets are pricing in a high-probability pivot cycle by the Fed, lowering the opportunity cost of holding non-yielding safe-haven assets.",
      drivers: [
        { factor: "Central Bank Reserves", impact: "High", description: "Relentless physical bullion purchases by global central banks." },
        { factor: "Fed Rate Cut Timeline", impact: "High", description: "Expected interest rate cuts from the Fed in 2026 lower yields, backing Gold." },
        { factor: "Geopolitical Hedge Premium", impact: "High", description: "Ongoing conflict concerns and sovereign trade fragmentation keep bid active." }
      ],
      upcomingNews: [
        { time: "08:30 EST", currency: "USD", event: "Non-Farm Employment Change (NFP)", forecast: "198K", previous: "223K", impact: "High" },
        { time: "08:30 EST", currency: "USD", event: "Unemployment Rate", forecast: "3.9%", previous: "3.8%", impact: "High" }
      ],
      dxyCorrelation: "Historically negative correlation, but currently displaying safe-haven decoupling (-0.45). Gold can rise even during periods of USD strength.",
      riskSentiment: "Defensive buying is highly active as equity valuations look historically stretched."
    },

    scenarios: [
      {
        title: "Bullish Flag Breakout (Primary)",
        bias: "Strong Bullish",
        probability: 70,
        levels: ["2164.00", "2195.00", "2210.00"],
        description: "Price executes a small correction down to the 4H order block at 2164.00 during early London session. Following a quick sweep of internal lows, a massive expansion occurs in NY, breaking psychological resistance at 2200.00."
      },
      {
        title: "Deep Mean Reversion Correction (Alternative)",
        bias: "Bearish",
        probability: 30,
        levels: ["2135.00", "2110.00", "2085.00"],
        description: "An unexpectedly hot NFP print forces a massive hawk-shock. Traders dump safe-haven hedges, breaking the 4H support and driving a deep corrective plunge back to the major Weekly Demand floor near 2135.00."
      }
    ],

    setup: {
      entry: 2164.00,
      stopLoss: 2148.00,
      tp1: 2195.00,
      tp2: 2210.00,
      rrRatio: 2.9,
      invalidation: 2144.00,
      management: "Take 40% profit at 2185.00 and lock stop loss to entry. Hold remaining position for the major quarterly expansion high target at 2210.00."
    },

    verdict: {
      recommendedAction: "Buy on shallow dips to 4H order blocks (2158.00-2164.00) with strict risk parameter protections.",
      keyLevelsToWatch: ["2164.00 (Entry/OB Support)", "2135.00 (HTF Breaker Floor)", "2200.00 (Overhead Psychological Target)"],
      riskWarning: "Gold has high intrinsic volatility. Ensure risk is strictly kept to a maximum of 1% of the account value to avoid margin call triggers during NFP data whipsaws."
    },

    timeframesData: {
      Daily: [
        { time: "Mon", open: 2110.0, high: 2135.0, low: 2105.0, close: 2130.0, volume: 340000 },
        { time: "Tue", open: 2130.0, high: 2145.0, low: 2125.0, close: 2142.0, volume: 390000 },
        { time: "Wed", open: 2142.0, high: 2160.0, low: 2138.0, close: 2155.0, volume: 410000 },
        { time: "Thu", open: 2155.0, high: 2165.0, low: 2148.0, close: 2160.0, volume: 380000 },
        { time: "Fri", open: 2160.0, high: 2180.0, low: 2152.0, close: 2170.0, volume: 490000 },
        { time: "Today", open: 2170.0, high: 2185.0, low: 2162.0, close: 2175.5, volume: 450000 }
      ],
      "4H": [
        { time: "Bar 1", open: 2160.0, high: 2168.0, low: 2158.0, close: 2164.0, volume: 92000 },
        { time: "Bar 2", open: 2164.0, high: 2170.0, low: 2161.0, close: 2168.0, volume: 85000 },
        { time: "Bar 3", open: 2168.0, high: 2175.0, low: 2165.0, close: 2172.0, volume: 110000 },
        { time: "Bar 4", open: 2172.0, high: 2180.0, low: 2168.0, close: 2174.0, volume: 105000 },
        { time: "Bar 5", open: 2174.0, high: 2185.0, low: 2170.0, close: 2175.5, volume: 115000 },
        { time: "Current", open: 2175.5, high: 2185.0, low: 2162.0, close: 2175.5, volume: 125000 }
      ],
      "1H": [
        { time: "09:00", open: 2168.0, high: 2172.0, low: 2166.0, close: 2170.0, volume: 31000 },
        { time: "10:00", open: 2170.0, high: 2174.0, low: 2168.0, close: 2173.0, volume: 29000 },
        { time: "11:00", open: 2173.0, high: 2178.0, low: 2171.0, close: 2176.0, volume: 45000 },
        { time: "12:00", open: 2176.0, high: 2182.0, low: 2174.0, close: 2178.0, volume: 38000 },
        { time: "13:00", open: 2178.0, high: 2180.0, low: 2173.0, close: 2175.5, volume: 41000 },
        { time: "Current", open: 2175.5, high: 2185.0, low: 2162.0, close: 2175.5, volume: 48000 }
      ]
    }
  },
  AUDUSD: {
    symbol: "AUDUSD",
    fullName: "Australian Dollar / US Dollar",
    currentPrice: 0.65220,
    lastUpdated: "2026-03-31",
    trend: "Bearish",
    confidence: 7,
    sentimentRetail: { buyPercent: 71, sellPercent: 29 },
    
    marketNarrative: {
      story: "The Australian Dollar is showing severe structural weakness against the US Dollar as economic sluggishness in China drags down industrial commodity prices. Copper and Iron Ore are facing sustained supply gluts, removing critical support for the Aussie. Simultaneously, the Reserve Bank of Australia (RBA) has adopted a neutral posture, leaving the currency defenseless against a high-yielding US Dollar.",
      marketPhase: "Bearish Channel / Distribution",
      immediateBias: "Bearish"
    },

    higherTimeframe: {
      longTermTrend: "The AUDUSD is encapsulated in a clean downward sloping channel on the Daily and Weekly timeframes. The Daily chart displays multiple rejections from the channel ceiling at 0.66800, leading to a Bearish Break of Structure (BOS) below 0.65600. It is consistently making Lower Highs and Lower Lows.",
      keyLevels: [
        { type: "Channel Resistance", price: 0.66400, description: "Confluence of descending daily channel ceiling and the 200-day EMA." },
        { type: "Daily Demand Zone", price: 0.64500, description: "Historical support and multi-month floor." },
        { type: "Intermediate Resistance", price: 0.65800, description: "Previous swing low which has now flipped into validated resistance." }
      ],
      majorExtremes: "Monthly Range Extremes: 0.64400 (Support/Extreme Discount) to 0.67200 (Supply/Extreme Premium). Path of least resistance points downwards.",
      htfBias: "Bearish"
    },

    multiTimeframe: {
      alignment: "Strong bearish alignment on Daily and 4H timeframes. The 1H timeframe is undergoing minor accumulation, printing a small double-bottom pattern at 0.65050. This bullish intraday correction is highly likely to face severe supply near the 0.65600 area.",
      priceActionCharacter: "Sloppy, choppy downward movement punctuated by aggressive, high-volume dumps during NY session. Upward moves are grinding and lack institutional volume.",
      candlestickPatterns: "Several large daily bearish candles with little to no bottom shadows. The 4H candles are characterized by long upper wicks, showing active supply capping any attempt to rally.",
      sessionContext: "Asian session handles basic commodity pricing adjustments; London session consolidates; NY session triggers heavy selling flow on US data releases.",
      liquiditySweeps: "A sweep of daily highs at 0.65450 triggered the subsequent 4H distribution downwards."
    },

    technicalAnalysis: {
      ema50: 0.65850,
      ema100: 0.66120,
      ema200: 0.66400,
      rsi14: 34.0,
      macdLine: -0.0035,
      signalLine: -0.0028,
      macdHist: -0.0007,
      bollingerUpper: 0.66250,
      bollingerLower: 0.64950,
      atr14: 0.0055,
      summaryText: "The 50, 100, and 200 EMAs are beautifully stacked in bearish sequence above the current price. RSI (14) stands near 34.0, indicating high bearish intensity with minor space left before becoming technically oversold. MACD lines are falling rapidly into negative territory, and Bollinger Bands are expanding downwards, signaling a powerful trend extension.",
      fibConfluences: "The 0.618 Golden ratio of the recent Daily expansion matches exactly with the daily Breaker Block at 0.65600."
    },

    smcConcepts: [
      { name: "Daily Bearish Breaker Block", priceZone: "0.65600 - 0.65750", type: "Breaker Block", description: "A major broken support floor. Ready to trigger substantial institutional selling on any retest." },
      { name: "Bearish Mitigation Block", priceZone: "0.65900 - 0.66100", type: "Mitigation Block", description: "Zone where large players are looking to exit remaining long positions at break-even, amplifying downside pressure." },
      { name: "Daily Fair Value Gap (FVG)", priceZone: "0.65500 - 0.65680", type: "FVG", description: "Imbalance created by the heavy sell-off. High confluence with the key Breaker Block." },
      { name: "Sell-Side Liquidity Pool (SSL)", priceZone: "0.64450", type: "Liquidity Pool", description: "Aggregated stop-losses below the multi-month support floor. This is the main target for current short swings." }
    ],

    fundamentals: {
      overview: "As a premier commodity currency, the Australian Dollar is highly sensitive to China's economic health. With the Chinese property sector remaining in a deep depression and manufacturing indices stagnating, demand for Australian iron ore has plummeted. The US Dollar, supported by high yields, continues to act as a major vacuum of capital.",
      drivers: [
        { factor: "Commodity Prices (Iron Ore)", impact: "High", description: "Iron ore prices falling back to $100/ton severely impacts Australia's terms of trade." },
        { factor: "China Macro Performance", impact: "High", description: "Weak stimulus measures from Beijing fail to restore confidence in Aussie exports." },
        { factor: "RBA Policy Stance", impact: "Medium", description: "RBA maintains a cautious neutral posture, removing hawkish currency tailwinds." }
      ],
      upcomingNews: [
        { time: "20:30 EST", currency: "AUD", event: "RBA Rate Statement & Decision", forecast: "4.35%", previous: "4.35%", impact: "High" },
        { time: "02:45 EST", currency: "CNY", event: "Caixin Manufacturing PMI", forecast: "50.5", previous: "50.9", impact: "Medium" }
      ],
      dxyCorrelation: "Strongly negative (-0.85). Weak commodities plus strong DXY creates the absolute worst-case scenario for the Aussie.",
      riskSentiment: "Heavy pressure on industrial base commodities has triggered systematic commodity commodity-fund outflows."
    },

    scenarios: [
      {
        title: "Retest & Roll-Over (Primary)",
        bias: "Bearish",
        probability: 70,
        levels: ["0.65520", "0.64800", "0.64500"],
        description: "Price executes a corrective rally to fill the daily FVG and test the 0.65520 level. At this junction, strong selling resumes on the London/NY session open, driving price down to sweep the 0.64800 level and continue toward the multi-month support floor of 0.64500."
      },
      {
        title: "Short Squeeze on RBA Hawkish Surprise (Alternative)",
        bias: "Bullish",
        probability: 30,
        levels: ["0.65800", "0.66400", "0.66900"],
        description: "If the RBA delivers a surprise hawkish rate hike or explicitly threatens further tightening, AUDUSD will break through the FVG at 0.65600 and rocket up to test the 200-day EMA at 0.66400 to trigger a major short squeeze."
      }
    ],

    setup: {
      entry: 0.65520,
      stopLoss: 0.65850,
      tp1: 0.64850,
      tp2: 0.64500,
      rrRatio: 3.1,
      invalidation: 0.65900,
      management: "Take 50% partial profits at 0.64850 and trail stops to entry. Let the remainder run down to the ultimate target at 0.64500."
    },

    verdict: {
      recommendedAction: "Sell rally / short the retest of the daily Breaker Block at 0.65520 with stops above 0.65850.",
      keyLevelsToWatch: ["0.65520 (Entry / FVG Zone)", "0.64500 (Major Support floor)", "0.65850 (Invalidation Level)"],
      riskWarning: "RBA rate decisions carry high risk of immediate spreads widening. Ensure orders are not executed during the announcement itself."
    },

    timeframesData: {
      Daily: [
        { time: "Mon", open: 0.6640, high: 0.6655, low: 0.6610, close: 0.6625, volume: 90000 },
        { time: "Tue", open: 0.6625, high: 0.6635, low: 0.6575, close: 0.6585, volume: 105000 },
        { time: "Wed", open: 0.6585, high: 0.6605, low: 0.6550, close: 0.6562, volume: 112000 },
        { time: "Thu", open: 0.6562, high: 0.6575, low: 0.6515, close: 0.6528, volume: 98000 },
        { time: "Fri", open: 0.6528, high: 0.6555, low: 0.6500, close: 0.6522, volume: 120000 },
        { time: "Today", open: 0.6522, high: 0.6545, low: 0.6505, close: 0.6522, volume: 115000 }
      ],
      "4H": [
        { time: "Bar 1", open: 0.6550, high: 0.6570, low: 0.6530, close: 0.6540, volume: 22000 },
        { time: "Bar 2", open: 0.6540, high: 0.6555, low: 0.6515, close: 0.6525, volume: 19000 },
        { time: "Bar 3", open: 0.6525, high: 0.6540, low: 0.6500, close: 0.6510, volume: 31000 },
        { time: "Bar 4", open: 0.6510, high: 0.6535, low: 0.6495, close: 0.6522, volume: 28000 },
        { time: "Bar 5", open: 0.6522, high: 0.6545, low: 0.6510, close: 0.6535, volume: 24000 },
        { time: "Current", open: 0.6535, high: 0.6550, low: 0.6505, close: 0.6522, volume: 29000 }
      ],
      "1H": [
        { time: "09:00", open: 0.6510, high: 0.6530, low: 0.6505, close: 0.6525, volume: 7000 },
        { time: "10:00", open: 0.6525, high: 0.6540, low: 0.6510, close: 0.6520, volume: 8000 },
        { time: "11:00", open: 0.6520, high: 0.6545, low: 0.6515, close: 0.6540, volume: 12000 },
        { time: "12:00", open: 0.6540, high: 0.6550, low: 0.6525, close: 0.6535, volume: 10000 },
        { time: "13:00", open: 0.6535, high: 0.6540, low: 0.6515, close: 0.6522, volume: 9000 },
        { time: "Current", open: 0.6522, high: 0.6545, low: 0.6505, close: 0.6522, volume: 11000 }
      ]
    }
  }
};
