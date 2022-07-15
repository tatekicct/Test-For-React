import { AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialItem } from "../model/model";
import { addItem } from "../state/slice/itemsSlice";
import { State } from "../state/store";


type Props = {
  hasUndefinedRow: boolean;
  setHasUndefinedRow: React.Dispatch<React.SetStateAction<boolean>>
}

const AddRowButton: React.FC<Props> = ({hasUndefinedRow, setHasUndefinedRow}) => {
  const [total, setTotal] = useState<number>(0);

  const dispatch = useDispatch();
  const items = useSelector((state: State) => state.items.value);

  // 初期値は適当にして、行を追加
  const handleAdd = () => {
    setHasUndefinedRow(false);
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
    <>
      <Box fontSize="2xl" fontWeight="bold">
        合計: {total}
      </Box>
      {hasUndefinedRow ? (
        // 未入力の行がなければ、行追加ボタンを表示
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={handleAdd}>
          行を追加
        </Button>
      ) : (
        // 未入力の行があれば、注意喚起
        <p style={{ color: "red" }}>
          {<WarningIcon w={8} h={8} />}分類か金額が未入力の項目があります。
        </p>
      )}
    </>
  );
};

export default AddRowButton;
