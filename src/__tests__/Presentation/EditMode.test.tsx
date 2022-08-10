/* eslint-disable testing-library/no-debugging-utils */
import { Provider } from "react-redux";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import EditModePresentation from "../../components/Presentation/EditModePresentation";
import TableHeader from "../../components/Presentation/TableHeader";
import TableBody from "../../components/Presentation/TableBody";
import { initialItem, Item } from "../../model/model";
import { store } from "../../state/store";

import { TableContainer, Table, Tbody } from "@chakra-ui/react";

afterEach(() => {
  cleanup();
});

describe("EditMode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  const item = initialItem(0);
  const handleChange = jest.fn();
  const handleUpdate = jest.fn();

  test("isFilled:falseでhandleChangeが呼ばれている", () => {
    render(
      <TableContainer whiteSpace="normal">
        <Table variant="striped" colorScheme="gray">
          <TableHeader />
          <Tbody>
            <EditModePresentation
              isFilled={false}
              item={item}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
            />
          </Tbody>
        </Table>
      </TableContainer>
    );
    const feeInputElement = screen.getByRole("textbox", { name: "fee" });
    userEvent.type(feeInputElement, "5300");
    expect(handleChange).toBeCalled();
  });

  test("handleUpdateが呼ばれて, 分類か金額に未入力があることを検出しているか", () => {
    render(
      <TableContainer whiteSpace="normal">
        <Table variant="striped" colorScheme="gray">
          <TableHeader />
          <Tbody>
            <EditModePresentation
              isFilled={false}
              item={item}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
            />
          </Tbody>
        </Table>
      </TableContainer>
    );
    const feeInputElement = screen.getByRole("textbox", { name: "fee" });
    userEvent.type(feeInputElement, "300");

    // 編集終了ボタンを押す
    const Btn = screen.getByRole("button");
    userEvent.click(Btn);
    expect(handleUpdate).toBeCalled();

  });

  test("isFilled:true", () => {
    render(
      <TableContainer whiteSpace="normal">
        <Table variant="striped" colorScheme="gray">
          <TableHeader />
          <Tbody>
            <EditModePresentation
              isFilled={true}
              item={item}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
            />
          </Tbody>
        </Table>
      </TableContainer>
    );
    const feeInputElement = screen.getByRole("textbox", { name: "fee" });
    userEvent.type(feeInputElement, "500");

    // 編集終了ボタンを押す
    const Btn = screen.getByRole("button");
    userEvent.click(Btn);
    expect(handleUpdate).toBeCalled();

    // Trタグのstyleがborder: "2px solid red"ではなく""であることを確認する
    const tableRow = screen.getAllByRole("row");
    expect(tableRow[1].style.getPropertyValue("border")).toBe("");
  });

  test("各項目に入力された通りの値が代入されている", () => {
    const items: Item[] = [initialItem(0)];
    render(
      <Provider store={store}>
        <TableContainer whiteSpace="normal">
          <Table variant="striped" colorScheme="gray">
            <TableHeader />
            <TableBody data={items} />
          </Table>
        </TableContainer>
      </Provider>
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
    const inOrOutInputElement = screen.getByRole("combobox", {
      name: "inOrOut",
    });

    // 各項目のinputタグに入力
    userEvent.type(dateInputElement, "2022-06-03");
    userEvent.type(categoryInputElement, "交通費");
    userEvent.type(contentInputElement, "内容部分に書き込みました");
    // 分類と金額が入力された状態でselectOptiononを呼ぶとonBlur()イベントハンドラが呼ばれて編集モードではなくなってしまう。
    userEvent.selectOptions(inOrOutInputElement, screen.getByText("収入"));
    userEvent.type(feeInputElement, "1300");

    // 編集を終える
    userEvent.click(screen.getByRole("button"));

    // 入力通りに表示されているか確認
    const dateElement = screen.getByText("2022-06-03");
    const categoryElement = screen.getByText("交通費");
    const contentElement = screen.getByText("内容部分に書き込みました");
    const feeElement = screen.getByText("1300");
    const inOrOutElement = screen.getByText("収入");

    expect(dateElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(feeElement).toBeInTheDocument();
    expect(inOrOutElement).toBeInTheDocument();
  });
});
