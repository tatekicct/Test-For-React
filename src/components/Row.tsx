import React, { ChangeEvent, useState } from "react";
import { Item } from "../models/models";
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as actionCreators from "../state/action/actionCreators";

// propsの型定義
type props = {
  index: number;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

// 日付をYYYY-MM-DDの書式で返すメソッド
function formatDate(dt: Date) {
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
}

// 行コンポーネント
const Row: React.FC<props> = ({ index, items, setItems }) => {
  // グローバルなステートにアクションする
  const dispatch = useDispatch();
  const { setIsNotNull } = bindActionCreators(actionCreators, dispatch);

  const [isFilled, setIsFilled] = useState<Boolean>(false);
  const [onEdited, setOnEdited] = useState<Boolean>(false);
  const [item, setItem] = useState<Item>({
    id: index,
    date: formatDate(new Date(Date.now())),
    category: "",
    content: "",
    inOrOut: "支出",
  });

  // 入力があればitemステートに値をセットする
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  // 分類と金額に未入力がなければitemsステートに追加して新たな行を追加できるようにする
  const handleUpdate = () => {
    if (item.category && item.fee) {
      setItems(
        items.map((preItem, index) => (index === item.id ? item : preItem))
      );
      setOnEdited((prevState: Boolean) => !prevState);
      setIsNotNull(true);
      setIsFilled(true);
    } else {
      setIsNotNull(false);
      setIsFilled(false);
    }
  };

  return onEdited ? (
    // 編集中なら入力欄を表示する
    <>
      <tr style={{ border: isFilled ? "" : "solid red 2px" }}>
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
          <button type="button" onClick={handleUpdate}>
            更新
          </button>
        </td>
      </tr>
    </>
  ) : (
    // 編集中でなければ、その値を表示する
    <>
      <tr
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
            onClick={() => setOnEdited((prevState: Boolean) => !prevState)}
          >
            編集
          </button>
        </td>
      </tr>
    </>
  );
};

export default Row;
