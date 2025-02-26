import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export default function Map() {
  return (
    <div className="map-container">
      <ComposableMap
        viewBox="0 68 800 415"
      >
        <Geographies geography={"/map.json"}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}