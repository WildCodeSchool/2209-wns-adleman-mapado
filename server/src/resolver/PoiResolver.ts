import {Arg, Int, Mutation, Query, Resolver, Authorized} from "type-graphql";
import datasource from "../db";
import {ApolloError} from "apollo-server-errors";
import {env} from "../env";
import Poi, {PoiInput, UpdatePoiInput, findPOI} from "../entity/Poi";
import { UserRole } from "../entity/User";

@Resolver(Poi)
export class PoiResolver {
  @Query(() => [Poi])
  async Pois(): Promise<Poi[]> {
    return await datasource
      .getRepository(Poi)
      .find({ relations: { city: true, category: true } });
  }

    @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN, UserRole.POICREATOR])
    @Mutation(() => Poi)
    async createPoi(@Arg("data") data: PoiInput): Promise<Poi> {
        return await datasource.getRepository(Poi).save(data);
    }

    @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN]) 
    @Mutation(() => Boolean)
    async deletePoi(@Arg("id", () => Int) id: number): Promise<boolean> {
        const {affected} = await datasource.getRepository(Poi).delete(id);
        if (affected === 0) throw new ApolloError("Poi not found", "NOT_FOUND");
        return true;
    }

    @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN]) 
    @Mutation(() => Poi)
    async updatePoi(
        @Arg("id", () => Int) id: number,
        @Arg("data") {name, address, description}: UpdatePoiInput
    ): Promise<Poi | null> {
        const poiToUpdate = await datasource.getRepository(Poi).findOne({
            where: {id},
            relations: {category: true, city: true},
        });
        const {affected} = await datasource
            .getRepository(Poi)
            .update(id, {name, address, description});

        if (affected === 0) throw new ApolloError("Poi not found", "NOT_FOUND");

    return poiToUpdate;
  }

    // On récupère le string du front
    // On fetch l'objet POI de l'API OpenCage en fonction du string du front
    // On stocke nom, lat, long et l'adresse dans un objet
    // On enregistre l'objet dans notre bdd

  @Mutation(() => String)
  async fetchPoiCoordinates(
    @Arg("data") data: findPOI
  ): Promise<string | ApolloError> {
    const { poiNameOrAdress, cityName, cityId, categoryId, description, rating, photo } = data;

    if (poiNameOrAdress === "") {
      return new ApolloError("Entrez un point d'intêret svp !");
    } else if (poiNameOrAdress.length <= 2) {
      return new ApolloError("Entrez un point d'intérêt correct svp !");
    }

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
      description: description,
      address: fetchPoi.formatted.split(",").slice(1, 3).join(","),
      // refacto possible de la façon dont on récupère l'adresse
      // address: getPoiAddress(street, postalcode, city),
      cityId: cityId,
      categoryId: categoryId,
      rating: rating,
      photo: photo,
    };

    const PoiExists = await datasource
      .getRepository(Poi)
      .findOne({ where: { name: poiData.name } });

    // console.log("Log de l'adresse complete du poi", fetchPoi.formatted);

    if (!PoiExists && poiData.name !== cityName) {
      await datasource.getRepository(Poi).save(poiData);
      return "Le point d'intérêt a bien été ajouté.";
    } else {
      return new ApolloError(
        "Ce point d'intérêt existe déjà ou n'est pas conforme."
      );
    }
  }
}
