// import { EnvType, load } from 'ts-dotenv';
//
// export type Env = EnvType<typeof schema>;
//
// export const schema = {
//     NODE_ENV: ['production' as const, 'development' as const],
//     SERVER_PORT: Number,
//     SERVER_HOST: String,
//     POSTGRES_PASSWORD: String,
//     POSTGRES_USER: String,
//     POSTGRES_DB: String,
//     DB_HOST: { type: String, optional: true },
// };
//
// export let env: Env;
//
// export function loadEnv(): void {
//     env = load(schema);
// }
// import { IController } from './../types/IController';
// import datasource from '../db'
// import Category from '../entity/Category'
// import Poi from '../entity/Poi'
// import User from '../entity/User'
// import City from '../entity/City'
//
//
// const categoryController: IController = {
//     create: async (req, res) => {
//         const { name } = req.body
//         if (name.length > 100 || name.length === 0) {
//             return res
//                 .status(400)
//                 .send('Name must be between 1 and 100 characters')
//         }
//         try {
//             const created = await datasource.getRepository(Category).save({ name });
//             res.status(201).send(created);
//         } catch (err) {
//             res.status(err).send('error while creating category');
//         }
//     },
// }
//
// export default categoryController;