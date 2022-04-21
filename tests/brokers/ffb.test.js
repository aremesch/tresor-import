import * as ffb from '../../src/brokers/ffb';
import { validateAllSamples } from '../setup/brokers';
import {
  buySamples,
  sellSamples,
  multipleTransactions,
  ausschuettung,
  wiederanlage,
  entgeltbelastung,
  allSamples,
} from './__mocks__/ffb';

describe('Broker: ffb', () => {
  let consoleErrorSpy;

  validateAllSamples(ffb, allSamples, 'ffb');

  describe('Validate buys', () => {
    test('Should map pdf data of sample correctly: buy_1', () => {
      const activities = ffb.parsePages(buySamples[0]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-07-01',
        datetime: '2021-07-01T10:00:00.000Z',
        isin: 'LU0815263628',
        wkn: 'A1J2X6',
        company: 'MSIF-Em.Leaders Eq.Fd.USD A',
        shares: 1.014,
        price: 49.30966469428008,
        amount: 50,
        fee: 0,
        tax: 0,
        foreignCurrency: 'USD',
        fxRate: 1.175902,
      });
    });

    test('Should map pdf data of sample correctly: buy_2', () => {
      const activities = ffb.parsePages(buySamples[1]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-06-14',
        datetime: '2021-06-14T10:00:00.000Z',
        isin: 'LU0345361124',
        wkn: 'A0NFGE',
        company: 'FF Asia Pac.Opp.Fd.AACCEUR',
        shares: 30.511,
        price: 32.70951460129134,
        amount: 998,
        fee: 2,
        tax: 0,
      });
    });
    test('Should map pdf data of sample correctly: buy_3', () => {
      const activities = ffb.parsePages(buySamples[2]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-07-07',
        datetime: '2021-07-07T10:00:00.000Z',
        isin: 'IE00B4ZJ4188',
        wkn: 'A0YAJD',
        company: 'Comgest Growth Europe Opport.',
        shares: 8.483,
        price: 58.94141223623718,
        amount: 500.0,
        fee: 0,
        tax: 0,
      });
    });

    test('Should map pdf data of sample correctly: buy_4', () => {
      const activities = ffb.parsePages(buySamples[3]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-07-20',
        datetime: '2021-07-20T10:00:00.000Z',
        isin: 'LU0864381354',
        wkn: 'A1J9YQ',
        company: 'MoSt.In.- Em.Lead.Eq.Fd. USD I',
        shares: 21.67,
        price: 49.173973234886944,
        amount: 1065.6,
        fee: 2,
        tax: 0,
        foreignCurrency: 'USD',
        fxRate: 1.175849,
      });
    });
    test('Should map pdf data of sample correctly: buy_5', () => {
      const activities = ffb.parsePages(buySamples[4]).activities;

      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-04-01',
        datetime: '2021-04-01T10:00:00.000Z',
        isin: 'DE000A1W2CK8',
        wkn: 'A1W2CK',
        company: 'GLS Bank Aktienfonds A',
        shares: 56.294,
        price: 88.81941237076775,
        amount: 5000,
        fee: 0,
        tax: 0,
      });
    });
  });

  describe('Validate sells', () => {
    test('Should map pdf data of sample correctly: sell_1', () => {
      const activities = ffb.parsePages(sellSamples[0]).activities;
      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Sell',
        date: '2021-07-16',
        datetime: '2021-07-16T10:00:00.000Z',
        isin: 'LU0345361124',
        wkn: 'A0NFGE',
        company: 'FF Asia Pac.Opp.Fd.AACCEUR',
        shares: 32.033,
        price: 32.41001467236912,
        amount: 1038.19,
        fee: 2,
        tax: 0,
      });
    });
    test('Should map pdf data of sample correctly: sell_2_with_church_tax', () => {
      const activities = ffb.parsePages(sellSamples[1]).activities;
      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Sell',
        date: '2020-09-23',
        datetime: '2020-09-23T10:00:00.000Z',
        isin: 'LU0360863863',
        wkn: 'DWS0R4',
        company: 'ARERO - Der Weltfonds',
        shares: 21.252,
        price: 206.00978731413514,
        amount: 4378.12,
        fee: 2,
        tax: 33.53,
      });
    });
  });
  describe('Validate multiple transactions', () => {
    test('Should map pdf data of sample correctly: multiple_1', () => {
      const activities = ffb.parsePages(multipleTransactions[0]).activities;

      expect(activities.length).toEqual(3);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Sell',
        date: '2021-07-16',
        datetime: '2021-07-16T10:00:00.000Z',
        isin: 'LU0815263628',
        wkn: 'A1J2X6',
        company: 'MSIF-Em.Leaders Eq.Fd.USD A',
        shares: 22.413,
        price: 47.76022843885245,
        amount: 1070.45,
        fee: 2,
        tax: 0.85,
        foreignCurrency: 'USD',
        fxRate: 1.177757,
      });

      expect(activities[1]).toEqual({
        broker: 'ffb',
        type: 'Sell',
        date: '2021-07-16',
        datetime: '2021-07-16T10:00:00.000Z',
        isin: 'LU0570870567',
        wkn: 'A1JJHG',
        company: 'Threadn.Lux SI.Gbl.Sml.Comp.',
        shares: 21.627,
        price: 49.1912886669441,
        amount: 1063.86,
        fee: 2,
        tax: 2.19,
      });

      expect(activities[2]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-07-16',
        datetime: '2021-07-16T10:00:00.000Z',
        isin: 'LU0957820193',
        wkn: 'A2JMBG',
        company: 'Threadn Lu Gl Smal Comp ZE EU',
        shares: 113.644,
        price: 17.58121854211397,
        amount: 1998,
        fee: 2,
        tax: 0,
      });
    });

    test('Should map pdf data of sample correctly: multiple_2', () => {
      const activities = ffb.parsePages(multipleTransactions[1]).activities;

      expect(activities.length).toEqual(4);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-08-16',
        datetime: '2021-08-16T10:00:00.000Z',
        isin: 'IE00B3M0BZ05',
        wkn: 'A1JJAB',
        company: 'Global Core Equity Fu.EUR Dis',
        shares: 13.947,
        price: 28.680002868000287,
        amount: 400.0,
        fee: 0,
        tax: 0,
      });

      expect(activities[1]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-08-16',
        datetime: '2021-08-16T10:00:00.000Z',
        isin: 'IE00B8N2Z924',
        wkn: 'A2AF3J',
        company: 'Gbl.Sust.Core Eqt.Fd.EUR DIS',
        shares: 15.892,
        price: 25.169896803423107,
        amount: 400.0,
        fee: 0,
        tax: 0,
      });

      expect(activities[2]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-08-16',
        datetime: '2021-08-16T10:00:00.000Z',
        isin: 'IE00B3VVMM84',
        wkn: 'A1JX51',
        company: 'Vanguard FTSE Emer.Mkts.UETF',
        shares: 1.703,
        price: 58.71990604815032,
        amount: 100.0,
        fee: 0,
        tax: 0,
        foreignCurrency: 'USD',
        fxRate: 1.170811,
      });
      expect(activities[3]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2021-08-16',
        datetime: '2021-08-16T10:00:00.000Z',
        isin: 'IE00BKX55T58',
        wkn: 'A12CX1',
        company: 'Vanguard FTSE Devel.Wld.UETF',
        shares: 6.445,
        price: 77.57951900698215,
        amount: 500.0,
        fee: 0,
        tax: 0,
        foreignCurrency: 'USD',
        fxRate: 1.170811,
      });
    });

    test('Should map pdf data of sample correctly: splittkauf_1', () => {
      const activities = ffb.parsePages(multipleTransactions[2]).activities;
      expect(activities.length).toEqual(4);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2020-05-04',
        datetime: '2020-05-04T10:00:00.000Z',
        isin: 'LU0079474960',
        wkn: '986838',
        company: 'AB SICAV I Amer.Grwt.PF.A',
        shares: 0.46,
        price: 108.69565217391305,
        amount: 50.0,
        fee: 0,
        tax: 0,
        foreignCurrency: 'USD',
        fxRate: 1.083441,
      });
      expect(activities[1]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2020-05-04',
        datetime: '2020-05-04T10:00:00.000Z',
        isin: 'LU0689472784',
        wkn: 'A1JLXZ',
        company: 'AGIF-Allianz Inc a. Gwth ATUSD',
        shares: 3.041,
        price: 16.44195988161789,
        amount: 50.0,
        fee: 0,
        tax: 0,
        foreignCurrency: 'USD',
        fxRate: 1.072795,
      });
      expect(activities[2]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2020-05-04',
        datetime: '2020-05-04T10:00:00.000Z',
        isin: 'LU0122379950',
        wkn: '630928',
        company: 'BGF-World Healthsc.Fund A2 USD',
        shares: 1.025,
        price: 48.78048780487804878,
        amount: 50.0,
        fee: 0,
        tax: 0,
        foreignCurrency: 'USD',
        fxRate: 1.083441,
      });
      expect(activities[3]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2020-05-04',
        datetime: '2020-05-04T10:00:00.000Z',
        isin: 'LU0345361124',
        wkn: 'A0NFGE',
        company: 'FF Asia Pac.Opp.Fd.AACCEUR',
        shares: 2.19,
        price: 22.83105022831050228,
        amount: 50.0,
        fee: 0,
        tax: 0,
      });
    });
  });

  describe('Validate entgeltbelastung', () => {
    test('Should map pdf data of sample correctly: entgeltbelastung_1', () => {
      const activities = ffb.parsePages(entgeltbelastung[0]).activities;
      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Sell',
        date: '2020-07-13',
        datetime: '2020-07-13T10:00:00.000Z',
        isin: 'AT0000722673',
        wkn: '632988',
        company: 'KEPLER Europa Rentenfonds (T)',
        shares: 0.004,
        price: 142.5,
        amount: 0.57,
        fee: 0.57,
        tax: 0,
      });
    });
  });
  describe('Validate reinvest from dividends', () => {
    test('Should map pdf data of sample correctly: wiederanlage_1', () => {
      const activities = ffb.parsePages(wiederanlage[0]).activities;
      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Buy',
        date: '2019-12-27',
        datetime: '2019-12-27T11:00:00.000Z',
        isin: 'AT0000722640',
        wkn: '632986',
        company: 'KEPLER Vorsorge Mixfonds (T)',
        shares: 0.035,
        price: 150.57142857142858,
        amount: 5.27,
        fee: 0,
        tax: 0,
      });
    });
  });
  describe('Validate dividends', () => {
    test('Should map pdf data of sample correctly: ausschuettung_1', () => {
      const activities = ffb.parsePages(ausschuettung[0]).activities;
      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Dividend',
        date: '2020-11-24',
        datetime: '2020-11-24T11:00:00.000Z',
        isin: 'DE0009848119',
        wkn: '984811',
        company: 'DWS Top Dividende',
        shares: 114.085,
        price: 3.649997808651444,
        amount: 416.41,
        fee: 0,
        tax: 0,
      });
    });
    test('Should map pdf data of sample correctly: ausschuettung_2_with_tax', () => {
      const activities = ffb.parsePages(ausschuettung[1]).activities;
      expect(activities.length).toEqual(1);
      expect(activities[0]).toEqual({
        broker: 'ffb',
        type: 'Dividend',
        date: '2022-02-08',
        datetime: '2022-02-08T11:00:00.000Z',
        isin: 'LU1136260384',
        wkn: 'A12EXH',
        company: 'green benefit FCP-Gl.Imp.Fd. P',
        shares: 1.915,
        price: 5.671018276762402,
        amount: 10.86,
        fee: 0,
        tax: 2,
      });
    });
  });

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });
});
