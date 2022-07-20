import { cleanup, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import { Provider } from "react-redux";
import { store } from "../../state/store";

import AddRowButtonPresentation from "../../components/Presentation/AddRowButtonPresentation";

afterEach(() => {
  cleanup();
});

describe("初期レンダリング後のテスト", () => {
  test("初期状態は未入力の欄があるので、エラーメッセージが表示される", () => {
    render(
      <Provider store={store}>
        <AddRowButtonPresentation
          hasUndefinedRow={true}
          handleAdd={() => {}}
          total={100}
        />
      </Provider>
    );
    const errorMessage = screen.queryByText(
      /分類か金額が未入力の項目があります。/i
    );
    expect(errorMessage).toBeInTheDocument();

  });

  test("hasUndefinedRowをtruenにするとエラーメッセージが表示されなくなり、行を追加するボタンが表示される", () => {
    render(
      <Provider store={store}>
        <AddRowButtonPresentation
          hasUndefinedRow={false}
          handleAdd={() => {}}
          total={100}
        />
      </Provider>
    );
    const errorMessage = screen.queryByText(
      /分類か金額が未入力の項目があります。/i
    );
    const ButtonElement = screen.getByRole("button")

    expect(errorMessage).not.toBeInTheDocument();
    expect(ButtonElement).toBeInTheDocument();

  });


});
