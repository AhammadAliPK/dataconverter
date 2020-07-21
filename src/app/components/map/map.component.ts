import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import KML from 'ol/format/KML';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { ApiService } from '../../services/api.service';
import { MapService } from '../../services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: Map;
  styles: any;
  featureCount = 0;
  constructor(private apiService: ApiService, private mapService: MapService) {



  }

  ngOnInit() {


    this.mapService.initializeMap();
    this.mapService.addLayer();
    this.mapService.onMapClick.subscribe((event) => {
      let feat = event.features;
      this.mapService.setSelectedFeatureCount(1);
      this.mapService.onFeaturSelected.next({ count: 1, feature: feat });

    })

  }




}
