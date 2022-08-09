import { initialItem, dummyData } from "../model/model";
import itemReducer, {
  addItem,
  setItems,
  updateItem,
} from "../state/slice/itemsSlice";

describe("itemReducerおよび各アクションのテスト", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const item0 = initialItem(0);
  const item1 = initialItem(1);

  const prevItem = {
    value: [item0],
  };
  const expectItem = {
    value: [item0, item1],
  };
  test("addItem", () => {
    expect(itemReducer(prevItem, addItem(item1))).toEqual(expectItem);
  });

  test("setItems", () => {
    const initialItem = {
      value: [],
    };
    expect(itemReducer(initialItem, setItems([item0, item1]))).toEqual(
      expectItem
    );
  });

  test("updateItem", () => {
    const initialItem = {
      value: [item0, dummyData(1)],
    };
    expect(
      itemReducer(
        initialItem,
        updateItem({ items: initialItem.value, item: item1, isFilled: false })
      )
    ).toEqual(expectItem);
  });
});
