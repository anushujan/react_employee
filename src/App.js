import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

function App() {
  //state
  const [name, setName] = useState();
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState();
  const [position, setPosition] = useState();
  const [salary, setSalary] = useState(0);
  //employee data store in state
  const [employeeList, setEmployeeList] = useState([]);
  const [previous, setPrevious] = useState({});

  //useEffect get employeedetail call always show in front
  useEffect(() => {
    getEmployees();
  }, []);

  //add employee to database
  const addEmployee = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        salary: salary,
      })
      .then(() => {
        setEmployeeList([
          ...employeeList,
          {
            name: name,
            age: age,
            country: country,
            position: position,
            salary: salary,
            isEditMode: false,
          },
        ]);
      });
  };

  //add employees from database
  const getEmployees = () => {
    axios.get("http://localhost:3001/employees").then((response) => {
      const result = response.data.map(function (el) {
        var o = Object.assign({}, el);
        o.isEditMode = false;
        return o;
      });
      setEmployeeList(result);
    });
  };

  //update employee to database
  const updateEmployee = (row) => {
    axios
      .put(`http://localhost:3001/update`, {
        name: row.name,
        age: row.age,
        country: row.country,
        position: row.position,
        salary: row.salary,
        id: row.id,
      })
      .then((response) => {
        console.log("update success");
      });
  };

  //delete
  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((row) => {
          return row.id !== id;
        })
      );
    });
  };

  //onChange //prvious data store
  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }

    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newemployeeList = employeeList.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setEmployeeList(newemployeeList);
  };

  //customTableCell
  const CustomTableCell = ({ row, name, onChange }) => {
    return (
      <TableCell align="left" className="tableCell">
        {row.isEditMode ? (
          <Input
            key={`input-field${row[name] + row.id}`}
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e,row)}
            className="input"
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };

  //toggle done edit done
  const onToggleDone = id => {
    setEmployeeList(() => {
      return employeeList.map((row) => {
        if (row.id === id) {
          updateEmployee(row);
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  //edit toggle is editmode
  const onToggleEditMode = id => {
    const newemployeeList = employeeList.map(row => {
      if (row.id === id) {
        return {...row, isEditMode: !row.isEditMode };
      }
      return row;
    });
    setEmployeeList(newemployeeList);
  };

  //revert toggle is editmode
  const onRevert = id => {
    const newemployeeList = employeeList.map((row) => {
      if (row.id === id) {
        return previous[id]
          ? { ...previous[id], isEditMode: !row.isEditMode }
          : { ...row, isEditMode: !row.isEditMode };
      }
      return row;
    });
    setEmployeeList(newemployeeList);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
  };
  //data entry code below
  return (
    <>
      <div className="information">
        <form onSubmit={addEmployee}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Age</label>
          <input
            type="text"
            name="age"
            onChange={(e) => setAge(e.target.value)}
          />
          <label>Country</label>
          <input
            type="text"
            name="country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <label>Position</label>
          <input
            type="text"
            name="position"
            onChange={(e) => setPosition(e.target.value)}
          />
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            onChange={(e) => setSalary(e.target.value)}
          />
          <button type="submit">Add Employee</button>
        </form>
      </div>

      {/* table code use material ui package  */}
      <div className="employees">
        <button onClick={getEmployees}>Show Employee</button>
        <Paper className="root">
          <Table className="table" aria-label="caption table">
            <caption>Lets add data</caption>
            <TableHead>
              <TableRow>
                <TableCell align="left" />
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Age</TableCell>
                <TableCell align="left">Country</TableCell>
                <TableCell align="left">Position</TableCell>
                <TableCell align="left">Salary</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employeeList.map(row => (
                <TableRow key={row.id}>
                  <TableCell className="selecteTableCell">
                    {row.isEditMode ? (
                      <>
                        <IconButton
                          aria-label="revert"
                          onClick={() => onRevert(row.id)}
                        >
                          <RevertIcon />
                        </IconButton>
                        <IconButton
                          aria-label="done"
                          onClick={() => onToggleDone(row.id)}
                        >
                          <DoneIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          aria-label="edit"
                          onClick={() => onToggleEditMode(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteEmployee(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>

                  <CustomTableCell {...{ row, name: "name", onChange}} />
                  <CustomTableCell {...{ row, name: "age", onChange }} />
                  <CustomTableCell {...{ row, name: "country", onChange }} />
                  <CustomTableCell {...{ row, name: "position", onChange }} />
                  <CustomTableCell {...{ row, name: "salary", onChange }} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </>
  );
}

export default App;
