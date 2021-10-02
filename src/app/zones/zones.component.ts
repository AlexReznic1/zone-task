import {Component, OnDestroy, OnInit} from '@angular/core';
import {ZoneService} from "./shared/services/zone.service";
import {ZoneModel} from "../core/models/zone.model";
import {UnsubscriptionHelper} from "../core/helpers/unsubscription.helper";
import {Subscription} from "rxjs/internal/Subscription";
import {map} from "rxjs/operators";
import {ZoneItemModel} from "../core/models/zoneItem.model";

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit, OnDestroy {
  public zones: ZoneModel[];
  private zones$: Subscription;

  constructor(private readonly zoneService: ZoneService) {
  }

  ngOnInit(): void {
    this.getFilteredZones();
  }

  private getFilteredZones(): void {
    this.zones$ = this.zoneService.getZones().pipe(
      map(zoneItems => Object.keys(this.groupByZone(zoneItems)).map(key => ({[key]: this.groupByLinks(this.groupByZone(zoneItems)[key])})))
    ).subscribe(zones => {
      this.zones = zones;
    });
  }

  ngOnDestroy(): void {
    UnsubscriptionHelper.unsubscribeAll(this.zones$);
  }

  private groupByLinks(zoneItems: ZoneItemModel[]): ZoneItemModel[] {
    const arrWithJoinWith: ZoneItemModel[] = zoneItems.filter(i => i.joinedWith);
    const arrWithOutJoinWith: ZoneItemModel[] = zoneItems.filter(i => !i.joinedWith);

    let linkedZoneItems: ZoneItemModel[] = [];
    let unlinkedZoneItems: ZoneItemModel[] = [];
    arrWithOutJoinWith.forEach(item => {
      const itemsWithLinks = arrWithJoinWith.filter(i => item.id === i.joinedWith);
      itemsWithLinks.length > 0 ? (linkedZoneItems.push(item), linkedZoneItems = linkedZoneItems.concat(itemsWithLinks)) : unlinkedZoneItems.push(item)
    })
    return linkedZoneItems.concat(unlinkedZoneItems);
  }

  private groupByZone(zoneItems: ZoneItemModel[]): ZoneModel {
    const key: string = 'areaId';
    return zoneItems.reduce((accumulator, currentValue) => {
      (accumulator[currentValue[key]] = accumulator[currentValue[key]] || []).push(currentValue);
      return accumulator;
    }, {});
  }

}
