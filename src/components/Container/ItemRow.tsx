import React, { useState } from "react";
import { initialItem, Item } from "../../model/model";
import EditModeContainer from "./EditModeContainer";
import DisplayMode from "../Presentation/DisplayModePresentation";

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
    <EditModeContainer
      item={item}
      isFilled={isFilled}
      setOnEdited={setOnEdited}
      setIsFilled={setIsFilled}
      setItem={setItem}
    />
  ) : (
    // 編集中でなければ、その値を表示する
    <DisplayMode 
      item={item}
      isFilled={isFilled}
      setOnEdited={setOnEdited}
    />
  );
};

export default ItemRow;
