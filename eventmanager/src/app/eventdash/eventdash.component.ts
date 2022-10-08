import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './eventdash.model';


@Component({
  selector: 'app-eventdash',
  templateUrl: './eventdash.component.html',
  styleUrls: ['./eventdash.component.css']
})
export class EventdashComponent implements OnInit {
  formValue !:FormGroup;
  employeeModelObj :EmployeeModel=new EmployeeModel();
  employeeData !:any;
  showAdd !:boolean;
  showUpdate !:boolean;

  constructor( private formbuilder:FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName :[''],
      lastName :[''],
      email :['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName =this.formValue.value.firstName;
    this.employeeModelObj.lastName =this.formValue.value.lastName;
    this.employeeModelObj.email =this.formValue.value.email;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went worng");

    })
  }
  
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;

    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee deleted")
      this.getAllEmployee();
    })
  }
  onEdit(row :any){
    this.showAdd=false;
    this.showUpdate=true;
    
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);

  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName =this.formValue.value.firstName;
    this.employeeModelObj.lastName =this.formValue.value.lastName;
    this.employeeModelObj.email =this.formValue.value.email;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();

    })

  }
}
