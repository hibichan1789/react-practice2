// src/App.tsx
import { useState } from "react";
import { v4 as uuid } from "uuid";
import type { Staff, Department } from "./interface";
import { RegisterStaff, DisplayStaffTable } from "./Component";
import "./index.css";
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="sticky  top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-xl font-black text-blue-600">社員管理アプリ</h1>
        </div>
      </header>
      <main className="flex-grow max-w-5xl mx-auto w-full p-6 space-y-12">
        <RegisterStaff registerStaff={registerStaff} handleRegister={handleRegister} handleInputChange={handleInputChange}/>
        <DisplayStaffTable staffs={currentStaffs}/>
      </main>
      <footer className="bg-white border-t border-gray-100 py-4 mt-auto">
        <p className="text-center text-gray-600 text-sm italic">&copy; hibichan1789</p>
      </footer>
    </div>
  );
}