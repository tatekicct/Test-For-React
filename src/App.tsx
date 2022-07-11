import React, { useEffect, useState } from "react";
import Row from "./components/Row";
import { Helmet } from 'react-helmet';
import { Item } from "./models/models";

import "./App.css";

const App: React.FC = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [isNonNull, setIsNonNull] = useState(false);
  const [total, setTotal] = useState<number>(0);

  // 初期値は適当にして、行を追加
  const handleAdd = () => {
    setIsNonNull(false);
    setItems([
      ...items,
      {
        id: items.length,
        category: "",
        content: "",
        fee: "",
        inOrOut: "支出",
      },
    ]);
  };

  // 最初のレンダリング後は、行を１つだけ追加した状態から始める
  useEffect(() => {
    setItems([
      {
        id: 0,
        category: "",
        content: "",
        fee: "",
        inOrOut: "支出",
      },
    ]);
  }, []);

  useEffect(() => {
    const feeList = items.map((item) => item.inOrOut === "支出" ? item.fee : '-' + item.fee);
    // undefinedの配列である可能性を排除( (string | undefined)[] => string[])
    const numList = feeList.filter(
      (item): item is string => typeof item == "string"
    );
    setTotal(numList.reduce((sum, element) => sum + Number(element), 0));
  }, [items, total]);

  return (
    <div>
      <Helmet>
        <title>
          {`収支: ${total}`}
        </title>
      </Helmet>

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
            <Row
              index={index}
              setIsNonNull={setIsNonNull}
              items={items}
              setItems={setItems}
              key={item.id}
            />
          ))}
        </tbody>
      </table>

      <div>合計: {total}</div>
      {isNonNull ? (
        // 未入力の行がなければ、行追加ボタンを表示
        <button type="button" onClick={handleAdd}>
          行を追加
        </button>
      ) : (
        // 未入力の行があれば、注意喚起
        <p style={{ color: "red" }}>※分類か金額が未入力の項目があります。</p>
      )}
    </div>
  );
};

export default App;
