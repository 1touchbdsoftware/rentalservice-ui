import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ProjectService } from '../project.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CustomModalService } from '../../../../shared/services/custom-modal.service';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project.component.html'
})
export class EditProjectComponent implements OnInit {
    @Input() id: any = 0;
    @Output() closeModalEvent = new EventEmitter<string>();
    @ViewChild('editProjectModal', { static: true }) editProjectModal!: ElementRef;
    modalTitle: string = "Update Project";
    datePickerConfig: Partial<BsDatepickerConfig> = {};
    constructor(
        private fb: FormBuilder,
        public utilityService: UtilityService,
        public modalService: CustomModalService,        
        private datepipe: DatePipe,
        public projectService: ProjectService,
    ) { }
  
    ngOnInit(): void { 
      this.loadProjectTypes();
      if(this.id > 0){
        this.getProjectById(this.id);
      }
      //this.datePickerConfig = this.utilityService.datePickerConfig();
  
    }  
    select2Options = this.utilityService.select2Config();

    ddlStatus: any= this.utilityService.getDataStatus().filter(item=> item == "Pending" || item == "Approved" || item == "Rejected");
  
    getProjectById(id: any) {  
      let params = {walletConfigId : id};
      this.projectService.getProjectById(params).subscribe(response => {       
        if (response != null && response[0]?.walletConfigId > 0) {
          this.projectForEdit(response[0]);
      }
      })
    }
    btnEditProject: boolean = false;
    editProjectForm?: FormGroup; 
    projectForEdit(data: any) {
       this.btnEditProject = false;
       this.editProjectForm = this.fb.group({
        id: new FormControl(data.id),
        projectId: new FormControl({ value: data.projectId }),
        projectName: new FormControl(data.projectName, [Validators.required, Validators.min(1)]),
        typeId: new FormControl(data.typeId),
        elementId: new FormControl(data.elementId),  

        elementName: new FormControl(data.elementName),
        measurement: new FormControl(data.measurement),  
        projectLocation: new FormControl(data.projectLocation),
        contactNumber: new FormControl(data.contactNumber),  
        description: new FormControl(data.description),
        stateStatus: new FormControl(data.stateStatus),
        isActive: new FormControl(data.isActive)
       })
       this.modalService.open(this.editProjectModal, "lg"); 
     }
  
    
     updateProject() {
       if (this.editProjectForm?.valid) {
         this.btnEditProject = true;
         for (const prop in this.editProjectForm.controls) {
           this.editProjectForm.value[prop] = this.editProjectForm.controls[prop].value;
         }  
         let updateData = this.editProjectForm.value
         this.projectService.updateProject(updateData).subscribe((result) => {     
           var data = result as any;
           this.btnEditProject = false;
           if (data.status) {
             this.utilityService.success(data.msg, "Server Response");
             this.closeModal('Save Successful');
           }
           else {
             this.utilityService.fail(data.msg, "Server Response")
           }
         }, (error) => {
           this.utilityService.fail("Something went wrong", "Server Response")
           this.btnEditProject = false;
         })
       }
     }
  
     closeModal(reason: string) {
      this.modalService.service.dismissAll(reason);
      this.closeModalEvent.emit(reason);
    }
  
    ddlProjectTypes: any[] = []
    loadProjectTypes() {
         this.ddlProjectTypes= [];       
         this.projectService.getProjecTypeExtension<any[]>().then((data) => {
             this.ddlProjectTypes = data;
         })
     }
  
  
  
}

