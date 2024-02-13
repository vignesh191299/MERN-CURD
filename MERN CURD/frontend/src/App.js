// App.js
import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  console.log(name);
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");

  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const clearForm = () => {
    setName("");
    setAge(0);
    setCountry("");
    setPosition("");
    setWage(0);
    setNewWage(0);
    setSelectedEmployee(null);
  };
  const addEmployee = async() => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      getEmployees();
      clearForm();
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
    });
  };

const updateEmployeeWage = (employee) => {
    setSelectedEmployee(employee);
    setName(employee.name);
    setAge(employee.age);
    setCountry(employee.country);
    setPosition(employee.position);
    setWage(employee.wage);
  };

  const submitUpdatedEmployee = () => {
    Axios.put(`http://localhost:3001/update/${selectedEmployee._id}`, {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: newWage,
    }).then((response) => {
      if (response.status === 200) {
        getEmployees();
        clearForm();
      } else {
        console.error("Error updating employee");
      }
    }).catch((error) => {
      console.error("Error updating employee:", error);
    });
  };

 

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
      getEmployees();
    });
  };

  useEffect(() => {
    getEmployees()
  }, []);

  return (
    <div className="App">
      <div className="form-container">
        {!selectedEmployee &&
          <label style={{fontSize:"18px",fontWeight:600}}>Add Employee:</label>
        }
        {selectedEmployee &&
          <label style={{fontSize:"18px",fontWeight:600}}>Edit Employee:</label>
        }
        <label>Name:</label>
        <input
          type="text"
          className="input-long"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          value={position}
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          value={wage}
          className="input-long"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
         {selectedEmployee && (
          <button onClick={submitUpdatedEmployee}>Update Employee</button>
        )}
        {!selectedEmployee && (
          <button onClick={addEmployee}>Add Employee</button>
        )}
      </div>
      <div className="employees">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Country</th>
              <th>Position</th>
              <th>Wage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((val, key) => (
            // console.log(val),
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.age}</td>
                <td>{val.country}</td>
                <td>{val.position}</td>
                <td>{val.wage}</td>
                <td>
                  <button onClick={() => updateEmployeeWage(val)}>
                    Update
                  </button>
                  <button onClick={() => deleteEmployee(val._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
