/* eslint-disable testing-library/no-debugging-utils */
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import AddRowButton from "../../components/Container/AddRowButton";

import { initialItem, dummyData, Item } from "../../model/model";
import { useSelector, useDispatch } from "react-redux";

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

describe("AddRowButtonのロジック", () => {
  test("useSelect, useDispatchのモックができるか", () => {
    let hasUndefinedRow = false;
    const setHasUndefinedRow = jest.fn((input: boolean) => {
      hasUndefinedRow = input;
    });

    // ダミーのuseSelector, useDispatchを作る
    const items = [initialItem(0), dummyData(1)] as Item[];
    useSelectorMock.mockImplementation((selector) =>
      selector({ items: { value: items } })
    );
    useDispatchMock.mockImplementation(() => jest.fn())

    render(
      <AddRowButton
        hasUndefinedRow={hasUndefinedRow}
        setHasUndefinedRow={setHasUndefinedRow}
      />
    );

    // 行を追加ボタンをクリックする
    const ButtonElement = screen.getByRole("button");
    userEvent.click(ButtonElement);
    // Dispatchが呼ばれていることを確認
    expect(useDispatchMock).toHaveBeenCalled();
  });
});
