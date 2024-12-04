import { Injectable } from "@angular/core";
import { UserService } from "../../../shared/services/user.service";
import { UtilityService } from "../../../shared/services/utility.service";
import { AreasHttpService } from "../../areas.http.service";


@Injectable({
    providedIn:'root'
})

export class ProjectService{
    constructor(private userService: UserService,
        public utilityService: UtilityService,
        private areasHttpService : AreasHttpService
    ){}   

    getProjecTypeExtension<T>(id: number = 0): Promise<T> {
        return this.areasHttpService.promise_get<T>(("/Setup" + "/GetProjecTypeExtension"),
            {
                responseType: "json",
                params: {
                    id: id                  
                }
            });
    }
    
    saveProject(data: any){
        return this.areasHttpService.observable_post<any>("/Setup" +"/SaveProject", data,{});
    }

    getProjectList(params: any){
        return this.areasHttpService.observable_get<any>("/Setup" + "/GetProjectList",{
            responseType: "json", observe: 'response', params: params
        });
    }

    getProjectById(params: any){
        return this.areasHttpService.observable_get<any>("/Setup" + "/GetProjectById",{
            responseType: "json", params: params
        });
    }

    deleteProject(data: any) {
        return this.areasHttpService.observable_post<any>("/Setup/DeleteProject", data, {});
      }
    
    // editProject(data: any) {
    //     return this.areasHttpService.observable_post<any>("/Setup/UpdateProjectType", data, {});
    //   }

      updateProject(data: any){
        return this.areasHttpService.observable_put<any>("/Setup" +"/UpdateProject",data,{
            // 'headers': { 'Content-Type': 'application/json' }
        });
    }
}