import {Component, Input, OnInit} from '@angular/core';
import {ZoneModel} from "../../../../core/models/zone.model";
import {ZoneStatusEnum, ZoneStatuses} from "../../../../core/enums/zoneStatus.enum";

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  @Input() zoneItems: ZoneModel;

  constructor() {
  }

  ngOnInit(): void {
  }

  public parseStatus(status: ZoneStatusEnum, joinedWith: boolean, nextStatus: ZoneStatusEnum): string {
    switch (!!status) {
      case status === ZoneStatuses.open && nextStatus !== ZoneStatusEnum.closed && !joinedWith:
        return '-open';
      case status === ZoneStatuses.closed && !joinedWith:
        return '-closed';
      case status === ZoneStatuses.open && nextStatus === ZoneStatusEnum.closed && !joinedWith:
        return '-closed__before-open';
    }
  }

}
