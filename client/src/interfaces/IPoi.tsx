export default interface IPoi {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  address?: string | null | undefined;
  category?: string | null | undefined;
  description?: string | null | undefined;
  rating?: number | null | undefined;
  photo?: string | null | undefined;
}
