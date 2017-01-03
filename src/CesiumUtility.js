'use strict';

var Cesium = require('cesium/Source/Cesium');

const fromDegrees = Cesium.Cartesian3.fromDegrees;
const toRadians = Cesium.Math.toRadians;
const fromDegreesArray = Cesium.Cartesian3.fromDegreesArray;
const fromCssColorString = (rgb,a) => {
    if (rgb.length !== 7 || rgb[0] != '#')
        throw new Error('fromCssColorString: invalid css-color string ' + rgb);
    let r = parseInt(rgb.substr(1,2), 16);
    let g = parseInt(rgb.substr(3,2), 16);
    let b = parseInt(rgb.substr(5,2), 16);
    return Cesium.Color.fromBytes(r,g,b,a);
}

const distance = (p, q) =>  Cesium.Cartesian3.distance(fromDegrees(p[0], p[1]),fromDegrees(q[0], q[1]));
const loadJson = url => Cesium.loadJson(url);

const CesiumUtility = {

    createMatrix: p => Cesium.Transforms.eastNorthUpToFixedFrame(fromDegrees(p[0], p[1], 0.0)),

    flyTo: (camera, { longitude: longitude, latitude: latitude, height: height }, { heading: heading, pitch: pitch, roll: roll }) => {
        camera.flyTo({
            destination: fromDegrees(longitude, latitude, height),
            orientation: {
                heading: toRadians(heading),
                pitch: toRadians(pitch),
                roll: roll
            }
        });
    },

    distance: distance,
    loadJson: loadJson,
    fromDegreesArray: fromDegreesArray,
    fromDegrees: fromDegrees,
    toRadians: toRadians,
    fromCssColorString: fromCssColorString

}

export default CesiumUtility;
