import React, { ChangeEvent, useState } from "react";
import { Item, formatDate } from "../models/models";
// redux関連
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../state/slice/itemsSlice";
import { State } from "../state/store";
// chakra-ui関連
import { Button, Input, Select, Textarea } from "@chakra-ui/react";
import { Tr, Td } from "@chakra-ui/react";
import { EditIcon, RepeatIcon } from "@chakra-ui/icons";

// Propsの型定義
type Props = {
  index: number;
};

// 行コンポーネント
const Row: React.FC<Props> = ({ index }) => {
  // グローバルなステート
  const dispatch = useDispatch();
  const items = useSelector((state: State) => state.items.value);

  // ローカルなコンポーネントステート
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [onEdited, setOnEdited] = useState<boolean>(false);
  const [item, setItem] = useState<Item>({
    id: index,
    date: formatDate(new Date(Date.now())),
    category: "",
    content: "",
    fee: "",
    inOrOut: "支出",
    isFilled: false,
  });

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
      dispatch(
        setItems(
          items.map((preItem, index) =>
            index === item.id ? { ...item, isFilled: true } : preItem
          )
        )
      );
      setIsFilled(true);
      setOnEdited((prevState) => !prevState);
    } else {
      dispatch(
        setItems(
          items.map((preItem, index) =>
            index === item.id ? { ...item, isFilled: false } : preItem
          )
        )
      );
      setIsFilled(false);
    }
  };

  return onEdited ? (
    // 編集中なら入力欄を表示する
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
  ) : (
    // 編集中でなければ、その値を表示する
    <>
      <Tr
        onClick={() => setOnEdited((prevState) => !prevState)}
        style={{
          border: isFilled ? "" : "solid red 2px",
        }}
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
    </>
  );
};

export default Row;
