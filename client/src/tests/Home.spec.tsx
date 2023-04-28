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
      <Home />
    </ApolloProvider>,
    { wrapper: MemoryRouter }
  );
});