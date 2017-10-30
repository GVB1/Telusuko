import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { NgRedux, select } from '@angular-redux/store';
import { LOAD_CLIENTS,EDIT_CLIENT,ADD_CLIENT } from '../gppadmin-redux/actions'; 
import { IClient } from '../gppadmin-redux/IClient';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @select() clients;

  departmentValue:string='';
  departmentDropdown:string[];
  clientForm:FormGroup;
  showAddClientsDetails:boolean = false;
  showEditClientsDetails:boolean = false;

   currentClient : IClient = {
        departmentCode : "",
        departmentName : "",
        clientCode : "",
        clientName : "",
        clientStatus: "",
        clientDescription : "",
        clientSetupComments : "",
        additionalClientInformation: ""
  }

  constructor(private countryService: CountryService,private ngRedux : NgRedux<IClient[]>,private formBuilder :FormBuilder) {
     this.clientForm = formBuilder.group({
      /*First parameter is default value, second is an array of validations*/
      'departmentName': [null, Validators.required],
      'clientName': [this.currentClient.clientName, Validators.required],
      'clientStatus': [this.currentClient.clientStatus, Validators.required],
      'clientCode':[null],
      'clientDescription':[null],
      'clientSetupComments':[],
      'additionalClientInformation':[],
      'departmentCode':[]
    });
   }

  ngOnInit() {

     this.countryService.getAllClients().subscribe(elements =>{            
      this.ngRedux.dispatch({type: LOAD_CLIENTS, clients : elements})
    });

    console.log('Before calling ClientPage');

    this.countryService.getDepartmentNameForClientPage().subscribe(hello =>{
        this.departmentDropdown = hello;
           });

   

    console.log('Client On Init called'+ this.departmentDropdown) ;
  }

   //sorting
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;


   toggleDetails()  {
    this.clientForm.reset();
    this.showAddClientsDetails = true;
    this.showEditClientsDetails = false;
    console.log('Department Value: '+ this.departmentValue);
  }

  hideDetails(){
    this.clientForm.reset();
    this.showAddClientsDetails = false;
    this.showEditClientsDetails = false;
  }

  addClient(client) {
    this.showEditClientsDetails = false;
    console.log('Inside Add Client' + client.clientName);
    // client.departmentName = this.departmentValue;    
    this.ngRedux.dispatch({type: ADD_CLIENT, client});    
    this.hideDetails();
  }

   editDetails(client){
     this.showAddClientsDetails = false;
    this.showEditClientsDetails = true;   
    console.log('Inside Edit Details');
    this.currentClient.departmentName = client.departmentName;
    this.currentClient.clientCode = client.clientCode;
    this.currentClient.clientName = client.clientName;
    this.currentClient.clientStatus = client.clientStatus;
    this.currentClient.clientDescription = client.clientDescription;

    // console.log("Index Of:" + this.departmentList.indexOf(depart));
    
    (<FormControl>this.clientForm.controls['departmentName'])
      .setValue(client.departmentName, { onlySelf: true });
    (<FormControl>this.clientForm.controls['clientCode'])
      .setValue(client.clientCode, { onlySelf: true });
    (<FormControl>this.clientForm.controls['clientName'])
      .setValue(client.clientName, { onlySelf: true });
    (<FormControl>this.clientForm.controls['clientDescription'])
      .setValue(client.clientDescription, { onlySelf: true });
    (<FormControl>this.clientForm.controls['clientStatus'])                    //.valueChanges.subscribe(clientStatus => client.clientStatus = clientStatus);
      .setValue(client.clientStatus, { onlySelf: true });

    // this.showDetails = false;
    // this.showDepartmentDetails = true;    
  }

  editClientDetails(client){
    console.log('Inside Edit Client');
      //this.countryService.addAClient(client);
      this.ngRedux.dispatch({type: EDIT_CLIENT, client}); 
      this.hideDetails();

  }

  onDepartmentNameChange(){
      this.countryService.getClientsForaDepartment(this.departmentValue).subscribe(elements =>{            
      this.ngRedux.dispatch({type: LOAD_CLIENTS, clients : elements})
    });

  }

  // ---------

  // onSubmit(){
  //   console.log('Inside OnSubmit');
  //   console.log(this.departments);
  //   this.ngRedux.dispatch({type: ADD_DEPARTMENT, department:this.model})
    
  // }

  // editDepartment(newDepartment){
  //   console.log("Inside Edit Department"+ newDepartment);
  //   // this.ngRedux.dispatch({type: EDIT_DEPARTMENT, department: newDepartment});
  // } 

}
