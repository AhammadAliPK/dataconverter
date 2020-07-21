import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {
  featureCount: number = 0;
  selectedFeature: any;
  command = "No feature selected , please select a feature from map by single click";
  constructor(private mapService: MapService, private apiService: ApiService) {
    this.mapService.onFeaturSelected.subscribe((event: any) => {
      this.featureCount = event.count;
      this.selectedFeature = event.feature;
      this.command = "Click Export button to export as shapefile";
    });
  }

  ngOnInit() {

  }
  setCommand() {

  }
  onExportClick() {
    this.apiService.postData(this.selectedFeature).subscribe((result: any) => {
      if (result.Success) {
        this.downloadFile();
      }
    },
      error => console.log(error)
    );
  }


  downloadFile() {


    this.apiService.downloadFile().subscribe((res: any) => {

      const blob = new Blob([res], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
