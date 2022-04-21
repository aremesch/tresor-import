export const buySamples = [
  require('./buy/buy_1.json'),
  require('./buy/buy_2.json'),
  require('./buy/buy_3.json'),
  require('./buy/buy_4.json'),
  require('./buy/buy_5.json'),
];

export const sellSamples = [
  require('./sell/sell_1.json'),
  require('./sell/sell_2_with_church_tax.json'),
];

export const multipleTransactions = [
  require('./multipleTransactions/multiple_1.json'),
  require('./multipleTransactions/multiple_2.json'),
  require('./multipleTransactions/splittkauf_1.json'),
];

export const ausschuettung = [
  require('./ausschuettung/ausschuettung_1.json'),
  require('./ausschuettung/ausschuettung_2_with_tax.json'),
];

export const entgeltbelastung = [
  require('./entgeltbelastung/entgeltbelastung_1.json'),
];

export const wiederanlage = [
  require('./wiederanlage/wiederanlage_1.json'),
];

export const allSamples = buySamples.concat(
sellSamples,
multipleTransactions,
ausschuettung,
entgeltbelastung,
wiederanlage
);
