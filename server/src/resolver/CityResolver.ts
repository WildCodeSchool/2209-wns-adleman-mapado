import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import City, { CityInput, CityRequested } from "../entity/City";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
import { env } from "../environment";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async cities(): Promise<City[]> {
    return await datasource.getRepository(City).find();
  }

  @Query(() => City)
  async city(@Arg("name", () => String) name: string): Promise<City> {
    const city = await datasource
      .getRepository(City)
      .findOne({ where: { name } });

    if (city === null) throw new ApolloError("city not found", "NOT_FOUND");

    return city;
  }

  @Mutation(() => City)
  async createCity(@Arg("data") data: CityInput): Promise<City> {
    return await datasource.getRepository(City).save(data);
  }
  @Mutation(() => Boolean)
  async deleteCity(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(City).delete(id);
    if (affected === 0) throw new ApolloError("City not found", "NOT_FOUND");
    return true;
  }

  @Mutation(() => City)
  async updateCity(
    @Arg("id", () => Int) id: number,
    @Arg("data") { name, photo, longitude, latitude }: CityInput
  ): Promise<City> {
    const { affected } = await datasource
      .getRepository(City)
      .update(id, { name, photo, longitude, latitude });

    if (affected === 0) throw new ApolloError("City not found", "NOT_FOUND");

    return { id, name };
  }

  // On récupère le string du front
  // On fetch l'objet ville de l'API ninja code en fonction du string du front
  // On fetch ensuite l'url de la photo sur l'API unsplash
  // On stocke nom, lat, long et photo dans un objet
  // On enregistre l'objet dans notre bdd

  @Mutation(() => String)
  async fetchCityName(@Arg("data") data: CityRequested): Promise<string> {
    const { cityName } = data;

    let optionsCityAPI = {
      method: "GET",
      headers: { "x-api-key": env.REACT_APP_CITIES_API_KEY },
    };

    let urlCityAPI = "https://api.api-ninjas.com/v1/geocoding?city=" + cityName;

    const fetchCity = await fetch(urlCityAPI, optionsCityAPI)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        //console.log(data);
        return data[0];
      })
      .catch((err) => {
        console.log(`error while fetching city coordinates ${err}`);
      });

    let optionsCityPhoto = {
      method: "GET",
      headers: { "x-api-key": env.REACT_APP_PHOTOS_API_KEY },
    };

    let urlPhotoAPI =
      "https://api.unsplash.com/search/photos?query=" +
      cityName +
      " architecture monument" +
      "&client_id=" +
      optionsCityPhoto.headers["x-api-key"];

    const fetchPhoto = await fetch(urlPhotoAPI, optionsCityPhoto)
      .then((res) => res.json())
      .then((data) => {
        let urlOfCityPhoto = data["results"][0].urls["regular"];
        console.log(urlOfCityPhoto);
        return urlOfCityPhoto;
      })
      .catch((err) => {
        console.log(`error while fetching city photo ${err}`);
      });

    const cityData = {
      name: fetchCity.name,
      latitude: fetchCity.latitude,
      longitude: fetchCity.longitude,
      photo: fetchPhoto,
    };
    //console.log(fetchCity);

    await datasource.getRepository(City).save(cityData);

    return cityName;
  }
}
