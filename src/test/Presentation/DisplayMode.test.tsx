/* eslint-disable testing-library/no-debugging-utils */
import React, { useState as useStateMock } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Table, TableContainer, Tbody } from "@chakra-ui/react";

import { formatDate, initialItem } from "../../model/model";
import TableHeader from "../../components/Presentation/TableHeader";
import DisplayMode from "../../components/Presentation/DisplayModePresentation";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

// useState以外はそのままモジュールをインポート、useStateだけ何もしない関数に置き換える
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("DisplayMode", () => {
  const setState = jest.fn().mockImplementation((state) => !state);

  beforeEach(() => {
    // useStateMock関数を定義する
    (useStateMock as jest.Mock).mockImplementation( state => [state, setState]);
  });

  const item = initialItem(0);
  let isFilled = false;

  test("初期値には今日の日付、支出が代入されて表示されている", () => {
    // useStateのset関数をモックする
    const [onEdited, setOnEdited] = useStateMock(false);

    render(
      <TableContainer whiteSpace="normal">
        <Table variant="striped" colorScheme="gray">
          <TableHeader />
          <Tbody>
            <DisplayMode
              item={item}
              isFilled={isFilled}
              setOnEdited={setOnEdited}
            />
          </Tbody>
        </Table>
      </TableContainer>
    );

    const today = formatDate(new Date());
    const dateElement = screen.getByText(today);
    const outcomeElement = screen.getByText("支出");

    // 今日の日付、支出が代入されて表示されている
    expect(dateElement).toBeInTheDocument();
    expect(outcomeElement).toBeInTheDocument();

    // TrをクリックしてsetOnEditedが呼ばれているか
    const tableRow = screen.getAllByRole("row");
    userEvent.click(tableRow[1]);
    expect(setOnEdited).toHaveBeenCalled();

  });

  test("isFilled: true", () => {
    const [, setOnEdited] = useStateMock(false);
    render(
      <TableContainer whiteSpace="normal">
        <Table variant="striped" colorScheme="gray">
          <TableHeader />
          <Tbody>
            <DisplayMode
              item={item}
              isFilled={true}
              setOnEdited={setOnEdited}
            />
          </Tbody>
        </Table>
      </TableContainer>
    );

    // Trタグのstyleがborder: "2px solid red"ではなく""であることを確認する
    const tableRow = screen.getAllByRole("row");
    expect(tableRow[1].style.getPropertyValue("border")).toBe("");

  });
});
