import React from "react";
import { Item } from "../../model/model";
import { Tbody } from "@chakra-ui/react";
import ItemRow from "../Container/ItemRow";

type Props = {
  data: Item[];
};

const TableBody: React.FC<Props> = ({ data }) => {

  return (
    <Tbody>
      {data.map((item, index) => (
        <ItemRow index={index} key={item.id} />
      ))}
    </Tbody>
  );
};

export default TableBody;
