import React, { ChangeEvent } from "react";
import { Item } from "../model/model";

import { Button, Input, Select, Td, Textarea, Tr } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

// redux関連
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "../state/slice/itemsSlice";
import { State } from "../state/store";

// Propsの型定義
type Props = {
  isFilled: boolean;
  item: Item;
  setOnEdited: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFilled: React.Dispatch<React.SetStateAction<boolean>>;
  setItem: React.Dispatch<React.SetStateAction<Item>>;
};

const EditMode: React.FC<Props> = ({
  isFilled,
  item,
  setOnEdited,
  setIsFilled,
  setItem,
}) => {
  // グローバルなステート
  const dispatch = useDispatch();
  const items = useSelector((state: State) => state.items.value);

  // 入力があればitemステートに値をセットする
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  // 分類と金額に未入力がなければitemsステートに追加して新たな行を追加できるようにする
  const handleUpdate = () => {
    if (item.category && item.fee) {

      dispatch(updateItem({ items: items, item: item, isFilled: true }));
      setIsFilled(true);
      setOnEdited((prevState) => !prevState);
    } else {
      dispatch(updateItem({ items: items, item: item, isFilled: false }));
      setIsFilled(false);
    }
  };
  return (
    <>
      <Tr
        onBlur={handleUpdate}
        style={{ border: isFilled ? "" : "solid red 2px" }}
      >
        <Td>
          <Input
            type="date"
            name="date"
            onChange={handleChange}
            value={item.date}
            outline="1px solid blue"
          />
        </Td>
        <Td>
          <Input
            isRequired
            type="text"
            name="category"
            onChange={handleChange}
            value={item.category}
            outline="1px solid blue"
          />
        </Td>
        <Td>
          <Textarea
            name="content"
            onChange={handleChange}
            value={item.content}
            outline="1px solid blue"
            overflow="hidden"
            placeholder="30文字以内"
            maxLength={30}
          />
        </Td>
        <Td>
          <Input
            isRequired
            name="fee"
            onChange={handleChange}
            value={item.fee}
            outline="1px solid blue"
          />
        </Td>
        <Td>
          <Select
            name="inOrOut"
            onChange={handleChange}
            value={item.inOrOut}
            outline="1px solid blue"
          >
            <option value="収入">収入</option>
            <option value="支出">支出</option>
          </Select>
        </Td>
        <Td>
          <Button
            colorScheme="blue"
            onClick={handleUpdate}
            onBlur={handleUpdate}
          >
            <RepeatIcon />
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default EditMode;
