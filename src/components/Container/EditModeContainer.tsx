import React, { ChangeEvent } from "react";
import { Item } from "../../model/model";


// redux関連
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "../../state/slice/itemsSlice";
import { State } from "../../state/store";
import EditModePresentation from "../Presentation/EditModePresentation";

// Propsの型定義
type Props = {
  isFilled: boolean;
  item: Item;
  setOnEdited: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFilled: React.Dispatch<React.SetStateAction<boolean>>;
  setItem: React.Dispatch<React.SetStateAction<Item>>;
};

const EditModeContainer: React.FC<Props> = ({
  isFilled,
  item,
  setOnEdited,
  setIsFilled,
  setItem,
}) => {
  // グローバルなステート
  const dispatch = useDispatch();
  const items = useSelector((state: State) => state.items.value);

  // 入力があればitemステートに値をセットする
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  // 分類と金額に未入力がなければitemsステートに追加して新たな行を追加できるようにする
  const handleUpdate = () => {
    if (item.category && item.fee) {

      dispatch(updateItem({ items: items, item: item, isFilled: true }));
      setIsFilled(true);
      setOnEdited((prevState) => !prevState);
    } else {
      dispatch(updateItem({ items: items, item: item, isFilled: false }));
      setIsFilled(false);
    }
  };
  return <EditModePresentation 
            isFilled={isFilled} 
            item={item} 
            handleChange={handleChange} 
            handleUpdate={handleUpdate}
          />;
};

export default EditModeContainer;
