/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
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

describe("DisplayModeのテスト。", () => {
  test("初期値には今日の日付、支出が代入されて表示されている", () => {
    const item = initialItem(0);
    let isFilled = false;

    // useStateのset関数をモックする
    const setStateMocked = jest.fn()
    const useStateMock: any = (useState: any) => [useState, setStateMocked]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    const [, setOnEdited] = useStateMock([])

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

    expect(dateElement).toBeInTheDocument();
    expect(outcomeElement).toBeInTheDocument();

    // ボタンをクリックしてsetOnEditedが呼ばれているか
    const ButtonElement = screen.getByRole("button");
    userEvent.click(ButtonElement);
    expect(setOnEdited).toBeCalled()

  });

});
