export const statementsSamples = [require('./statements/20210731.json')];

export const statementsWithDividendSamples = [
  require('./statements/20201102_with_dividend.json'),
  require('./statements/20211231_with_dividend.json'),
];

export const dividendSamples = [
  require('./dividend/20210930.json'),
  require('./dividend/20211222.json'),
  require('./dividend/20220127_usd.json'),
];

export const statementsAndDividendsThatShouldCreateSameActivity = [
  {
    statement: require('./statements/20211231_with_dividend.json'),
    dividend: require('./dividend/20211222.json'),
  },
];

export const allSamples = statementsSamples.concat(
  dividendSamples,
  statementsWithDividendSamples
);
