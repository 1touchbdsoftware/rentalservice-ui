import { Injectable } from "@angular/core";
import { UserService } from "../../../shared/services/user.service";
import { AreasHttpService } from "../../areas.http.service";
import { UtilityService } from "../../../shared/services/utility.service";


@Injectable({
    providedIn:'root'
})

export class ProjectTypeService{
    constructor(private userService: UserService,
        public utilityService: UtilityService,
        private areasHttpService : AreasHttpService
    ){}   

    saveProjectTypeAsync(data: any){
        return this.areasHttpService.observable_post<any>("/Setup" +"/SaveProjectType", data,{});
    }

    getProjectTypeAsync(params: any){
        return this.areasHttpService.observable_get<any>("/Setup" + "/GetProjectTypes",{
            responseType: "json", observe: 'response', params: params
        });
    }

    getProjectTypeByIdAsync(params: any){
        return this.areasHttpService.observable_get<any>("/Setup" + "/GetProjectTypeById",{
            responseType: "json", params: params
        });
    }

    deleteProjectTypeAsync(data: any) {
        return this.areasHttpService.observable_post<any>("/Setup/DeleteProjectType", data, {});
      }

    downloadProjectTypeExcelFile(params: any){
        return this.areasHttpService.observable_get<any>("/Setup" + "/DownloadProjectTypeExcelFile",{
            responseType: "blob", params: params
        });
    }


    editProjectTypeAsync(data: any) {
        return this.areasHttpService.observable_post<any>("/Setup/UpdateProjectType", data, {});
      }


}