export class MarkerCompass {
  constructor(map, markers, options) {
    this.options = {
      // defaults
      offset: 10,
      width: 20,
      height: 20,
      backgroundColor: "#3FB1CE",
      arrowSize: 4,
      arrowOffset: 14,
      flyToZoom: 12,
      ...options,
    };
    this.container = null;
    this.markers = markers;
    this.compasses = [];
    this.map = map;
    this.init();
  }

  init() {
    if (!this.map) {
      console.warn("No map container provided.");
      return;
    }
    if (!this.markers || !this.markers.length) {
      console.warn("No markers found.");
      return;
    }

    this.map.on("load", this.createCompasses.bind(this));
    this.map.on("move", this.updateCompasses.bind(this));
  }
  destroy() {
    this.map.off("move", this.updateCompasses.bind(this));
    this.compasses.forEach((compass) => compass.remove());
  }
  createCompasses() {
    const container = this.map.getContainer();
    container.style.setProperty(
      "--marker-compass-arrow-size",
      this.options.arrowSize + "px"
    );
    container.style.setProperty(
      "--marker-compass-arrow-offset",
      this.options.arrowOffset + "px"
    );
    container.style.setProperty(
      "--marker-compass-background-color",
      this.options.backgroundColor
    );

    if (!container) {
      console.warn("No map container found.");
      return;
    }
    this.markers.forEach((marker, index) => {
      const compass = document.createElement("div");
      compass.classList.add("mapboxgl-compass");
      compass.dataset.compass = "true";
      compass.style.width = this.options.width + "px";
      compass.style.height = this.options.height + "px";
      compass.style.position = "absolute";
      compass.style.opacity = 0;
      compass.style.zIndex = 2;
      const arrow = document.createElement("div");
      arrow.classList.add("mapboxgl-compass__arrow");
      compass.appendChild(arrow);
      container.appendChild(compass);
      compass.addEventListener("click", () => {
        if (!this.markers?.[index]?._lngLat) {
          return;
        }
        this.map.flyTo({
          center: this.markers[index]._lngLat,
          zoom: this.options.flyToZoom,
        });
      });
      this.compasses.push(compass);
    });
    this.updateCompasses();
  }
  updateCompasses() {
    const bounds = this.map.getBounds();
    if (!this.markers.length) {
      return;
    }
    this.markers.forEach((marker, index) => {
      const lngLat = marker.getLngLat();
      const compass = this.compasses[index];
      if (!compass) {
        return;
      }
      const compassWidth = compass.clientWidth;
      const compassHeight = compass.clientHeight;
      const offset = this.options.offset;
      const container = this.map.getContainer();
      const maxWidth = container.clientWidth - offset;
      const maxHeight = container.clientHeight - offset;
      const x = this.map.project(lngLat).x;
      const y = this.map.project(lngLat).y;
      let translate = {
        x: offset,
        y: offset,
      };
      if (y > compassHeight) {
        translate.y = y - compassHeight / 2;
      }
      if (y >= maxHeight - compassHeight / 2) {
        translate.y = maxHeight - compassHeight;
      }
      if (x > compassWidth) {
        translate.x = x - compassWidth / 2;
      }
      if (x >= maxWidth - compassWidth / 2) {
        translate.x = maxWidth - compassWidth;
      }
      compass.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
      if (!bounds.contains(lngLat)) {
        const angleDeg =
          (Math.atan2(translate.y - y, translate.x - x) * 180) / Math.PI;
        compass.style.setProperty("--marker-compass-angle", `${angleDeg}deg`);
        compass.style.opacity = 1;
        compass.style.pointerEvents = "all";
      } else {
        compass.style.pointerEvents = "none";
        compass.style.opacity = 0;
      }
    });
  }
}
