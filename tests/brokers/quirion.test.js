import * as quirion from '../../src/brokers/quirion';
import { validateAllSamples } from '../setup/brokers';
import {
  allSamples,
  statementsSamples,
  dividendSamples,
  statementsWithDividendSamples,
  statementsAndDividendsThatShouldCreateSameActivity,
} from './__mocks__/quirion';

describe('Broker: quirion', () => {
  validateAllSamples(quirion, allSamples, 'quirion');

  describe('Validate account statements', () => {
    test('Can parse document: 20210731', () => {
      const activities = quirion.parsePages(statementsSamples[0]).activities;

      expect(activities.length).toEqual(24);

      expect(activities[0]).toEqual({
        broker: 'quirion',
        type: 'Buy',
        date: '2021-07-15',
        datetime: '2021-07-15T' + activities[0].datetime.substring(11),
        isin: 'LU1931974692',
        company: 'Amundi Index Solu.-A.PRIME GL.Nam.-Ant.UCI.ETF DR USD Dis.oN',
        shares: 37.722,
        price: 26.1099,
        amount: 984.92,
        fee: 0,
        tax: 0,
      });

      expect(activities[23]).toEqual({
        broker: 'quirion',
        type: 'Buy',
        date: '2021-07-16',
        datetime: '2021-07-16T' + activities[23].datetime.substring(11),
        isin: 'IE00BKM4GZ66',
        company: 'iShs Core MSCI EM IMI U.ETF Registered Shares o.N.',
        shares: 0.08,
        price: 32.25,
        amount: 2.58,
        fee: 0,
        tax: 0,
      });
    });
  });

  describe('Validate account statements with dividend', () => {
    test('Can parse document: 20201102', () => {
      const activities = quirion.parsePages(
        statementsWithDividendSamples[0]
      ).activities;

      expect(activities.length).toEqual(33);

      expect(activities[0]).toEqual({
        broker: 'quirion',
        type: 'Sell',
        date: '2020-10-05',
        datetime: '2020-10-05T' + activities[0].datetime.substring(11),
        isin: 'IE00B42THM37',
        company: 'Dimensional Fds-Emerg.MktsVa. Registered Shares EUR Dis.o.N.',
        shares: 9.977,
        price: 8.2098,
        amount: 81.91,
        fee: 0,
        tax: 0,
      });

      expect(activities[18]).toEqual({
        broker: 'quirion',
        type: 'Dividend',
        date: '2020-10-09',
        datetime: '2020-10-09T' + activities[31].datetime.substring(11),
        isin: 'IE00B95PGT31',
        company: 'Vanguard FTSE Japan UCITS ETF Registered Shares USD Dis.oN',
        shares: 1.857,
        price: 0.0215,
        amount: 0.04,
        fee: 0,
        tax: 0,
      });

      expect(activities[32]).toEqual({
        broker: 'quirion',
        type: 'Buy',
        date: '2020-10-28',
        datetime: '2020-10-28T' + activities[32].datetime.substring(11),
        isin: 'LU1931974692',
        company: 'Amundi Index Solu.-A.PRIME GL.Nam.-Ant.UCI.ETF DR USD Dis.oN',
        shares: 0.184,
        price: 20,
        amount: 3.68,
        fee: 0,
        tax: 0,
      });
    });

    test('Can parse document: 20211231_with_dividend', () => {
      const activities = quirion.parsePages(
        statementsWithDividendSamples[1]
      ).activities;

      expect(activities.length).toEqual(16);

      expect(activities[0]).toEqual({
        broker: 'quirion',
        type: 'Buy',
        date: '2021-12-01',
        datetime: '2021-12-01T' + activities[0].datetime.substring(11),
        isin: 'LU1931974692',
        company: 'Amundi Index Solu.-A.PRIME GL.Nam.-Ant.UCI.ETF DR USD Dis.oN',
        shares: 2.0922,
        price: 27.9418,
        amount: 58.46,
        fee: 0,
        tax: 0,
      });

      expect(activities[14]).toEqual({
        broker: 'quirion',
        type: 'Buy',
        date: '2021-12-02',
        datetime: '2021-12-02T' + activities[14].datetime.substring(11),
        isin: 'IE00BDBRDM35',
        company:
          'iShsIII-Core Gl.Aggr.Bd UC.ETF Registered Shs EUR Acc.hgd o.N',
        shares: 0.0003,
        price: 0, // amount is so small and quirion rounds to 2 digits
        amount: 0, // amount is so small and quirion rounds to 2 digits
        fee: 0,
        tax: 0,
      });

      expect(activities[15]).toEqual({
        broker: 'quirion',
        type: 'Dividend',
        date: '2021-12-22',
        datetime: '2021-12-22T' + activities[15].datetime.substring(11),
        isin: 'LU1109942653',
        company: 'Xtr.II EUR H.Yield Corp.Bond Inhaber-Anteile 1D o.N.',
        shares: 12.687,
        price: 0.1347,
        amount: 1.71, // includes taxes
        fee: 0,
        tax: 0.45,
      });
    });
  });

  describe('Validate dividends', () => {
    test('Can the dividend in EUR parsed from the document 20210930', () => {
      const activities = quirion.parsePages(dividendSamples[0]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'quirion',
        type: 'Dividend',
        date: '2021-09-30',
        datetime: '2021-09-30T' + activities[0].datetime.substring(11),
        isin: 'LU1109942653',
        company: 'Xtr.II EUR H.Yield Corp.Bond Inhaber-Anteile 1D o.N.',
        shares: 10.714,
        price: 0.2688,
        amount: 2.88, // includes taxes
        fee: 0,
        tax: 0.75,
      });
    });

    test('Can the dividend in EUR parsed from the document 20211222', () => {
      const activities = quirion.parsePages(dividendSamples[1]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'quirion',
        type: 'Dividend',
        date: '2021-12-22',
        datetime: '2021-12-22T' + activities[0].datetime.substring(11),
        isin: 'LU1109942653',
        company: 'Xtr.II EUR H.Yield Corp.Bond Inhaber-Anteile 1D o.N.',
        shares: 12.687,
        price: 0.1347,
        amount: 1.71, // includes taxes
        fee: 0,
        tax: 0.45,
      });
    });

    test('Can the dividend in USD parsed from the document 20220127', () => {
      const activities = quirion.parsePages(dividendSamples[2]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'quirion',
        type: 'Dividend',
        date: '2022-01-26',
        datetime: '2022-01-26T' + activities[0].datetime.substring(11),
        isin: 'IE00B3F81G20',
        company: 'iShsIII-MSCI EM Sm.Cap U.ETF Registered Shares o.N.',
        shares: 1.3516,
        price: 0.7888, // EUR
        amount: 1.0684, // includes taxes, EUR
        fee: 0,
        tax: 0.276, // EUR
        fxRate: 1.1231,
        foreignCurrency: 'USD',
      });
    });
  });

  describe('Validate that account statement with dividend and dividend create the same activity', () => {
    test('20211231_with_dividend and 20211222', () => {
      const activitiesFromStatementWithDividend = quirion.parsePages(
        statementsAndDividendsThatShouldCreateSameActivity[0].statement
      );
      const activitiesFromDividend = quirion.parsePages(
        statementsAndDividendsThatShouldCreateSameActivity[0].dividend
      );

      expect(activitiesFromStatementWithDividend.activities).toEqual(
        expect.arrayContaining(activitiesFromDividend.activities)
      );
    });
  });
});
