import {Arg, Int, Mutation, Query, Resolver} from "type-graphql";
import City, {
    CityInput,
    CityRequested,
    UpdateCityInput,
} from "../entity/City";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
import { env } from "../environment";
import Poi from "../entity/Poi";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async cities(): Promise<City[]> {
    //Pour récupérer les utilisateurs et les poi des villes on ajoute les relations
    return await datasource
      .getRepository(City)
      .find({ relations: { users: true, poi: true } });
  }

  @Query(() => City)
  async city(@Arg("name", () => String) name: string): Promise<City> {
    const city = await datasource
      .getRepository(City)
      .findOne({ where: { name }, relations: { users: true, poi: true } });

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
    @Arg("data") data: UpdateCityInput
  ): Promise<City | null> {
    const cityToUpdate = await datasource.getRepository(City).findOne({
      where: { id },
    });
    const { affected } = await datasource.getRepository(City).update(id, data);

    if (affected === 0) throw new ApolloError("City not found", "NOT_FOUND");

    return cityToUpdate;
  }

  // On récupère le string du front
  // On fetch l'objet ville de l'API ninja code en fonction du string du front
  // On fetch ensuite l'url de la photo sur l'API unsplash
  // On stocke nom, lat, long et photo dans un objet
  // On enregistre l'objet dans notre bdd

  @Mutation(() => String)
  async fetchCityName(
    @Arg("data") data: CityRequested
  ): Promise<string | ApolloError> {
    const { cityName } = data;

    if (cityName === "") {
      return new ApolloError("Entrez un nom de ville svp ! 🙏");
    } else if (cityName.length <= 2) {
      return new ApolloError("Entrez un nom de ville correct svp ! 🙏");
    }

    let optionsCityAPI = {
      method: "GET",
      headers: { "x-api-key": env.REACT_APP_CITIES_API_KEY },
    };

    let urlCityAPI =
      "https://api.api-ninjas.com/v1/geocoding?country=FR&city=" + cityName;

    const fetchCity = await fetch(urlCityAPI, optionsCityAPI)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        if (data.length === 0) {
          console.log(data);
          return new ApolloError("Nous n'avons pas trouvé la ville, désolé...");
        } else return data.shift();
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
      " downtown street france" +
      "&client_id=" +
      optionsCityPhoto.headers["x-api-key"];

    const fetchPhoto = await fetch(urlPhotoAPI, optionsCityPhoto)
      .then((res) => res.json())
      .then((data) => {
        let urlOfCityPhoto = data["results"][0].urls["regular"];
        // Récupérer le nom du photographe pour passer à la version VIP de l'API Unsplash
        // let photographer = data["results"][0].user["name"];

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
    const cityExists = await datasource
      .getRepository(City)
      .findOne({ where: { name: cityData.name } });
    console.log(cityExists);

    // vérifier correspondance entre cityName et cityData.name

    if (cityName !== cityData.name) {
      return new ApolloError(
        "Cette ville n'existe pas ou nous ne l'avons pas trouvée. Essayez autre chose."
      );
    } else if (!cityExists) {
      await datasource.getRepository(City).save(cityData);
      return cityData.name + " a bien été ajoutée. ";
    } else {
      return new ApolloError(
        "Il semblerait que " +
          cityData.name +
          " existe déjà, essayez d'ajouter une autre ville !"
      );
    }
  }

}
