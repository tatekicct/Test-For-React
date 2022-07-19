import { TableContainer, Table } from "@chakra-ui/react";
import React from "react";
import { Item } from "../../model/model";
import AddRowButton from "../Container/AddRowButton";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

type Props = {
  items: Item[];
  hasUndefinedRow: boolean;
  setHasUndefinedRow: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableComponentPresentation: React.FC<Props> = ({
  items,
  hasUndefinedRow,
  setHasUndefinedRow,
}) => {
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

export default TableComponentPresentation;
