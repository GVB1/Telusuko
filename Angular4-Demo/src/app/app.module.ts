import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgRedux, NgReduxModule} from '@angular-redux/store';
import { RouterModule, Routes } from '@angular/router';

import {IAppState, INITIAL_STATE} from './gppadmin-redux/store';
import {rootReducer} from './gppadmin-redux/rootReducer';

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { CountryService} from './services/country.service';



import { DepartmentListComponent } from './department-list/department-list.component';
import { ErrorComponent } from './error/error.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClientComponent } from './client/client.component';

const appRoutes: Routes = [
  { path: '', component : DepartmentListComponent },
  { path: 'country', component: CountryComponent },  
  { path: 'client', component : ClientComponent},  
  { path: 'departmentList', component : DepartmentListComponent},
  { path : '**', component : ErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,     
    DepartmentListComponent,
    ErrorComponent,
    SidebarComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule, //including into imports
    OrderModule, // importing the sorting package here
    NgxPaginationModule,
    NgReduxModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { 
   constructor(ngRedux: NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
