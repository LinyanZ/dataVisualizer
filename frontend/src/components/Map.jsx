import { useRef, useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import Loading from "./Loading";
import SuburbDetail from "./SuburbDetail";

import { featureColor, addPropertiesToFeatures } from "../utils";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Map() {
  const ref = useRef(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suburb, setSuburb] = useState(null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: { lat: -37.79769851966677, lng: 144.9607993840227 }, // coord of UoM
          zoom: 10,
          mapId: "6eeb7ed105936693",
        })
      );
    }
  }, [ref, map]);

  const loadGeoJson = (geoJson, category) => {
    map.data.addGeoJson(geoJson);
    map.data.setStyle((f) => {
      return {
        strokeWeight: 0.1,
        fillColor: featureColor(f, category),
      };
    });

    map.data.addListener("mouseover", (e) =>
      map.data.overrideStyle(e.feature, { strokeWeight: 0.3 })
    );
    map.data.addListener("mouseout", (e) => map.data.revertStyle());
    map.data.addListener("click", (e) =>
      setSuburb(e.feature.getProperty("metaData"))
    );
  };

  const addDataToMap = async (category, saLevel) => {
    map.data.forEach((feature) => map.data.remove(feature));
    setLoading(true);
    setSuburb(null);

    const data = await fetch(
      apiUrl +
        "/api/data?" +
        new URLSearchParams({
          saLevel,
          category,
        })
    ).then((res) => res.json());

    const geoJson = addPropertiesToFeatures(data, saLevel);
    loadGeoJson(geoJson, category);

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <DropdownMenu onDisplay={addDataToMap} />
      <div ref={ref} id="map" className="map" />
      {suburb && (
        <SuburbDetail suburb={suburb} onClick={() => setSuburb(null)} />
      )}
    </>
  );
}
