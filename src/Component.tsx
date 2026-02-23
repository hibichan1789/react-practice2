// src/Component.tsx
import { useState } from "react";
import type {
    Department,
    DisplayDepartment,
    DisplayStaffTableProps,
    RegisterStaffProps,
    DepartmentSelectListProps
} from "./interface"
import "./index.css"
const departmentSelect:Department[] = ["IT", "人事", "営業"]
const displayDepartmentSelect:DisplayDepartment[] = ["すべて", ...departmentSelect]; 
export function DisplayStaffTable({staffs}:DisplayStaffTableProps){
  const [selectedDepartment, setSelectedDepartment] = useState<DisplayDepartment>("すべて");
  function handleInputChange(event:React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>){
    setSelectedDepartment(event.target.value as DisplayDepartment);
  }
  const filteredStaffs = selectedDepartment === "すべて" ? staffs : staffs.filter(staff => staff.department === selectedDepartment);
  return(
    <div className="mt-10 p-6 border border-gray-300 rounded-2xl shadow-xl">
      <DepartmentSelectList departmentSelect={displayDepartmentSelect} value={selectedDepartment} handleInputChange={handleInputChange}/>
      <table className="w-full mt-6 border-collapse overflow-hidden">
        <thead className="bg-gray-100 border-b-2 border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">社員ID</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">名前</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">年齢</th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600">部署</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaffs.map(staff => {
            return(
              <tr key={staff.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                <td className="px-4 py-4 text-sm font-mono text-gray-800">{staff.id.slice(0, 8)}</td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-800">{staff.name}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{staff.age}</td>
                <td className="px-4 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">
                        {staff.department}
                    </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function RegisterStaff({registerStaff, handleRegister, handleInputChange}:RegisterStaffProps){
  return(
    <form
    onSubmit={(event)=>handleRegister(event)}
    className="space-y-6 max-w-md mx-auto mt-10 p-8 gb-white rounded-3xl shadow-2xl border border-gray-100"
    >
      <div>
        <label htmlFor="staff-name" className="block text-sm font-bold text-gray-700 mb-2">
            名前
        </label>
        <input
            name="name" type="text" id="staff-name"
            value={registerStaff.name} onChange={(event)=>handleInputChange(event)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 transition-all cursor-pointer"
        />
      </div>
      <div>
        <label htmlFor="staff-age" className="block text-sm font-bold text-gray-700 mb-2">
            年齢
        </label>
        <input
            name="age" type="number" id="staff-age"
            value={registerStaff.age} onChange={(event)=>handleInputChange(event)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 transition-all cursor-pointer"
        />
      </div>
      <DepartmentSelectList departmentSelect={departmentSelect} value={registerStaff.department} handleInputChange={handleInputChange<HTMLSelectElement>}/>
      <div>
        <button
            type="submit"
            className="
            w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl
            shadow-md hover:shadow-lg active:scale-99 transition-all cursor-pointer
            "
        >
            追加
        </button>
      </div>
    </form>
  );
}

function DepartmentSelectList<U extends Department|DisplayDepartment>({departmentSelect, value, handleInputChange}:DepartmentSelectListProps<U>){
    return(
    <div className="flex flex-col w-full">
        <label htmlFor="staff-department" className="block text-sm font-bold text-gray-700 mb-2">
            部署名
        </label>
        <select
            name="department" value={value} onChange={(event)=>handleInputChange(event)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-500 transition-all cursor-pointer"
        >
            {departmentSelect.map(department => <option key={department} value={department}>{department}</option>)}
        </select>
    </div>
    );
}