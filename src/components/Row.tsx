import React, { ChangeEvent, useState } from "react";
import { Item } from "../models/models";

type props = {
  index: number;
  setIsNonNull: React.Dispatch<React.SetStateAction<boolean>>
};

// 日付をYYYY-MM-DDの書式で返すメソッド
function formatDate(dt: Date) {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
}

const Row: React.FC<props> = ({ index, setIsNonNull }) => {

  const [onEdited, setOnEdited] = useState<Boolean>(false);
  const [item, setItem] = useState<Item>({
    id: index,
    date: formatDate(new Date(Date.now())),
    inOrOut: "支出",
  });



  let test: boolean = item.id! % 2 === 0; // 本当はスタイルシートのところでテンプレート文字列で書きたかった。

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`${name}, ${value}`);
    setItem({ ...item, [name]: value });
  };

  const handleUpdate = () => {
    
    if(item.category && item.content) {
      setOnEdited((prevState: Boolean) => !prevState)
      setIsNonNull(true);
    } else {
      setIsNonNull(false);
    }

  }

  return onEdited ? (
    <>
      <tr>
        <td>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={item?.date}
          />
        </td>
        <td>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            value={item?.category}
          />
        </td>
        <td>
          <input
            type="text"
            name="content"
            onChange={handleChange}
            value={item?.content}
          />
        </td>
        <td>
          <input
            type="number"
            name="fee"
            onChange={handleChange}
            value={item?.fee}
          />
        </td>
        <td>
          <select name="inOrOut" onChange={handleChange} value={item?.inOrOut}>
            <option value="収入">収入</option>
            <option value="支出">支出</option>
          </select>
        </td>
        <td>
          <button
            type="button"
            onClick={handleUpdate}
          >
            更新
          </button>
        </td>
      </tr>
    </>
  ) : (
    <>
      <tr
        style={{
          backgroundColor: test ? "white" : "#d6d3cb",
        }}
      >
        <td>{item?.date}</td>
        <td>{item?.category}</td>
        <td>{item?.content}</td>
        <td>{item?.fee}</td>
        <td>{item?.inOrOut}</td>
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
