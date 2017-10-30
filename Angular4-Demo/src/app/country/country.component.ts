import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { NgRedux, select } from '@angular-redux/store';
import { ICountry } from '../gppadmin-redux/ICountry'; 
import {LOAD_COUNTRY,ADD_COUNTRY,EDIT_COUNTRY,DELETE_COUNTRY} from '../gppadmin-redux/actions';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {
  @select() countries;
  countryForm:FormGroup;
  showAddCountryDetails:boolean=false;
  showEditCountryDetails:boolean=false;
  
  constructor(private ngRedux:NgRedux<ICountry[]>,private countryService:CountryService,private formBuilder:FormBuilder) {
    this.countryForm=formBuilder.group({
        'countryCode':[],
        'countryName':[]
    })
  }

  ngOnInit() {
    this.countryService.getAllCountries().subscribe(countries => 
                     this.ngRedux.dispatch({type:LOAD_COUNTRY,countries}))
  }

  toggleDetails(){
    this.countryForm.reset();
    this.showAddCountryDetails=true;
    this.showEditCountryDetails=false;
  }

  hideDetails(){
    this.countryForm.reset();
    this.showAddCountryDetails=false;
    this.showEditCountryDetails=false;
  }

  addCountry(country){
    this.showEditCountryDetails=false;
    this.ngRedux.dispatch({type:ADD_COUNTRY,country});
    this.hideDetails();
  }

  editDetails(country){
   this.showEditCountryDetails=true;
   this.showAddCountryDetails=false;
   (<FormControl>this.countryForm.controls['countryCode'])
      .setValue(country.countryCode, { onlySelf: true });
    (<FormControl>this.countryForm.controls['countryName'])
      .setValue(country.countryName, { onlySelf: true }); 
  }

  editCountry(country){
    this.ngRedux.dispatch({type:EDIT_COUNTRY,country});
    this.hideDetails();
  }

  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1; 
}
