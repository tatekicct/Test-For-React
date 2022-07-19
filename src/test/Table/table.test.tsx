import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import AddRowButton from "../../components/Container/AddRowButton";

test("行が追加されるか確認", () => {
  const [hasUndefinedRow, setHasUndefinedRow] = useState(false);
  render(
    <AddRowButton
      hasUndefinedRow={hasUndefinedRow}
      setHasUndefinedRow={setHasUndefinedRow}
    />
  );
});
