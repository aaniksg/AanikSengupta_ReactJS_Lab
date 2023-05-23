import { Button, Modal, Form } from "react-bootstrap"
import { useState, FormEvent, useRef } from "react"
import { getAllUniquePayeeNames } from "../utils/expense-utils"
import IExpenseItem, { IExpenseCreateItem } from "../models/expense"
import { createExpenseItem } from "../services/expense"

type ExpenseCreatorModel = {
  expenseItems: IExpenseItem[];
  refreshForNewExpenseAddition: (newExpenseItem: IExpenseItem) => void;
}

const ExpenseCreator = (expenseCreatorModel: ExpenseCreatorModel) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const uniquePayeeNames = getAllUniquePayeeNames(expenseCreatorModel.expenseItems);
  const productRef = useRef<HTMLInputElement>(null);
  const payeeNameRef = useRef<HTMLSelectElement>(null);
  const expenseDateRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleAddExpense = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product = (productRef?.current?.value as string);
    const payeeName = (payeeNameRef?.current?.value as string);

    const expenseDate = (expenseDateRef?.current?.value as string);
    const price = parseFloat((priceRef?.current?.value as string));

    console.log(`Description ${product}`);
    console.log(`Payee Name ${payeeName}`);
    console.log(`Expense Date ${expenseDate}`);
    console.log(`Expense Price ${price}`);

    const newExpenseItem: IExpenseCreateItem = {

      payeeName: payeeName,
      product: product,
      price: price,
      setDate: expenseDate
    }
    const response = await createExpenseItem(newExpenseItem);
    console.log(`Response => ${JSON.stringify(response)}`);

    expenseCreatorModel.refreshForNewExpenseAddition(response);
    handleClose();
  }

  return (
    <div>
      <Button
        className="d-grid gap-2"
        variant="warning"
        onClick={handleShow}
        style={{ marginTop: "20px", marginBottom: "10px" }}
      >
        Add Expense
      </Button>

      <Modal show={show} onHide={handleClose} style={{ fontWeight: "bold" }}>

        <Modal.Header closeButton
          style={{ backgroundColor: "#1976D2", color: 'white' }}>
          <Modal.Title>
            Add New Expense Item
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form onSubmit={handleAddExpense}>

            <Form.Group className="mb-3" controlId="product">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Expense Description"
                ref={productRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="payeeName">
              <Form.Label>Payee Name</Form.Label>

              <Form.Select aria-label="Default select example" ref={payeeNameRef}>

                <option>Select Payee</option>

                {
                  uniquePayeeNames.map((payeeName) => {
                    return (
                      <option value={payeeName}>{payeeName}</option>
                    )
                  })
                }

              </Form.Select>

            </Form.Group>

            <Form.Group className="mb-3" controlId="expenseDate">
              <Form.Label>Expense Date</Form.Label>
              <Form.Control type="date" placeholder="Enter Expense Date"
                ref={expenseDateRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="expensePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Expense Price"
                ref={priceRef} />
            </Form.Group>

            <Button variant="success" type="submit">
              Add
            </Button>
            <span> </span>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>

          </Form>

        </Modal.Body>

      </Modal>
    </div>
  )
};
export { ExpenseCreator };