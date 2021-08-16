import { useState } from "react";

const initialValues = {
  billAmount: 0,
  cash: 0
};

export default function CashRegister() {
  const [values, setValues] = useState(initialValues);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }
  const notes = [2000, 500, 100, 20, 10, 5, 1];
  let numberOfNotes = Array(7).fill(0);
  var returnedAmount = values.cash - values.billAmount;
  function calculateChange() {
    if (parseInt(values.billAmount) <= 0 || parseInt(values.cash) <= 0) {
      console.log("Bill Amount should be greater than zero");
    } else if (parseInt(values.billAmount) > parseInt(values.cash)) {
      console.log("cash should be greater then bill amount");
    } else {
      for (let i = 0; i < notes.length; i++) {
        if (returnedAmount >= notes[i]) {
          numberOfNotes[i] = Math.trunc(returnedAmount / notes[i]);
          returnedAmount = returnedAmount - numberOfNotes[i] * notes[i];
        }
      }
      console.log(numberOfNotes);
    }
  }
  return (
    <div>
      <input
        type="number"
        placeholder="Enter the bill amount"
        onChange={handleInputChange}
        name="billAmount"
        value={values.billAmount}
      />
      <input
        type="number"
        placeholder="Enter the cash given"
        name="cash"
        value={values.cash}
        onChange={handleInputChange}
      />
      <button onClick={calculateChange}>Calculate Change</button>
    </div>
  );
}
