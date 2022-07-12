import React, { ChangeEvent, useState } from "react";
import { Item, formatDate } from "../models/models";

import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../state/slice/itemsSlice";
import { State } from "../state/store";

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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      <tr
        onBlur={handleUpdate}
        style={{ border: isFilled ? "" : "solid red 2px" }}
      >
        <td>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={item.date}
          />
        </td>
        <td>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            value={item.category}
          />
        </td>
        <td>
          <input
            type="text"
            name="content"
            onChange={handleChange}
            value={item.content}
          />
        </td>
        <td>
          <input
            type="number"
            name="fee"
            onChange={handleChange}
            value={item.fee}
          />
        </td>
        <td>
          <select name="inOrOut" onChange={handleChange} value={item.inOrOut}>
            <option value="収入">収入</option>
            <option value="支出">支出</option>
          </select>
        </td>
        <td>
          <button type="button" onClick={handleUpdate} onBlur={handleUpdate}>
            更新
          </button>
        </td>
      </tr>
    </>
  ) : (
    // 編集中でなければ、その値を表示する
    <>
      <tr
        onClick={() => setOnEdited((prevState) => !prevState)}
        style={{
          backgroundColor: item.id! % 2 === 0 ? "white" : "#d6d3cb",
          border: isFilled ? "" : "solid red 2px",
        }}
      >
        <td>{item.date}</td>
        <td>{item.category}</td>
        <td>{item.content}</td>
        <td>{item.fee}</td>
        <td>{item.inOrOut}</td>
        <td>
          <button
            type="button"
            onFocus={() => setOnEdited((prevState) => !prevState)}
          >
            編集
          </button>
        </td>
      </tr>
    </>
  );
};

export default Row;
