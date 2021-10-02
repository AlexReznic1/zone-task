import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ZoneItemModel} from "../../../core/models/zoneItem.model";

@Injectable()
export class ZoneService {

  constructor(private readonly http: HttpClient) {

  }

  public getZones(): Observable<ZoneItemModel[]> {
    return this.http.get<ZoneItemModel[]>('../../../assets/zones.json');
  }
}
