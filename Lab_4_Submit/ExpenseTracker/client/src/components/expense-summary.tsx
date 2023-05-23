import { Table } from "react-bootstrap"
import IExpenseItem from "../models/expense"
import { getAllUniquePayeeNames } from "../utils/expense-utils"

type ExpenseSummaryModel = {
  expenseItems: IExpenseItem[];
}

const ExpenseSummary = ({ expenseItems }: ExpenseSummaryModel) => {
  const getAllUniquePayeeNamesLocal = () => {
    return getAllUniquePayeeNames(expenseItems);
  }

  const calculateTotalExpensesByPayee = (payeeName: string) => {
    let totalExpense = 0;
    expenseItems.forEach((expenseItem) => {
      if (expenseItem.payeeName === payeeName) {
        totalExpense += expenseItem.price;
      }
    })
    return totalExpense;
  }

  const calculateGrandTotal = () => {
    let grandTotal = 0;
    expenseItems.forEach((expenseItem) => {
      grandTotal += expenseItem.price;
    })
    return grandTotal;
  }

  const calculatePendingAmount = (payeeName: string) => {
    const totalExpense = calculateGrandTotal();
    const totalContributionByPayee = calculateTotalExpensesByPayee(payeeName);
    const halfAmount = totalExpense / getAllUniquePayeeNamesLocal().length;

    if (totalContributionByPayee >= halfAmount) {
      return 0;
    } else {
      return (halfAmount - totalContributionByPayee);
    }
  }

  return (
    <>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "#1976D2", color: "white" }}>
          <tr>
            <th>S No.</th>
            <th>Payee Name</th>
            <th> Total Expenses {'(₹)'}</th>
          </tr>
        </thead>

        <tbody>
          {
            getAllUniquePayeeNamesLocal().map((payeeName, index) => {

              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{payeeName}</td>
                  <td>{calculateTotalExpensesByPayee(payeeName)}</td>
                </tr>
              )
            })
          }

          <tr>
            <td></td>
            <td><strong>{'(₹) '}Total Amount </strong></td>
            <td><strong>{calculateGrandTotal()}</strong></td>
          </tr>

        </tbody>
      </Table>


      <Table striped bordered hover>
        <thead style={{ backgroundColor: "#1976D2", color: "white" }}>
          <tr>
            <th>S No.</th>
            <th>Payee</th>
            <th>Pending Amount {'(₹)'}</th>
          </tr>
        </thead>

        <tbody>
          {
            getAllUniquePayeeNamesLocal().map((payeeName, index) => {

              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{`${payeeName}`}</td>
                  <td>{calculatePendingAmount(payeeName)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  )
};
export { ExpenseSummary };