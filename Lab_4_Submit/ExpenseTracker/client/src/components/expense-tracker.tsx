import { useEffect, useState } from "react";
import { getAllExpenseItems } from "../services/expense"
import { Container } from "react-bootstrap"
import { ExpenseItems } from "./expense-items";
import IExpenseItem from "../models/expense";
import { ExpenseSummary } from "./expense-summary";
import { ExpenseCreator } from "./expense-creator";

const ExpenseTracker = () => {
  const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);

  useEffect(() => {
    const getAllExpenseItemsInvoker = async () => {
      const response = await getAllExpenseItems();
      console.log(`Response => ${JSON.stringify(response)}`);
      setExpenseItems(response);
    }
    getAllExpenseItemsInvoker();
  }, [])

  const refreshForNewExpenseAddition = (newExpenseItem: IExpenseItem) => {
    setExpenseItems(
      [newExpenseItem, ...expenseItems]
    )
  }
  return (
    <Container>
      <h1 style={{ backgroundColor: "#1976D2", color: "white", padding: "20px" }}>
        <strong>Expense Tracker Application</strong>

        <ExpenseCreator expenseItems={expenseItems} refreshForNewExpenseAddition={refreshForNewExpenseAddition}></ExpenseCreator>

      </h1>

      <ExpenseItems expenseItems={expenseItems}></ExpenseItems>

      <ExpenseSummary expenseItems={expenseItems}></ExpenseSummary>
    </Container>

  )
};
export { ExpenseTracker };