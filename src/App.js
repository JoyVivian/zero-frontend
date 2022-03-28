import {useState} from "react";
import './App.css';

function App() {
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[zipCode, setZipCode] = useState("");
  const[message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:5000/create_phrase", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          zipcode: zipCode,
        }),
      });

      let resJson = await res.json();
      if (res.status === 200) {
        setFirstName("");
        setLastName("");
        setZipCode("");
        setMessage(resJson);
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>First Name:
          <input type="text"
                 value={firstName}
                 onChange={(e) => setFirstName(e.target.value)}/>
        </label>
        <label>Last Name:
          <input type="text"
                 value={lastName}
          onChange={(e) => setLastName(e.target.value)}/>
        </label>
        <label>Zipcode:
          <input type="text"
                 value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}/>
        </label>
        <button type="submit">Submit</button>

        <div className="Message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;