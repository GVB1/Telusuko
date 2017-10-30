import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CountryService {

  constructor(private http: Http) {  }

  getAllCountries(){
    return this.http.get('/api/countries')
            .map(res => res.json());
  }

  getDepartmentNameForClientPage(){
    return this.http.get('/api/departmentNameForClient')
    .map(res => res.json());
  }

  getAllClients(){
      return this.http.get('/api/clients')
            .map(res => res.json());
  }

  getClientsForaDepartment(depName){
    var url = '/api/clientsForADepartment/'+ depName;    
    return this.http.get(url)
            .map(res => res.json());
  }

  addAClient(client){
    this.http.post('/api/addclient',client)
    .subscribe();
  }



}
