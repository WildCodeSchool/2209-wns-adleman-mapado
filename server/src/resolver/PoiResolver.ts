import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Poi, { PoiInput, UpdatePoiInput, findPOI } from "../entity/Poi";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
import { env } from "../env";

@Resolver(Poi)
export class PoiResolver {
  @Query(() => [Poi])
  async Pois(): Promise<Poi[]> {
    return await datasource
      .getRepository(Poi)
      .find({ relations: { city: true, category: true } });
  }

  @Mutation(() => Poi)
  async createPoi(@Arg("data") data: PoiInput): Promise<Poi> {
    return await datasource.getRepository(Poi).save(data);
  }

  @Mutation(() => Boolean)
  async deletePoi(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(Poi).delete(id);
    if (affected === 0) throw new ApolloError("Poi not found", "NOT_FOUND");
    return true;
  }

  @Mutation(() => String)
  async updatePoi(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: UpdatePoiInput
  ): Promise<string> {
    const { affected } = await datasource.getRepository(Poi).update(id, data);

    if (affected === 0) throw new ApolloError("Poi not found", "NOT_FOUND");

    return "Poi updated";
  }

  // On récupère le string du front
  // On fetch l'objet POI de l'API OpenCage en fonction du string du front
  // On stocke nom, lat, long et l'adresse dans un objet
  // On enregistre l'objet dans notre bdd

  @Mutation(() => String)
  async fetchPoiCoordinates(@Arg("data") data: findPOI): Promise<string> {
    const { poiNameOrAdress, cityName, cityId } = data;

    let optionsPoiAPI = {
      method: "GET",
    };

    let urlPoiAPI =
      "https://api.opencagedata.com/geocode/v1/json?q=" +
      poiNameOrAdress +
      " " +
      cityName +
      "&key=" +
      env.REACT_APP_POI_API_KEY +
      "&language=fr&pretty=1&countrycode=fr";

    const fetchPoi = await fetch(urlPoiAPI, optionsPoiAPI)
      .then((res) => res.json())
      .then((data) => {
        return data.results.shift();
      })
      .catch((err) => {
        console.log(`error while fetching Poi object ${err}`);
      });

    const poiData = {
      name: fetchPoi.formatted.split(", ").shift(),
      latitude: fetchPoi.geometry.lat,
      longitude: fetchPoi.geometry.lng,
      address: fetchPoi.formatted.split(",").slice(1, 3).join(","),
      // refacto possible de la façon dont on récupère l'adresse
      // address: getPoiAddress(street, postalcode, city),
      cityId: cityId,
    };
    console.log("Log de l'adresse complete du poi", fetchPoi.formatted);

    if (poiData.name !== cityName) {
      await datasource.getRepository(Poi).save(poiData);
    } else {
      console.error("Ce POI n'existe pas, tenter une autre addresse !");
    }
    return poiNameOrAdress;
  }
}
