import './App.css';
import React,{useState} from 'react'
import axios from 'axios'


function App() {
  //state
  const [name,setName] =useState()
  const [age,setAge] =useState(0)
  const [country,setCountry] =useState()
  const [position,setPosition] =useState()
  const [salary,setSalary] =useState(0)
  //employee data store in state
  const [employeeList,setEmployeeList] = useState([])

  //add employee to database
  const addEmployee = ()=>{
    axios.post('http://localhost:3001/create',{
      name:name,
      age:age,
      country:country,
      position:position,
      salary:salary
    }).then(()=>console.log('success'))
  }

  const getEmployee =()=>{
    axios.get("http://localhost:3001/employees").then((response)=>{
      setEmployeeList(response.data)
    })
  }
  
  return (
    <>
     <div className="information">
      <form onSubmit={addEmployee}>
        <label>Name</label>
        <input type="text" name="name" onChange={(e)=>setName(e.target.value)} />
        <label>Age</label>
        <input type="text" name="age" onChange={(e)=>setAge(e.target.value)} />
        <label>Country</label>
        <input type="text" name="country" onChange={(e)=>setCountry(e.target.value)} />
        <label>Position</label>
        <input type="text" name="position" onChange={(e)=>setPosition(e.target.value)} />
        <label>Salary</label>
        <input type="text" name="salary" onChange={(e)=>setSalary(e.target.value)} />
        <button type="submit">Add Employee</button>
      </form>
      </div>

      <div className='employees'>
        <button onClick={getEmployee}>Show Employee</button>
        {employeeList.map(emp =>{
          return <p>{emp.name}</p>
        })}
      </div>
    </>
   
  );
}

export default App;
