import { cleanup, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import { Provider } from "react-redux";
import { store } from "../../state/store";
import AddRowButtonPresentation from "../../components/Presentation/AddRowButtonPresentation";
import userEvent from "@testing-library/user-event";


afterEach(() => {
  cleanup();
});

describe("イベントアクションに関するテスト", () => {
  test("ボタンをクリックすると行が追加される", () => {

    // stateの代わりとなる変数と関数を定義
    let hasUndefinedRow = false
    const handleAdd = () => {
      hasUndefinedRow = true;
    }

    render(
        <AddRowButtonPresentation
          hasUndefinedRow={hasUndefinedRow}
          handleAdd={handleAdd}
          total={100}
        />
    );
    
    // ボタンをクリックする
    const ButtonElement = screen.getByRole("button")
    expect(ButtonElement).toBeInTheDocument();
    userEvent.click(ButtonElement)

    // 再レンダリング
    render(
      <Provider store={store}>
        <AddRowButtonPresentation
          hasUndefinedRow={hasUndefinedRow}
          handleAdd={handleAdd}
          total={100}
        />
      </Provider>
    );

    const errorMessage = screen.queryByText(
      /分類か金額が未入力の項目があります。/i
    );
    expect(errorMessage).toBeInTheDocument();

    

  });


});
