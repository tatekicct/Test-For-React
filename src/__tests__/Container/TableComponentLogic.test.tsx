/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useSelector } from "react-redux";

import { Container } from "@chakra-ui/react";

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
    useSelectorMock.mockImplementation((selector) =>
      selector({ items: { value: items } })
    );

    render(<TableComponent />);

    expect(useSelectorMock).toHaveBeenCalled();
  });
});
