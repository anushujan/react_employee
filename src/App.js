import './App.css';
import React,{useState} from 'react'

function App() {
  const [name,setName] =useState()
  const [age,setAge] =useState(0)
  const [country,setCountry] =useState()
  const [position,setPosition] =useState()
  const [salary,setSalary] =useState(0)
  return (
    <>
     <div className="information">
      <form onSubmit={console.log(name)}>
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
    </>
   
  );
}

export default App;
