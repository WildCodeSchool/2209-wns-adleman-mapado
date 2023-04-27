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
            email: "gg@test.com",
            id: 7,
            hashedPassword: "$argon2id$v=19$m=65536,t=5,p=4$to+4ziOVZQe7ypnIs36mjg$3F6fWRb6FWRbd/U0XAEaleJnF+N86Dx1lp7Kk8sNEWk"
        },
        {
            email: "leila@test.com",
            id: 8,
            hashedPassword: "$argon2id$v=19$m=65536,t=5,p=4$QjDIabFnM6IG+VHQvFWlAA$vBQMp015pFAoiFm+UQXPh59dp1GSs4ZwjgfnWjT6ERw"
        },
        {
            email: "mymy@test.com",
            id: 9,
            hashedPassword: "$argon2id$v=19$m=65536,t=5,p=4$LaxMx6z8fF13b+F7kFDnPA$fNDp0reGwhY8dOe0xmoLHlII5qzURpE+Ynsg266hBx4"
        }
])

    await db.destroy();
    console.log("done !");
}

seed().catch(console.error);