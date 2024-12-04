import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ProjectService } from '../project.service';
import { UserService } from '../../../../shared/services/user.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CustomModalService } from '../../../../shared/services/custom-modal.service';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project.component.html'
})
export class AddProjectComponent implements OnInit {
    @Output() closeModalEvent = new EventEmitter<string>();
    @ViewChild('addProjectModal', { static: true }) addProjectModal!: ElementRef;
    modalTitle: string = "";
    datePickerConfig: Partial<BsDatepickerConfig> = {};
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        public utilityService: UtilityService,
        public modalService: CustomModalService, 
        private datepipe: DatePipe,
        private projectService: ProjectService
    ) { }
  
    ngOnInit(): void {
        this.openModal();
       // this.datePickerConfig = this.utilityService.datePickerConfig();
    }
    select2Options = this.utilityService.select2Config();

  
    form?: FormGroup;
    formArray: any;
    projectArray: any;
    formInit() {
        this.form = this.fb.group({
          projects: this.fb.array([
                this.fb.group({
                  id : new FormControl(0),
                  projectId: new FormControl(''),     
                  projectName: new FormControl('', [Validators.required]), 
                  typeId: new FormControl('',), 
                  elementId: new FormControl('', [Validators.min(1)]),   
                  elementName: new FormControl('', [Validators.required]),  
                  measurement: new FormControl('', [Validators.required]),  
                  projectLocation: new FormControl('', [Validators.required]),   
                  contactNumber: new FormControl('', [Validators.required]),               
                  description: new FormControl(''),    
                  stateStatus : new FormControl(''),             
                  isActive: new FormControl(true)
                })
            ])
        })
      
        this.formArray = (<FormArray>this.form.get('projects')).controls;
        this.formControlChanged();
    }
    
    private subscriptions: any[] = [];
    formControlChanged() {
        this.formArray = (this.form?.get('projects') as FormArray).controls;
        if (this.subscriptions != null && this.subscriptions.length > 0) {
            this.subscriptions.forEach((item: FormGroup, i) => {
                this.subscriptions[i].unsubscribe();
            })
        }
        this.formArray.forEach((fromGroup: FormGroup, index:any) => {    
            let subscription;
            // Subscribe to valueChanges
            // subscription = fromGroup.get('baseOfPayment').valueChanges.subscribe((newValue) => {
            //     console.log(`Value changed at index ${index}`, newValue);
           // });
         
            this.subscriptions[index] = subscription;
        });
    }
  
    btnSubmit: boolean = false;
  
    submit() {
        if (this.form?.valid) {
            var projects: any = [];
            this.formArray.forEach((formGroup: FormGroup) => {          
             projects.push({ 
                    id: this.utilityService.IntTryParse(formGroup.get('id')?.value),    
                    projectId: formGroup.get('projectId')?.value,
                    projectName: formGroup.get('projectName')?.value,
                    typeId: formGroup.get('typeId')?.value,    
                    elementId: formGroup.get('elementId')?.value,
                    elementName: formGroup.get('elementName')?.value,
                    measurement: formGroup.get('measurement')?.value,                    
                    projectLocation: formGroup.get('projectLocation')?.value,  
                    contactNumber: formGroup.get('contactNumber')?.value,  
                    description: formGroup.get('description')?.value,  
                    stateStatus: formGroup.get('stateStatus')?.value,                         
                    isActive: formGroup.get('isActive')?.value
                })
            })
            //return;
            this.projectService.saveProject(projects).subscribe(response => {
                console.log("response >>>", response);
                if(response?.status){
                    this.utilityService.success(response?.msg,"Server Response")
                    this.closeModal('Save Successful');
                }
            }, error => {
                this.utilityService.fail("Something went wrong", "Server Reponse");
            })
        }
        else {
            this.utilityService.fail("Invalid form submission", "Site Response", 1000);
        }
    }
    
    logger(msg: any, options: any) {
        this.utilityService.consoleLog(msg, options);
    }
  
    User() {
        return this.userService.User();
    }
  
    openModal() {   
      this.formInit();
      this.modalTitle = "Add Projects" ;
      this.modalService.open(this.addProjectModal, "xl");  
      this.loadProjectTypes();
    }
  
  
    closeModal(reason: string) {
        this.form?.reset();
        this.modalService.service.dismissAll(reason);
        this.closeModalEvent.emit(reason);
    }
  
    addProjects(index: number): void {
        (<FormArray>this.form?.get('projects')).push(this.add(index));
        this.formControlChanged();
    }
  
    add(index: number) {
        return this.fb.group({       
          id : new FormControl(0),
          projectId: new FormControl(''),     
          projectName: new FormControl('', [Validators.required]), 
          typeId: new FormControl(''), 
          elementId: new FormControl('', [Validators.min(1)]),   
          elementName: new FormControl('', [Validators.required]),  
          measurement: new FormControl('', [Validators.required]),  
          projectLocation: new FormControl('', [Validators.required]),   
          contactNumber: new FormControl('', [Validators.required]),               
          description: new FormControl(''),    
          stateStatus : new FormControl(''),             
          isActive: new FormControl(true)
        })
    }
  
    remove(index: number) {
        if ((<FormArray>this.form?.get('projects')).length > 1) {
            (<FormArray>this.form?.get('projects')).removeAt(index);
            this.formControlChanged();
        }
        else {
            this.utilityService.fail("You can't delete last item", "Site Response");
        }
    }
  
    ddlProjectTypes: any[] = []
    loadProjectTypes() {
         this.ddlProjectTypes = [];       
         this.projectService.getProjecTypeExtension<any[]>().then((data) => {
             this.ddlProjectTypes = data;
         })
     }   
  
  
}

