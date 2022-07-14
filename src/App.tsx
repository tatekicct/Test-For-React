import React, { useEffect, useState } from "react";
import "./App.css";
// コンポーネント
import Row from "./components/Row";
import { formatDate, Item } from "./models/models";
// redux関連
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./state/slice/itemsSlice";
import { setHasUndefinedRow } from "./state/slice/undefinedRowSlice";
import { State } from "./state/store";
// chakra-ui関連
import { AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Button, Container } from "@chakra-ui/react";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

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
      isFilled: false,
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
      if (!item.isFilled) {
        dispatch(setHasUndefinedRow(false));
      }
    });
  }, [items, hasUndefinedRow, dispatch]);

    // 合計金額をタイトル表示する:
    useEffect(() => {
      document.title = `収支 ${total}`;
    }, [total]);

  return (
    <Container maxW="1000px">

      <TableContainer whiteSpace="normal">
        <Table variant="striped" colorScheme='gray'>
          <Thead borderBottom="2px solid black">
            <Tr>
              <Th fontSize="xl" w="15%">日付</Th>
              <Th fontSize="xl" w="15%">分類</Th>
              <Th fontSize="xl">内容</Th>
              <Th fontSize="xl" w="15%">金額</Th>
              <Th fontSize="xl" w="15%">収入/支出</Th>
              <Th fontSize="xl" w="5%"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Row index={index} key={item.id} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Box fontSize="2xl" fontWeight='bold'>合計: {total}</Box>
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
    </Container>
  );
};

export default App;
