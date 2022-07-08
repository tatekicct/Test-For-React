import React, { useEffect, useState } from "react";
import Row from "./components/Row";
import { Item } from "./models/models";

import "./App.css";

const App: React.FC = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [isNonNull, setIsNonNull] = useState(false);

  const handleAdd = () => {
    setIsNonNull(false);
    setItems([
      ...items,
      {
        id: Date.now(),
        category: "",
        content: "",
        fee: 0,
        inOrOut: "支出",
      },
    ]);
  };

  useEffect(() => {
    setItems([
      {
        id: Date.now(),
        category: "",
        content: "",
        fee: 0,
        inOrOut: "支出",
      },
    ]);
  }, []);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>日付</th>
            <th>分類</th>
            <th>内容</th>
            <th>金額</th>
            <th>収入・支出</th>
            <th>編集</th>
          </tr>
          {items?.map((item, index) => (
            <Row index={index} setIsNonNull={setIsNonNull} key={item.id} />
          ))}
        </tbody>
      </table>
      {isNonNull ? (
        <button type="button" onClick={handleAdd}>
          行を追加
        </button>
      ) : (
        <p style={{ color: "red" }}>※分類か内容が未入力の項目があります。</p>
      )}
    </div>
  );
};

export default App;
