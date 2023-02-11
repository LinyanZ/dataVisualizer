import SA2 from "./resources/SA2_2016_MELB.json";
import SA3 from "./resources/SA3_2016_MELB.json";
import SA4 from "./resources/SA4_2016_MELB.json";

const CAT1COLORMIN = [255, 255, 255, 0];
const CAT1COLORMAX = [108, 88, 225, 255];
const CAT2COLORMIN = [255, 255, 255, 0];
const CAT2COLORMAX = [225, 108, 88, 255];

const featureColor = (f, category = "1") => {
  const colorMin = category === "1" ? CAT1COLORMIN : CAT2COLORMIN;
  const colorMax = category === "1" ? CAT1COLORMAX : CAT2COLORMAX;
  const fraction = f.getProperty("metaData").normalizedScore || 0;
  const R = Math.floor((colorMax[0] - colorMin[0]) * fraction) + colorMin[0];
  const G = Math.floor((colorMax[1] - colorMin[1]) * fraction) + colorMin[1];
  const B = Math.floor((colorMax[2] - colorMin[2]) * fraction) + colorMin[2];
  const A = Math.floor((colorMax[3] - colorMin[3]) * fraction) + colorMin[3];
  return `rgba(${R}, ${G}, ${B}, ${A})`;
};

const normalize = (dict) => {
  let max = 0;

  Object.values(dict).forEach((value) => {
    max = Math.max(value.count, max);
  });

  Object.values(dict).forEach((value) => {
    value.normalizedScore = max === 0 ? 0 : value.count / max;
  });
};

const getSALevelProperties = (saLevel) => {
  let geoJson;
  let propertyName;

  switch (saLevel) {
    case "2": {
      geoJson = JSON.parse(JSON.stringify(SA2));
      propertyName = "SA2_MAIN16";
      break;
    }
    case "3": {
      geoJson = JSON.parse(JSON.stringify(SA3));
      propertyName = "SA3_CODE16";
      break;
    }
    case "4": {
      geoJson = JSON.parse(JSON.stringify(SA4));
      propertyName = "SA4_CODE16";
      break;
    }
  }

  return { geoJson, propertyName };
};

const addPropertiesToFeatures = (data, saLevel) => {
  const { geoJson, propertyName } = getSALevelProperties(saLevel);

  const dict = {};
  data.forEach((doc) => {
    dict[doc["_id"]] = doc;
  });

  normalize(dict);

  for (let i = 0; i < geoJson.features.length; i++) {
    const feature = geoJson.features[i];
    const saCode = feature.properties[propertyName];

    if (dict[saCode]) feature.properties.metaData = { ...dict[saCode] };
    else
      feature.properties.metaData = {
        count: 0,
        avg: 0,
        normalizedScore: 0,
        min: 0,
        max: 0,
        sum: 0,
      };

    feature.properties.metaData.saCode = saCode;
    feature.properties.metaData.name =
      feature.properties[`SA${saLevel}_NAME16`];
  }

  return geoJson;
};

export { featureColor, addPropertiesToFeatures };
