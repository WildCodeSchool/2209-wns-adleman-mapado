import db from "./src/db";
import User, { hashPassword } from "./src/entity/User";
import City from "./src/entity/City";
import Poi from "./src/entity/Poi";

async function seed(): Promise<void> {
    await db.initialize();
    await db.getRepository(City).delete({});
    await db.getRepository(Poi).delete({});
    await db.getRepository(User).delete({});

    // // await db.getRepository(User).delete({});
    // // await db.getRepository(Poi).delete({});
    // //
    // // await db.getRepository(User).insert({
    // //     email: "admin@app.com",
    // //     hashedPassword: await hashPassword("Test@123"),
    // // });
    //
    // await db.getRepository(City).insert([
    //     {
    //         name: "Bordeaux",
    //     },
    //     {
    //         name: "Lille",
    //     },
    //     {
    //         name: "Paris",
    //     },
    //     {
    //         name: "Lyon",
    //     },
    // ]);

    await db.destroy();
    console.log("done !");
}

seed().catch(console.error);