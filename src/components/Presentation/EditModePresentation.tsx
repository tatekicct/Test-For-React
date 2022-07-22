import React, { ChangeEvent } from "react";
import { Item } from "../../model/model";

import { Button, Input, Select, Td, Textarea, Tr } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

// Propsの型定義
type Props = {
  isFilled: boolean;
  item: Item;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleUpdate: () => void;
};

const EditModePresentation: React.FC<Props> = ({
  isFilled,
  item,
  handleChange,
  handleUpdate,
}) => {
  return (
    <>
      <Tr
        onBlur={handleUpdate}
        style={{ border: isFilled ? "" : "solid red 2px" }}
      >
        <Td>
          <Input
            type="date"
            name="date"
            role="date"
            aria-label="date"
            onChange={handleChange}
            value={item.date}
            outline="1px solid blue"
          />
        </Td>
        <Td>
          <Input
            isRequired
            type="text"
            name="category"
            aria-label="category"
            onChange={handleChange}
            value={item.category}
            outline="1px solid blue"
          />
        </Td>
        <Td>
          <Textarea
            name="content"
            aria-label="content"
            onChange={handleChange}
            value={item.content}
            outline="1px solid blue"
            overflow="hidden"
            placeholder="30文字以内"
            maxLength={30}
          />
        </Td>
        <Td>
          <Input
            isRequired
            name="fee"
            aria-label="fee"
            onChange={handleChange}
            value={item.fee}
            outline="1px solid blue"
          />
        </Td>
        <Td>
          <Select
            name="inOrOut"
            aria-label="inOrOut"
            onChange={handleChange}
            value={item.inOrOut}
            outline="1px solid blue"
          >
            <option value="収入" aria-label="収入">収入</option>
            <option value="支出" aria-label="支出">支出</option>
          </Select>
        </Td>
        <Td>
          <Button
            colorScheme="blue"
          >
            <RepeatIcon />
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default EditModePresentation;
