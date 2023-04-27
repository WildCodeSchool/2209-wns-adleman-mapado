import { render } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import client from "../gql/client";
import { MemoryRouter } from "react-router-dom";
import Home from "../screens/Home";
import "@testing-library/jest-dom/extend-expect";
import ICity from '../interfaces/ICity';

test("renders Home page with cities displayed", () => {
  render(
    <ApolloProvider client={client}>
      <Home
    /*    cities: ICity[]={[
          {
            __typename: 'City',
            id: 1,
            name: "Bordeaux",
            longitude: 44.8473900254569,
            latitude: -0.7188799313856008,
            //   photo: bordeaux,
          },
          {
            __typename: 'City',
            id: 2,
            name: "Lille",
            longitude: 50.62976866778606,
            latitude: 3.04621070309212,
            //   photo: lille,
          },
        ]}*/
      />
    </ApolloProvider>,
    { wrapper: MemoryRouter }
  );
});