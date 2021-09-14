import { useState } from "react";
import "./CashRegister.css";
import { AiOutlineGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaDiscord, FaLinkedin } from "react-icons/fa";

// variable to store input and output values
const initialValues = {
  billAmount: "",
  cash: ""
};

export default function CashRegister() {
  //state variable track changes in the values
  const [values, setValues] = useState(initialValues);
  const [check, setCheck] = useState("show");
  const [output, setOutput] = useState([]);
  const [message, setMessage] = useState("");
  const [returnChange, setReturnChange] = useState(0);
  // as
  //store input values in state variable
  function handleInputChange(event) {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: Number(value)
    });
  }

  const handleCheck = () => {
    if (values.billAmount === "") {
      setMessage("Enter the amount to proceed");
      setCheck("showMsg");
    } else {
      setCheck("hide");
    }
  };
  //demonination array
  const notes = [2000, 500, 100, 20, 10, 5, 1];

  //output array - no of notes needed
  let numberOfNotes = [0, 0, 0, 0, 0, 0, 0];

  //function to calculate no of notes to be returned of each denomination
  function calculateChange() {
    if (parseInt(values.billAmount) <= 0) {
      console.log(values.billAmount);
      setMessage("Bill Amount should be greater than zero");
      setOutput([]);
      setReturnChange(0);
      return;
    } else if (parseInt(values.billAmount) > parseInt(values.cash)) {
      setMessage("Cash should be greater then bill amount");
      setOutput([]);
      setReturnChange(0);
      return;
    } else if (values.billAmount === "" || values.cash === "") {
      setMessage("Enter all the field values");
      setOutput([]);
      setReturnChange(0);
      return;
    } else {
      var returnedAmount = values.cash - values.billAmount;
      setReturnChange(returnedAmount);
      for (let i = 0; i < notes.length; i++) {
        if (returnedAmount >= notes[i]) {
          numberOfNotes[i] = Math.trunc(returnedAmount / notes[i]);
          returnedAmount = returnedAmount - numberOfNotes[i] * notes[i];
        }
      }
      setOutput(numberOfNotes);
      setMessage("");
    }
  }
  return (
    <div className="container">
      <h1> Cash Register App</h1>
      <div className="input-group">
        <label htmlFor="billAmount">Bill Amount:</label>
        <input
          type="number"
          placeholder="Enter the bill amount"
          onChange={handleInputChange}
          name="billAmount"
        />
      </div>
      {check === "show" && (
        <button onClick={handleCheck} className="btn btn-check">
          Check
        </button>
      )}
      {check === "showMsg" && (
        <>
          <button onClick={handleCheck} className="btn btn-check">
            Check
          </button>
          <p className="error-msg">{message}</p>
        </>
      )}
      {check === "hide" ? (
        <>
          <div className="input-group">
            <label htmlFor="billAmount">Cash Given:</label>
            <input
              type="number"
              placeholder="Enter the cash given"
              name="cash"
              onChange={handleInputChange}
            />
            <button onClick={calculateChange} className="btn calculate-btn">
              Calculate Change
            </button>
          </div>
          <div className="output-container">
            <p className="output-message">{message}</p>
            <table>
              <caption>Return Change {returnChange}</caption>
              <tbody>
                <tr>
                  <th>Note</th>
                  {notes.map((note) => (
                    <td key={note}>{note}</td>
                  ))}
                </tr>
                <tr>
                  <th>No. of Notes</th>
                  {output.map((n, index) => (
                    <td key={index}>{n}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : null}

      {/*footer  */}
      <footer>
        <ul className="footer-list">
          <li>
            <a
              href="https://github.com/anshulraheja"
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/anshul-raheja/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://discord.com/channels/anshulraheja#3744"
              target="_blank"
              rel="noreferrer"
            >
              <FaDiscord />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/anshulrahejaa"
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineTwitter />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
