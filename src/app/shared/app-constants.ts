
import * as CryptoJS from 'crypto-js';

import { appSettings } from './appsettings';
export class AppConstants {
    public static app_environment = "Local"; // UAT // Public // Local

    public static authority = "http://localhost:5000";
    public static clientId = "RecomAngularWeb";
    public static clientRoot = "http://localhost:4200";

    public static key = CryptoJS.enc.Utf8.parse(appSettings.key);
    public static iv = CryptoJS.enc.Utf8.parse(appSettings.key);

    public static True = "true";
    public static False = "false";
}

export class ApiArea {
    public static controlpanel = "/controlpanel";
    public static hrms = "/hrms";
    public static payroll = "/payroll";
    public static webservice = "/ws";
}

export class ApiController {
    // Area of ControlPanel
    public static administration = "/administration";
    public static ApiBase = "/apiBase";
    public static usermanagment = "/usermanagement";

    // Area of Web Service
    public static hrService = "/hrservice"
    public static controlPanelService = "/controlPanelService"
    public static payrollService = "/payrollService"

    // Area of HRM
    public static hr = "/hr"
    public static employees = "/employees";
    public static attendance = "/attendance"
    public static leave = "/leave";
    public static setup = "/setup"
    public static workshift = "/workshift"
    public static separation = "/separation"
    public static hr_report = "/hrReport"
    public static clientHR = "/clientHR"
    public static LateConsideration = "/LateConsideration";
    public static googleAuth = "/GoogleAuthenticator";

}

export class ApiUrl {
    public static Local = "http://localhost:5000/api";    
    public static ITX = "https://itxbd.myrecombd.com:9623/api"; 
 
    public static Wounderman = "https://appsapi.wtmsc.com/api";

    public static UAT = "http://192.168.0.251:9094/api";


}

export class ImageUrl {
    //public static Hris = "https://hris.myrecombd.com:3339/";
    public static Local = "http://localhost:5010/";
    public static PWC = "https://appsimages.wtmsc.com/";
   

    public static UAT = "http://192.168.0.251:5010/";
}