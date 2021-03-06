/* eslint-disable testing-library/no-debugging-utils */
import React, { useState as useStateMock } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { store } from "../../state/store";

import { ChakraProvider, Table, TableContainer, Tbody } from "@chakra-ui/react";

import { formatDate, initialItem } from "../../model/model";
import TableHeader from "../../components/Presentation/TableHeader";
import DisplayMode from "../../components/Presentation/DisplayModePresentation";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
 }));


describe("DisplayModeのテスト。", () => {
  const setState = jest.fn();
  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation(init => [init, setState]);
  });

  test("初期値には今日の日付、支出が代入されて表示されている", () => {
    const item = initialItem(0);
    let isFilled = false;

    // useStateのset関数をモックする
    const [, setOnEdited] = useStateMock(false)

    render(
      <React.StrictMode>
        <ChakraProvider>
          <Provider store={store}>
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
          </Provider>
        </ChakraProvider>
      </React.StrictMode>
    );


    const today = formatDate(new Date());
    const dateElement = screen.getByText(today);
    const outcomeElement = screen.getByText("支出");

    // 今日の日付、支出が代入されて表示されている
    expect(dateElement).toBeInTheDocument();
    expect(outcomeElement).toBeInTheDocument();

  
    // TrをクリックしてsetOnEditedが呼ばれているか
    const tableRow = screen.getAllByRole("row")
    userEvent.click(tableRow[1])

  });

});
