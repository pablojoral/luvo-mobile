/**
 * Manual mock for react-native-localize.
 * Prevents the native RNLocalize TurboModule lookup in Jest.
 */
module.exports = {
  getLocales: jest.fn(() => [
    { languageCode: 'es', countryCode: 'ES', languageTag: 'es-ES', isRTL: false },
  ]),
  getNumberFormatSettings: jest.fn(() => ({
    decimalSeparator: ',',
    groupingSeparator: '.',
  })),
  getCurrencies: jest.fn(() => ['EUR']),
  getCountry: jest.fn(() => 'ES'),
  getCalendar: jest.fn(() => 'gregorian'),
  getTemperatureUnit: jest.fn(() => 'celsius'),
  getTimeZone: jest.fn(() => 'Europe/Madrid'),
  uses24HourClock: jest.fn(() => true),
  usesMetricSystem: jest.fn(() => true),
  usesAutoDateAndTime: jest.fn(() => true),
  usesAutoTimeZone: jest.fn(() => true),
  findBestLanguageTag: jest.fn(() => ({ languageTag: 'es', isRTL: false })),
};
