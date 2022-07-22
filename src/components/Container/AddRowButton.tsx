import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialItem } from "../../model/model";
import { addItem } from "../../state/slice/itemsSlice";
import { State } from "../../state/store";
import AddRowButtonPresentation from "../Presentation/AddRowButtonPresentation";

type Props = {
  hasUndefinedRow: boolean;
  setHasUndefinedRow: (hasUndefinedRow: boolean) => void; 
};

const AddRowButton: React.FC<Props> = ({
  hasUndefinedRow,
  setHasUndefinedRow,
}) => {
  const [total, setTotal] = useState<number>(0);

  const dispatch = useDispatch();
  const items = useSelector((state: State) => state.items.value);

  // 初期値は適当にして、行を追加
  const handleAdd = () => {
    setHasUndefinedRow(true);
    dispatch(addItem(initialItem(items.length)));
  };

  // itemsが更新されるたびに、合計金額を計算する
  useEffect(() => {
    const feeList = items.map((item) =>
      item.inOrOut === "支出" ? item.fee : "-" + item.fee
    );
    setTotal(feeList.reduce((sum, element) => sum + Number(element), 0));
  }, [items, total]);

  // 合計金額をタイトル表示する:
  useEffect(() => {
    document.title = `収支 ${total}`;
  }, [total]);

  return (
    <AddRowButtonPresentation
      hasUndefinedRow={hasUndefinedRow}
      handleAdd={handleAdd}
      total={total}
    />
  );
};

export default AddRowButton;
