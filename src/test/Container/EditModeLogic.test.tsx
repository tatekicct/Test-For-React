/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { ChakraProvider, Table, Tbody } from "@chakra-ui/react";

import { initialItem, dummyData, Item } from "../../model/model";
import { useSelector, useDispatch } from "react-redux";
import EditModeContainer from "../../components/Container/EditModeContainer";
import TableHeader from "../../components/Presentation/TableHeader";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

describe("EditModeContainerのロジック", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("useSelect, useDispatchのモックができるか", () => {
    let isFilled = false;

    const setIsFilled = jest.fn();
    const setItem = jest.fn();
    const setOnEdited = jest.fn();

    // ダミーのuseSelector, useDispatchを作る
    const items = [initialItem(0), dummyData(1)] as Item[];
    useSelectorMock.mockReturnValue(items);
    useDispatchMock.mockReturnValue(jest.fn());

    render(
      <ChakraProvider>
        <Table variant="striped" colorScheme="gray">
          <TableHeader />
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
      </ChakraProvider>
    );
    expect(useDispatchMock).toHaveBeenCalled();
    expect(useSelectorMock).toHaveBeenCalled();

    // 行を追加ボタンをクリックする
    const ButtonElement = screen.getByRole("button");
    userEvent.click(ButtonElement);
  });
});
