import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';
import { IDepartment } from '../gppadmin-redux/IDepartment';
import { ADD_DEPARTMENT, EDIT_DEPARTMENT } from '../gppadmin-redux/actions'; 



@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit { 

   @select() departments;
   

  model: IDepartment = {
    country: "",
    departmentCode : "",
    departmentName: ""   
  }

  currentDepartment : IDepartment = {
    country: "",
    departmentCode : "",
    departmentName: ""   
  }

  constructor(private ngRedux : NgRedux<IDepartment[]>,private formBuilder :FormBuilder) { 
    this.departmentForm = formBuilder.group({
      /*First parameter is default value, second is an array of validations*/
      'country': [null, Validators.required],
      'departmentCode': [this.currentDepartment.departmentCode, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(7)])],
      'departmentName': [this.currentDepartment.departmentName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(12)])]
    });
  }

  ngOnInit() {
  }

  





  // Datatable

  //sorting
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;



  // Edit Department Form
  departmentForm:FormGroup;
  showDetails:boolean = false;
  showDepartmentDetails = false;

  departmentCodeError = 'Department Code length should be between 3 to 7 characters';
  departmentNameError = 'Department Name length should be between 3 to 12 characters';

  toggleDetails()  {
    this.departmentForm.reset();
    this.showDetails = true;
    this.showDepartmentDetails = false;
  }

  hideDetails(){
    this.departmentForm.reset();
    this.showDetails = false;
    this.showDepartmentDetails = false;
  }

  addDepartment(department) {
    this.showDepartmentDetails = false;
    console.log('Inside Add Department' + department.name);
    this.ngRedux.dispatch({type: ADD_DEPARTMENT, department});    
    this.hideDetails();
  }

   editDetails(depart){
     this.showDetails = false;
    this.showDepartmentDetails = true;   
    console.log('Inside Edit Details');

    this.currentDepartment.departmentCode = depart.departmentCode;
    this.currentDepartment.departmentName = depart.departmentName;
    // console.log("Index Of:" + this.departmentList.indexOf(depart));
    
    (<FormControl>this.departmentForm.controls['country'])
      .setValue(depart.country, { onlySelf: true });
    (<FormControl>this.departmentForm.controls['departmentCode'])
      .setValue(depart.departmentCode, { onlySelf: true });
    (<FormControl>this.departmentForm.controls['departmentName'])
      .setValue(depart.departmentName, { onlySelf: true });

    // this.showDetails = false;
    // this.showDepartmentDetails = true;    
  }

  editDepartmentDetails(department){
    console.log('Inside Edit Department');
      this.ngRedux.dispatch({type: EDIT_DEPARTMENT, department}); 
      this.hideDetails();

  }


  // ---------

  onSubmit(){
    console.log('Inside OnSubmit');
    console.log(this.departments);
    this.ngRedux.dispatch({type: ADD_DEPARTMENT, department:this.model})
    
  }

  editDepartment(newDepartment){
    console.log("Inside Edit Department"+ newDepartment);
    // this.ngRedux.dispatch({type: EDIT_DEPARTMENT, department: newDepartment});
  } 

}




