import db from "./src/db";
import User from "./src/entity/User";
import City from "./src/entity/City";
import Poi from "./src/entity/Poi";

async function seed(): Promise<void> {
    await db.initialize();
    await db.getRepository(City).delete({});
    await db.getRepository(Poi).delete({});
    await db.getRepository(User).delete({});

    await db.getRepository(City).insert([
        {
            name: "Bordeaux",
            photo: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/481000/481844-Bordeaux.jpg",
            latitude: 44.841225,
            longitude: -0.5800364
        },
        {
            name: "Lille",
            photo: "https://images.france.fr/zeaejvyq9bhj/4lykvx2hoI6YksIo0YOiwe/9958cc7c0b4ca3d4efb16b8e7f49fbac/Grand_Place__OTCL_Lille_-_Laurent_Ghesqui__re.jpg",
            latitude: 50.6365654,
            longitude: 3.0635282
        },
        {
            name: "Paris",
            photo: "https://hospitality-on.com/sites/default/files/2017-09/Paris.jpg",
            latitude: 48.8588897,
            longitude: 2.320041
        },
        {
            name: "Lyon",
            photo: "https://images.france.fr/zeaejvyq9bhj/1OlPSrbfoeFX2TeVBtgRr5/4e49c74cc948b6852b1b53f64d1794fd/Lyon__tichr_-_AdobeStock.jpg?w=1120&h=490&q=70&fl=progressive&fit=fill",
            latitude: 45.7578137,
            longitude: 4.8320114
        },
    ]);

    await db.getRepository(User).insert([
        {
            id: 1,
            email: "grisch@wild.com",
            hashedPassword: "SalutLesCopains33!"
        },
        {
            id: 2,
            email: "mymy@chu.fr",
            hashedPassword: "MechMech33!"
        },
        {
            id: 3,
            email: "leila@croquettes.ca",
            hashedPassword: "ViveLaBouffe33!"
        },
    ])

    await db.destroy();
    console.log("done !");
}

seed().catch(console.error);