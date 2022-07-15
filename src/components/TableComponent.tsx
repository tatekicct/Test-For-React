import React, { useEffect, useState } from "react";
import { Table, TableContainer } from "@chakra-ui/react";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
// redux関連
import { useSelector } from "react-redux";
import { State } from "../state/store";
import AddRowButton from "./AddRowButton";

const TableComponent: React.FC = () => {
  const items = useSelector((state: State) => state.items.value);
  const [hasUndefinedRow, setHasUndefinedRow] = useState(false);

  // itemsが更新されるたびに、未入力の行がないか確認
  useEffect(() => {
    setHasUndefinedRow(true);
    items.forEach((item) => {
      if (!item.isFilled) {
        setHasUndefinedRow(false);
      }
    });
  }, [items, hasUndefinedRow]);

  return (
    <>
      <TableContainer whiteSpace="normal">
        <Table variant="striped" colorScheme="gray">
          <TableHeader />
          <TableBody data={items} />
        </Table>
      </TableContainer>
      <AddRowButton
        hasUndefinedRow={hasUndefinedRow}
        setHasUndefinedRow={setHasUndefinedRow}
      />
    </>
  );
};

export default TableComponent;
