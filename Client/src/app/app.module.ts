import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { NewmapComponent } from './components/newmap/newmap.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidepanelComponent,
    NewmapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
