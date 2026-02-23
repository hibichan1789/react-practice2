import { useState } from "react";
import { v4 as uuid } from "uuid";

type Staff = {
  id:string;
  name:string;
  age:number;
  department:Department;
}
type Department = "IT"|"人事"|"営業";
type DisplayDepartment = Department|"すべて";
type DisplayStaffTableProps = {
  staffs:Staff[];
}
const departmentSelect:Department[] = ["IT", "人事", "営業"]


const displayDepartmentSelect:DisplayDepartment[] = ["すべて", ...departmentSelect]; 
function DisplayStaffTable({staffs}:DisplayStaffTableProps){
  const [selectedDepartment, setSelectedDepartment] = useState<DisplayDepartment>("すべて");
  function handleInputChange(event:React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>){
    setSelectedDepartment(event.target.value as DisplayDepartment);
  }
  const filteredStaffs = selectedDepartment === "すべて" ? staffs : staffs.filter(staff => staff.department === selectedDepartment);
  return(
    <div>
      <DepartmentSelectList departmentSelect={displayDepartmentSelect} value={selectedDepartment} handleInputChange={handleInputChange}/>
      <table>
        <thead>
          <tr>
            <th>社員ID</th><th>名前</th><th>年齢</th><th>部署</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaffs.map(staff => {
            return(
              <tr key={staff.id}>
                <td>{staff.id}</td><td>{staff.name}</td><td>{staff.age}</td><td>{staff.department}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type RegisterStaffProps = {
  registerStaff:Staff,
  handleRegister:(event:React.SubmitEvent)=>void;
  handleInputChange:<T extends HTMLInputElement|HTMLSelectElement>(event:React.ChangeEvent<T, T>)=>void;
}
function RegisterStaff({registerStaff, handleRegister, handleInputChange}:RegisterStaffProps){
  return(
    <form onSubmit={(event)=>handleRegister(event)}>
      <div>
        <label htmlFor="staff-name">名前: </label>
        <input name="name" type="text" id="staff-name" value={registerStaff.name} onChange={(event)=>handleInputChange(event)}/>
      </div>
      <div>
        <label htmlFor="staff-age">年齢: </label>
        <input name="age" type="number" id="staff-age" value={registerStaff.age} onChange={(event)=>handleInputChange(event)}/>
      </div>
      <DepartmentSelectList departmentSelect={departmentSelect} value={registerStaff.department} handleInputChange={handleInputChange<HTMLSelectElement>}/>
      <div>
        <button type="submit">追加</button>
      </div>
    </form>
  );
}
type DepartmentSelectListProps<U> = {
  departmentSelect:U[],
  value:U,
  handleInputChange:<T extends HTMLSelectElement>(event:React.ChangeEvent<T, T>)=>void
}
function DepartmentSelectList<U extends Department|DisplayDepartment>({departmentSelect, value, handleInputChange}:DepartmentSelectListProps<U>){
  return(
    <div>
      <label htmlFor="staff-department">
          部署名: 
          <select name="department" value={value} onChange={(event)=>handleInputChange(event)}>
            {departmentSelect.map(department => <option key={department} value={department}>{department}</option>)}
          </select>
        </label>
    </div>
  );
}
const initialStaffs:Staff[] = [
  {id:uuid(), name:"sample1", age:22, department:"IT"},
  {id:uuid(), name:"sample2", age:30, department:"IT"}
]
const initialRegisterStaff:Staff = {id:"", name:"", age:25, department:"IT"}
export default function StaffApp(){
  const [currentStaffs, setCurrentStaffs] = useState<Staff[]>(initialStaffs);
  const [registerStaff, setRegisterStaff] = useState<Staff>(initialRegisterStaff);
  function handleRegister(event:React.SubmitEvent){
    event.preventDefault();
    if(registerStaff.name.trim() === ""){
      return;
    }
    setCurrentStaffs([...currentStaffs, {...registerStaff, id:uuid(), name:registerStaff.name.trim()}]);
    setRegisterStaff(initialRegisterStaff)
  }
  function handleInputChange<T extends HTMLInputElement|HTMLSelectElement>(event:React.ChangeEvent<T,T>){
    const {name, value} = event.target;
    if(name === "name"){
      const newStaff:Staff = {...registerStaff, name:value};
      setRegisterStaff(newStaff);
      return;
    }
    if(name === "age"){
      const newStaff:Staff = {...registerStaff, age:Number(value)};
      setRegisterStaff(newStaff);
      return;
    }
    if(name === "department"){
      const newStaff:Staff = {...registerStaff, department:value as Department};
      setRegisterStaff(newStaff);
      return;
    }
  }
  return(
    <>
      <RegisterStaff registerStaff={registerStaff} handleRegister={handleRegister} handleInputChange={handleInputChange}/>
      <DisplayStaffTable staffs={currentStaffs}/>
    </>
  );
}