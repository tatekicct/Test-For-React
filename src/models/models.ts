export interface Item {
  id: number;
  date?: string ;
  category: string;
  content: string;
  fee: string;
  inOrOut: string
  isFilled: boolean
}

// 日付をYYYY-MM-DDの書式で返すメソッド
export const formatDate = (dt: Date) => {
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};