import React, { useEffect, useState } from "react";
import Row from "./components/Row";
import { Helmet } from "react-helmet";
import { Item, formatDate } from "./models/models";

import { useDispatch, useSelector } from "react-redux";
import { setHasUndefinedRow } from "./state/slice/undefinedRowSlice";
import { addItem } from "./state/slice/itemsSlice";
import { State } from "./state/store";
import "./App.css";

const App: React.FC = () => {
  const items = useSelector((state: State) => state.items.value);
  const [total, setTotal] = useState<number>(0);

  // reduxを用いてグローパルなステートを定義する
  const dispatch = useDispatch();
  const hasUndefinedRow = useSelector(
    (state: State) => state.undefinedRow.value
  );

  // 初期値は適当にして、行を追加
  const handleAdd = () => {
    const initialState: Item = {
      id: items.length,
      date: formatDate(new Date(Date.now())),
      category: "",
      content: "",
      fee: "",
      inOrOut: "支出",
      isFilled: false
    };
    dispatch(setHasUndefinedRow(false));
    dispatch(addItem(initialState));
  };

  // itemsが更新されるたびに、合計金額を計算する
  useEffect(() => {
    const feeList = items.map((item) =>
      item.inOrOut === "支出" ? item.fee : "-" + item.fee
    );
    setTotal(feeList.reduce((sum, element) => sum + Number(element), 0));
  }, [items, total]);

  // itemsが更新されるたびに、未入力の行がないか確認
  useEffect(() => {
    dispatch(setHasUndefinedRow(true));
    items.forEach((item) => {
      if(!item.isFilled){
        dispatch(setHasUndefinedRow(false));
      } 
    })
  }, [items, hasUndefinedRow, dispatch]);

  return (
    <div>
      <Helmet>
        <title>{`収支: ${total}`}</title>
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
          {items.map((item, index) => (
            <Row index={index} key={item.id} />
          ))}
        </tbody>
      </table>

      <div>合計: {total}</div>
      {hasUndefinedRow ? (
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
