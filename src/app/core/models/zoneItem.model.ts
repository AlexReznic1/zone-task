import {ZoneStatusEnum} from "../enums/zoneStatus.enum";

export interface ZoneItemModel {
  id: number;
  areaId: number;
  joinedWith: number;
  sku: string;
  defaultSku: string;
  status: ZoneStatusEnum;
  countActive: number;
}
