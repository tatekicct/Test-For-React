import React, { useState } from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { initialItem, Item } from "../model/model";
import EditMode from "./EditMode";

// Propsの型定義
type Props = {
  index: number;
};

// 行コンポーネント
const ItemRow: React.FC<Props> = ({ index }) => {
  const [onEdited, setOnEdited] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [item, setItem] = useState<Item>(initialItem(index))

  return onEdited ? (
    // 編集中なら入力欄を表示する
    <EditMode
      item={item}
      isFilled={isFilled}
      setOnEdited={setOnEdited}
      setIsFilled={setIsFilled}
      setItem={setItem}
    />
  ) : (
    // 編集中でなければ、その値を表示する
    <Tr
      style={{ border: isFilled ? "" : "solid red 2px" }}
      onClick={() => setOnEdited((prevState) => !prevState)}
    >
      <Td>{item.date}</Td>
      <Td>{item.category}</Td>
      <Td>{item.content}</Td>
      <Td>{item.fee}</Td>
      <Td>{item.inOrOut}</Td>
      <Td>
        <Button
          colorScheme="blue"
          type="button"
          onFocus={() => setOnEdited((prevState) => !prevState)}
        >
          <EditIcon />
        </Button>
      </Td>
    </Tr>
  );
};

export default ItemRow;
