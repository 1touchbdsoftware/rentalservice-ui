import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ProjectService } from '../project.service';
import { UserService } from '../../../../shared/services/user.service';
import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
      pageNumber: number = 1;
      pageSize: number = 15;
      pageConfig: any = this.userService.pageConfigInit("data_list", this.pageSize, 1, 0);
      datePickerConfig: Partial<BsDatepickerConfig> = {};
  
      constructor(private fb: FormBuilder,private userService: UserService,private utilityService: UtilityService, 
        private datepipe: DatePipe, private projectService: ProjectService) {
           
         }    
            
        ngOnInit(): void {
            this.formInit();
            this.loadProjectTypes();
            this.getList();                  
        }
        select2Options = this.utilityService.select2Config();
      
        pojectForm?: FormGroup;
        formInit(){
            this.pojectForm= this.fb.group({
                id : new FormControl(0),
                projectId: new FormControl(''),     
                projectName: new FormControl(''), 
                typeId: new FormControl(''), 
                elementId: new FormControl(''),   
                elementName: new FormControl(''),  
                measurement: new FormControl(''),  
                projectLocation: new FormControl(''),   
                contactNumber: new FormControl(''),
                userId: new FormControl(''),     
                description: new FormControl(''),    
                stateStatus : new FormControl(''),             
                isActive: new FormControl(true),   
                sortingCol: new FormControl(''),
                sortType: new FormControl(''),
                pageNumber: new FormControl(this.pageNumber),
                pageSize: new FormControl(this.pageSize)        
            })
    
            this.pojectForm.valueChanges.subscribe(value=>{
                console.log("pojectForm values >>>",value);
                this.getList();
            })
        }
        
        ddlProjectTypes: any[] = []
        loadProjectTypes() {
             this.ddlProjectTypes = [];       
             this.projectService.getProjecTypeExtension<any[]>().then((data) => {
                 this.ddlProjectTypes = data;
             })
         }         
 
        list: any[] =[];
        getList(){
            let params = this.pojectForm?.value;
            params.projectId = params.projectId =='null' || params.projectId == null? 0 : params.projectId;
            params.stateStatus = params.stateStatus =='null' || params.stateStatus == null? '' : params.stateStatus;
        
            this.projectService.getProjectList(params).subscribe(response=>{             
                this.list=  response.body;              
                let xPaginate = JSON.parse(response.headers.get('X-Pagination'));
                //console.log("xPaginate >>>",xPaginate);
                this.pageConfig = this.userService.pageConfigInit("data_list", xPaginate.itemsPerPage, xPaginate.currentPage, xPaginate.totalItems);
                }, error=>{
                console.log(error)
            })
        }
    
        ddlStatus: any= this.utilityService.getDataStatus().filter(item=> item == "Pending" || item == "Approved" || item == "Rejected");
    
        page_Changed(event: any){
            this.pageNumber = event;
            this.pojectForm?.get('pageNumber')?.setValue(this.pageNumber);
        }
    
        projectId: any=0;

        addShowProjectModal: boolean=false;
        openAddShowProjectModal(){
            this.addShowProjectModal = true;
        }
    
        closeAddShowProjectModal(reason: any){
            this.addShowProjectModal = false;
            if(reason =='Save Successful'){
                this.getList();
            }
        }
    
   
      
        editShowProjectModal: boolean=false;
        openEditProjectModal(id: any){
            this.projectId = id;
            this.editShowProjectModal = true;
          }
    
        closeEditProjectModal(reason: any){
            this.editShowProjectModal = false;
            this.projectId = 0;
            if(reason =='Save Successful'){
                this.getList();
            }
        }
  
      
}
