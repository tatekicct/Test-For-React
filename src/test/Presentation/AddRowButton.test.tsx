/* eslint-disable testing-library/no-debugging-utils */
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import AddRowButtonPresentation from "../../components/Presentation/AddRowButtonPresentation";
import userEvent from "@testing-library/user-event";

describe("AddRowButton", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  const handleAdd = jest.fn();

  test("ボタンをクリックするとhandleAddが呼ばれる", () => {
    // jest.fn(implementation) は jest.fn().mockImplementation(implementation) の省略形
    render(
      <AddRowButtonPresentation
        hasUndefinedRow={false}
        handleAdd={handleAdd}
        total={100}
      />
    );
    // ボタンをクリックする
    const ButtonElement = screen.getByRole("button");
    userEvent.click(ButtonElement);
    expect(handleAdd).toBeCalled()
    
  });

  test("totalがpropertyの値どおりに表示される", () => {
    
    render(
      <AddRowButtonPresentation
        hasUndefinedRow={false}
        handleAdd={handleAdd}
        total={30}
      />
    );
    const totalElement = screen.getByText("合計: 30");
    expect(totalElement).toBeInTheDocument();
    
  });

  test("hasUndefinedRow=trueにすると、行ボタンは消えて、エラーメッセージが表示される",() => {
    
    render(
      <AddRowButtonPresentation
        hasUndefinedRow={true}
        handleAdd={handleAdd}
        total={350}
      />
    );

    // ボタンは存在しない
    const ButtonElement = screen.queryByRole("button");
    expect(ButtonElement).not.toBeInTheDocument(); 

    // 代わりにエラーメッセージが表示されている
    const errorMessage = screen.queryByText(
      /分類か金額が未入力の項目があります。/i
    );
    expect(errorMessage).toBeInTheDocument();
  })
});