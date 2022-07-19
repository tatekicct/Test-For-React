import { EditIcon } from "@chakra-ui/icons";
import { Tr, Td, Button } from "@chakra-ui/react";
import { Item } from "../../model/model";

type Props = {
  item: Item;
  isFilled: boolean;
  setOnEdited: React.Dispatch<React.SetStateAction<boolean>>;
};

const DisplayMode: React.FC<Props> = ({ item, isFilled, setOnEdited }) => {
  return (
    <Tr
      style={{ border: isFilled ? "" : "solid red 2px" }}
      onClick={() => setOnEdited((prevState) => !prevState)}
    >
      <Td>{item.date}</Td>
      <Td>{item.category}</Td>
      <Td>{item.content}</Td>
      <Td>{item.fee}</Td>
      <Td>{item.inOrOut}</Td>
      <Td>
        <Button
          colorScheme="blue"
          type="button"
          onFocus={() => setOnEdited((prevState) => !prevState)}
        >
          <EditIcon />
        </Button>
      </Td>
    </Tr>
  );
};

export default DisplayMode;
