import ICity from "../interfaces/ICity";

interface IDatum extends ICity {}

export const filterBySearch = (data: IDatum[], searchTerm: string): IDatum[] => {
    const results = data.filter((datum) => {
        if (searchTerm === " ") return data;
        return datum.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      return results
}