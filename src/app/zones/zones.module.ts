import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ZoneService} from "./shared/services/zone.service";
import {HttpClientModule} from "@angular/common/http";
import {ZonesComponent} from "./zones.component";
import {ZoneRoutingModule} from "./zones-routing.module";
import { ZoneComponent } from './shared/components/zone/zone.component';


@NgModule({
  declarations: [ZonesComponent, ZoneComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ZoneRoutingModule
  ],
  providers: [ZoneService]
})
export class ZonesModule {
}
