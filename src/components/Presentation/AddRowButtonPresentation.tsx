import React from "react";
import { AddIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";

type Props = {
  hasUndefinedRow: boolean;
  handleAdd: () => void;
  total: number;
};

const AddRowButtonPresentation: React.FC<Props> = ({
  hasUndefinedRow,
  handleAdd,
  total,
}) => {
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

export default AddRowButtonPresentation;
