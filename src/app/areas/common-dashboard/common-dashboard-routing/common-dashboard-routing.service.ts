import { Injectable } from '@angular/core';
import { AreasHttpService } from '../../areas.http.service';
import { Observable } from 'rxjs';
import { ApiArea } from '../../../shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CommonDashboardRoutingService {

  constructor(
    private areasHttpService: AreasHttpService, 
  ) {
    this.actionName = "";
  }


  routePrefix = 'dashboard';
  controllerName = 'CommonDashboard';
  actionName: string;
  
  
  getCompanyHolidayAndEventsApi<T>(params: any | null): Observable<T> {
    this.actionName = 'GetCompanyHolidayAndEvents';
  
    const urlEndpoint = `${this.routePrefix}/${this.controllerName}/${this.actionName}`;
  
    return this.areasHttpService.observable_get<T>(
      `${ApiArea.hrms}/${urlEndpoint}`,
      {
        params: params,
        responseType: 'json'
      }
    );
  }




  private apiRoot: string=ApiArea.hrms+"/dashboard/CommonDashboard";
  save(params: any){
    return this.areasHttpService.observable_post<any>((this.apiRoot + "/SaveCompanyEvent"), params, {
        responseType: "json"
    });
  }



  
  getEmployeeBloodGroupsApi<T>(params: any | null): Observable<T> {
    this.actionName = 'GetBloodGroups';
  
    const urlEndpoint = `${this.routePrefix}/${this.controllerName}/${this.actionName}`;
  
    return this.areasHttpService.observable_get<T>(
      `${ApiArea.hrms}/${urlEndpoint}`,
      {
        params: params,
        responseType: 'json'
      }
    );
  }




  getEmployeeContactApi<T>(params: any | null): Observable<T> {
    this.actionName = 'GetEmployeeContact';
  
    const urlEndpoint = `${this.routePrefix}/${this.controllerName}/${this.actionName}`;
  
    return this.areasHttpService.observable_get<T>(
      `${ApiArea.hrms}/${urlEndpoint}`,
      {
        params: params,
        responseType: 'json'
      }
    );
  }

  

}
