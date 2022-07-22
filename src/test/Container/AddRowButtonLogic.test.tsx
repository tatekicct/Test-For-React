/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import AddRowButton from "../../components/Container/AddRowButton";
import { ChakraProvider } from "@chakra-ui/react";

import { initialItem, dummyData, Item } from "../../model/model";
import { useSelector, useDispatch } from "react-redux";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

describe("AddRowButtonのロジック", () => {

  afterEach(() => {
    jest.resetAllMocks()
  })

  test("useSelect, useDispatchのモックができるか", () => {
    let hasUndefinedRow = false;
    const setHasUndefinedRow = jest.fn((input: boolean) => {
      hasUndefinedRow = input;
    });

    // ダミーのuseSelector, useDispatchを作る
    const items = [initialItem(0), dummyData(1)] as Item[];
    useSelectorMock.mockReturnValue(items);
    useDispatchMock.mockReturnValue(jest.fn())

    render(
      <ChakraProvider>
        <AddRowButton
          hasUndefinedRow={hasUndefinedRow}
          setHasUndefinedRow={setHasUndefinedRow}
        />
      </ChakraProvider>
    );
    expect(useDispatchMock).toHaveBeenCalled();
    expect(useSelectorMock).toHaveBeenCalled();

    // 行を追加ボタンをクリックする
    const ButtonElement = screen.getByRole("button");
    userEvent.click(ButtonElement);
    // Dispatchが呼ばれていることを確認
    expect(useDispatchMock).toHaveBeenCalledTimes(3)
  });
});
