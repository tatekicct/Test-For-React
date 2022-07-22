/* eslint-disable testing-library/no-debugging-utils */
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../state/store";
import App from "../App";

afterEach(() => {
  cleanup();
});

describe("Appに関するテスト", () => {
  test("App", () => {

    render(
      <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
    );
    
  });
});