/**
 * Manual mock for @rnmapbox/maps.
 * The native module throws at import time in Jest — this stub prevents that.
 */
module.exports = {
  setAccessToken: jest.fn(),
  MapView: 'MapView',
  Camera: 'Camera',
  MarkerView: 'MarkerView',
  PointAnnotation: 'PointAnnotation',
  ShapeSource: 'ShapeSource',
  SymbolLayer: 'SymbolLayer',
  LineLayer: 'LineLayer',
  FillLayer: 'FillLayer',
  UserLocation: 'UserLocation',
};
