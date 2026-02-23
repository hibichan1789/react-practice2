// src/interface.ts

export type Staff = {
  id:string;
  name:string;
  age:number;
  department:Department;
}
export type Department = "IT"|"人事"|"営業";
export type DisplayDepartment = Department|"すべて";
export type DisplayStaffTableProps = {
  staffs:Staff[];
}

export type RegisterStaffProps = {
  registerStaff:Staff,
  handleRegister:(event:React.SubmitEvent)=>void;
  handleInputChange:<T extends HTMLInputElement|HTMLSelectElement>(event:React.ChangeEvent<T, T>)=>void;
}

export type DepartmentSelectListProps<U> = {
  departmentSelect:U[],
  value:U,
  handleInputChange:<T extends HTMLSelectElement>(event:React.ChangeEvent<T, T>)=>void
}