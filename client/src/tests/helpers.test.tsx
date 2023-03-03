import { filterBySearch } from "../utils/helpers";

test("filters data by searchTerm", () => {
    const data = [{
        __typename: 'City',
        id: 1,
        name: "Bordeaux",
        longitude: 44.8473900254569,
        latitude: -0.7188799313856008,
    
      },
      {
        __typename: 'City',
        id: 2,
        name: "Lille",
        longitude: 50.62976866778606,
        latitude: 3.04621070309212,
       
      },
      {
        __typename: 'City',
        id: 3,
        name: "Brest",
        longitude: 50.62976866778606,
        latitude: 3.04621070309212,
      }];
      const searchTerm = "Brest";
    expect(filterBySearch(data, searchTerm)).toEqual([{
        __typename: 'City',
        id: 3,
        name: "Brest",
        longitude: 50.62976866778606,
        latitude: 3.04621070309212,
      }]);
})