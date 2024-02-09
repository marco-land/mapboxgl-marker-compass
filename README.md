# Mapbox GL Marker Compass

Plugin for Mapbox GL JS to create small marker compasses at the edge of the screen to indicate markers outside the viewport.

![mapboxgl-marker-compass-preview](https://github.com/marco-land/mapboxgl-marker-compass/assets/24410335/ed9cfcca-1684-41ef-8d9c-451fbb5e7d80)

# Live Demos

[Basic usage](https://mapbox-gl-marker-compass.netlify.app)

[Example project usage](https://boote-bojen-pokale.de/)

# Instructions

1. Add the package

```bash
pnpm add mapboxgl-marker-compass # or npm, yarn
```

2. Import module, create a map and markers

```javascript
import "mapboxgl-marker-compass/dist/mapboxgl-marker-compass.css";
import { MarkerCompass } from "mapboxgl-marker-compass/dist/mapboxgl-marker-compass.mjs";

const map = new mapboxgl.Map({
  container: "map",
  center: [13.404954, 52.520008],
  zoom: 9,
  projection: "equirectangular", // Works best with equirectangular maps
});
const markers = [
  new mapboxgl.Marker().setLngLat([13.404954, 52.520008]).addTo(map),
];
```

3. Pass the map and markers to the `MarkerCompass` constructor

```javascript
new MarkerCompass(map, markers, {
  // Options, see below
});
```

# Options

| Option            | Default   | Description                                              |
| ----------------- | --------- | -------------------------------------------------------- |
| `offset`          | `10`      | Offset of the compass element to the viewport edge in px |
| `width`           | `20`      | Width of the compass element in px                       |
| `height`          | `20`      | Height of the compass element in px                      |
| `backgroundColor` | `#3FB1CE` | Background color of the compass element and arrow        |
| `arrowSize`       | `4`       | Size of the arrow in px                                  |
| `arrowOffset`     | `14`      | Offset of the arrow to the compass element in px         |
| `flyToZoom`       | `12`      | Zoom level when clicking on the compass element in px    |

# ⚠️ Note

Works best with `equirectangular` map projection

# Copyright

© 2024 Marco Land

# License

AGPL-3.0
