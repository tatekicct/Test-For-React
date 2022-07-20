import React, { useEffect, useState } from "react";
// redux関連
import { useSelector } from "react-redux";
import { State } from "../../state/store";
import TableComponentPresentation from "../Presentation/TableComponentPresentation";

const TableComponent: React.FC = () => {
  const items = useSelector((state: State) => state.items.value);
  const [hasUndefinedRow, setHasUndefinedRow] = useState(true);

  // itemsが更新されるたびに、未入力の行がないか確認
  useEffect(() => {
    setHasUndefinedRow(false);
    items.forEach((item) => {
      if (!item.isFilled) {
        setHasUndefinedRow(true);
      }
    });
  }, [items, hasUndefinedRow]);

  return (
    <TableComponentPresentation
      items={items}
      hasUndefinedRow={hasUndefinedRow}
      setHasUndefinedRow={setHasUndefinedRow}
    />
  );
};

export default TableComponent;
