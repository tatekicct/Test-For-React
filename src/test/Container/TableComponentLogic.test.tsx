/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useSelector } from "react-redux";

import { ChakraProvider, Container } from "@chakra-ui/react";

import { dummyData, initialItem, Item } from "../../model/model";
import TableComponent from "../../components/Container/TableComponent";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;

afterEach(() => {
  cleanup();
});

describe("TableComponentのテスト。", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test("useSelectorが呼ばれている", () => {
    // ダミーのuseSelectorを作る
    const items = [initialItem(0), dummyData(1)] as Item[];
    useSelectorMock.mockImplementation(() => items);

    render(
      <ChakraProvider>
        <Container maxW="1000px" minW="800px">
          <TableComponent />
        </Container>
      </ChakraProvider>
    );

    expect(useSelectorMock).toHaveBeenCalled();
  });
});
