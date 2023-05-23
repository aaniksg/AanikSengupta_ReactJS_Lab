import { Table } from "react-bootstrap"
import IExpenseItem from "../models/expense";

type ExpenseItemsModel = {
  expenseItems: IExpenseItem[];
}

const ExpenseItems = (expenseItemsModel: ExpenseItemsModel) => {
  return (
    <Table striped bordered hover>
      <thead style={{ backgroundColor: "#1976D2", color: "white" }}>
        <tr>
          <th>S No.</th>
          <th>Description</th>
          <th>Payee Name</th>
          <th>Expense Date</th>
          <th>Price {'(₹)'}</th>
        </tr>
      </thead>
      <tbody>
        {
          expenseItemsModel.expenseItems.map((expenseItem, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{expenseItem.product}</td>
                <td>{expenseItem.payeeName}</td>
                <td>{expenseItem.setDate}</td>
                <td>{expenseItem.price}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
};
export { ExpenseItems };