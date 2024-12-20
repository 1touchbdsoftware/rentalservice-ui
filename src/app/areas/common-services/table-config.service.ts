import { Injectable } from "@angular/core";
import { AreasHttpService } from "../areas.http.service";
import { ApiArea } from "../../shared/app-constants";
import { UtilityService } from "../../shared/services/utility.service";
import { NotifyService } from "../../shared/services/notify-service/notify.service";
@Injectable({
    providedIn: 'root'
})

export class TableConfigService {

    private root: string = ApiArea.hrms + "/Employee/TableConfig"
    constructor(
        private areasHttpService: AreasHttpService,
        private utilityService: UtilityService,
        private notifyService: NotifyService
    ) {
    }

    getColumns(params: any) {
        return this.areasHttpService.observable_get<any>((this.root + "/GetColumns"), {
            responseType: "json", params: params
        });
    }

    downloadUploader(params: any) {
        return this.areasHttpService.observable_post<any>(this.root + "/DownloadExcelUploader", params, {
            responseType: "blob" as 'json'
        });
    }
}