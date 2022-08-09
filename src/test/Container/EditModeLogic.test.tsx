/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { Table, Tbody } from "@chakra-ui/react";

import { initialItem, dummyData, Item } from "../../model/model";
import { useSelector, useDispatch } from "react-redux";
import EditModeContainer from "../../components/Container/EditModeContainer";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

describe("EditModeContainerのロジック", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("useSelect, useDispatchのモックが正しく呼ばれているか", () => {
    let isFilled = false;

    const setIsFilled = jest.fn();
    const setItem = jest.fn();
    const setOnEdited = jest.fn();

    // ダミーのuseSelector, useDispatchを作る
    const items = [initialItem(0), dummyData(1)] as Item[];
    useSelectorMock.mockImplementation((selector) =>
      selector({ items: { value: items } })
    );
    useDispatchMock.mockReturnValue(jest.fn());

    render(
        <Table variant="striped" colorScheme="gray">
          <Tbody>
            <EditModeContainer
              item={initialItem(0)}
              isFilled={isFilled}
              setOnEdited={setOnEdited}
              setIsFilled={setIsFilled}
              setItem={setItem}
            />
          </Tbody>
        </Table>
    );
    expect(useDispatchMock).toHaveBeenCalled();
    expect(useSelectorMock).toHaveBeenCalled();

    // 行を追加ボタンをクリックする
    const ButtonElement = screen.getByRole("button");
    userEvent.click(ButtonElement);
  });
});
