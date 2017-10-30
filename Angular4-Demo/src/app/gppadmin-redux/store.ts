
import {IDepartment} from './IDepartment';
import {ICountry} from './ICountry';
import {IClient} from './IClient';

import {ADD_DEPARTMENT, EDIT_DEPARTMENT} from './actions';

import {LOAD_CLIENTS,ADD_CLIENT,EDIT_CLIENT} from './actions';


export interface IAppState{    
    departments : IDepartment[];
    countries : ICountry[];
    clients : IClient[];

}

export const INITIAL_STATE: IAppState = {  
    
    departments :[{country:'France',departmentCode:'US1',departmentName:'US1'},
                      {country:'France',departmentCode:'US2',departmentName:'US2'},
                      {country:'France',departmentCode:'US3',departmentName:'US3'},
                      {country:'France',departmentCode:'US4',departmentName:'US4'},
                      {country:'France',departmentCode:'US5',departmentName:'US5'},
                      {country:'France',departmentCode:'US6',departmentName:'US6'},
                      {country:'France',departmentCode:'US7',departmentName:'US7'}
                      ],
    countries : [],
    clients : []
}
