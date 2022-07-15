import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";

type Props = {
  header?: string[];
};

const TableHeader: React.FC<Props> = ({ header }) => {
  return (
    <Thead borderBottom="2px solid black">
      <Tr>
        <Th fontSize="xl" w="15%">
          日付
        </Th>
        <Th fontSize="xl" w="15%">
          分類
        </Th>
        <Th fontSize="xl">内容</Th>
        <Th fontSize="xl" w="15%">
          金額
        </Th>
        <Th fontSize="xl" w="15%">
          収入/支出
        </Th>
        <Th fontSize="xl" w="5%"></Th>
      </Tr>
    </Thead>
  );
};

export default TableHeader;
