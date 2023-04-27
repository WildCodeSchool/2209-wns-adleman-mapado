// import { test, expect } from "@playwright/test";
// import db from "../../server/src/db";
// import User from "../../server/src/entity/User";
// import { clearDB, connect, disconnect } from "./dbHelpers";

// // commande pour lancer les tests
// // docker-compose -f docker-compose.e2e-tests.yml up --remove-orphans --build

// test.beforeAll(connect);
// test.beforeEach(clearDB);
// test.afterAll(disconnect);

// test("can view cities in db", async ({ page }) => {
//     await db
//         .getRepository(City)
//         .insert([{ name: "Niort" }, { name: "Roubaix" }]);

//     await page.goto("/manage-cities");

//     await expect(page.getByTestId("city-list")).toContainText("Niort");
//     await expect(page.getByTestId("city-list")).toContainText("Roubaix");
// });

// /*test("can add a city", async ({ page }) => {
//     await page.goto("/manage-cities");
//     await page.getByTestId("newCity").type("Brest");
//     await page.getByRole("button", { name: "Ajouter" }).click();
//     await expect(page.getByTestId("city-list")).toContainText("Brest");
// });*/