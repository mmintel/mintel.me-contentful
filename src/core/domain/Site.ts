import { Asset, Record } from "../definitions";

export interface Site extends Record {
  title: string;
  avatar?: Asset;
}
