/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { store } from "../../state/store";

import { ChakraProvider, Table, TableContainer } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

import { formatDate, initialItem, Item } from "../../model/model";
import TableBody from "../../components/Presentation/TableBody";
import TableHeader from "../../components/Presentation/TableHeader";
import { debug } from "console";

afterEach(() => {
  cleanup();
});

//
const items: Item[] = [initialItem(0)];

describe("各項目に書き込んでいく", () => {
  test("最初の行には今日の日付と支出が初期値として代入されている", () => {
    render(
      <React.StrictMode>
        <ChakraProvider>
          <Provider store={store}>
            <TableContainer whiteSpace="normal">
              <Table variant="striped" colorScheme="gray">
                <TableHeader />
                <TableBody data={items} />
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
  });

  test("編集して各項目に値を入力し、反映される", () => {
    render(
      <React.StrictMode>
        <ChakraProvider>
          <Provider store={store}>
            <TableContainer whiteSpace="normal">
              <Table variant="striped" colorScheme="gray">
                <TableHeader />
                <TableBody data={items} />
              </Table>
            </TableContainer>
          </Provider>
        </ChakraProvider>
      </React.StrictMode>
    );

    // 編集ボタンを押して、各項目のinputタグを探す
    userEvent.click(screen.getByRole("button"));
    const dateInputElement = screen.getByRole("date", { name: "date" });
    const categoryInputElement = screen.getByRole("textbox", {
      name: "category",
    });
    const contentInputElement = screen.getByRole("textbox", {
      name: "content",
    });
    const feeInputElement = screen.getByRole("textbox", { name: "fee" });
    const inOrOutInputElement = screen.getByRole("combobox", { name: "inOrOut" });

    // 各項目のinputタグに入力
    userEvent.type(dateInputElement, "2022-06-03");
    userEvent.type(categoryInputElement, "交通費");
    userEvent.type(contentInputElement, "内容部分に書き込みました");
    userEvent.type(feeInputElement, "1300");
    userEvent.selectOptions(inOrOutInputElement, screen.getByText('収入'));


    // 編集を終える
    userEvent.click(screen.getByRole("button"));
    userEvent.click(screen.getByRole("button"));


    // 入力通りに表示されているか確認
    const dateElement = screen.getByText("2022-06-03");
    const categoryElement = screen.getByText("交通費");
    const contentElement = screen.getByText("内容部分に書き込みました");
    const feeElement = screen.getByText("1300");
    // const inOrOutElement = screen.getByText("収入")

    expect(dateElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(feeElement).toBeInTheDocument();
  });
});
