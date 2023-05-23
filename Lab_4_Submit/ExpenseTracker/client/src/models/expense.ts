interface IExpenseItem {

  payeeName: string,
  product: string,
  price: number,
  setDate: string,
  id: number

  // --> expenses.json
  // "payeeName": "Rahul",
  // "product": "qswde",
  // "price": 8,
  // "setDate": "2023-03-01",
  // "id": 18
};

export type IExpenseCreateItem = Omit<IExpenseItem, "id">;
export default IExpenseItem;