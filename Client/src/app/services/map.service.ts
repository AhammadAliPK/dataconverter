import { Injectable, EventEmitter } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import KML from 'ol/format/KML';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: Map;
  styles: any;
  private featureCount: number = 0;
  onMapClick: EventEmitter<any> = new EventEmitter<any>();
  onFeaturSelected: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    this.styles = {
      // 'Point': new Style({
      //   image: image
      // }),
      'LineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1
        })
      }),
      'MultiLineString': new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1
        })
      }),
      // 'MultiPoint': new Style({
      //   image: image
      // }),
      'MultiPolygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 1)'
        })
      }),
      'Polygon': new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 1)'
        })
      }),
      'GeometryCollection': new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2
        }),
        fill: new Fill({
          color: 'magenta'
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta'
          })
        })
      }),
      'Circle': new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)'
        })
      })
    };


  }

  getSelectedFeatureCount(): any {
    return this.featureCount;
  }
  setSelectedFeatureCount(count: number): any {
    this.featureCount = count;
  }

  initializeMap() {

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }),
          projection: 'EPSG:3857'
        }),
        // vectorlay
      ],
      view: new View({
        center: [11562343, 144895

        ],
        zoom: 11,
        projection: 'EPSG:3857'
      })
    });

    this.map.on('click', (event) => {

      let self = this;
      this.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
        let json = new GeoJSON({ dataProjection: "EPSG:3857", featureProjection: "EPSG:3857" });
        let feat = json.writeFeature(feature);
        self.onMapClick.next({ map: self.map, features: feat })
      });
    });
  }

  addLayer() {
    var vectorPolygons = new VectorLayer({
      source: new VectorSource({
        url: 'assets/data/lay.geojson',
        format: new GeoJSON(
          {
            // dataProjection: "EPSG:3857",
            // featureProjection: "EPSG:4326"
          }
        ),
        // projection: 'EPSG:3857'
      }),
      style: this.styleFunction.bind(this)

    });
    this.map.addLayer(vectorPolygons);
  }
  getMap() {
    return this.map;
  }

  styleFunction(feature) {
    if (feature && feature.getGeometry())
      return this.styles[feature.getGeometry().getType()];
  };
}
