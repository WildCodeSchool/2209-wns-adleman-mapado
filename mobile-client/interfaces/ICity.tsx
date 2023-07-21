import IPoi from "./IPoi";

export default interface ICity {
  id: number;
  name: string;
  latitude?: number | undefined | null;
  longitude?: number | null | undefined;
  photo?: string | null | undefined;
  // users?: User[];
  pois?: IPoi[];
}
