import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

import { ProjectTypeService } from '../project-type.service';
import { CustomModalService } from '../../../../shared/services/custom-modal.service';
import { UserService } from '../../../../shared/services/user.service';
import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
  selector: 'app-project-type-list',
  templateUrl: './project-type-list.component.html'
})
export class ProjectTypeListComponent implements OnInit {

  modalTitle: string = "Add Project Type";
  btnTitle: string = "Submit";
  datePickerConfig: Partial<BsDatepickerConfig> = {};
  pageNumber: number = 1;
  pageSize: number = 15;
  pageConfig: any = this.userService.pageConfigInit("data_list", this.pageSize, 1, 0);

  isEntryScreen: boolean = true;
  projectTypeForm!: FormGroup;
  projectTypeList: any[] = [];
  
  constructor(public modalService: CustomModalService,
    public toastr: ToastrService, private userService: UserService, 
    private utilityService: UtilityService,   
    private fb: FormBuilder,
    public projectTypeService: ProjectTypeService
    ) { }

  ngOnInit(): void {
    this.projectTypeFormInit();
    this.getprojectTypes();
  }

  // Initialize form
  projectTypeFormInit() {
    this.projectTypeForm = this.fb.group({
      id: new FormControl(0),
      typeId: new FormControl(''),
      typeName: new FormControl('', [Validators.minLength(6)]),
      isActive: new FormControl(true),     
      stateStatus : new FormControl(''),   
      description : new FormControl(''),   
      sortingCol: new FormControl(''),
      sortType: new FormControl(''),
      pageNumber: new FormControl(this.pageNumber),
      pageSize: new FormControl(this.pageSize)
    });
  }

  // Toggle between list and form view
  showAddForm() {
    this.isEntryScreen = false;
    this.modalTitle = "Add New Project Type";
    this.btnTitle = "Submit";
    this.projectTypeForm.reset({ isActive: true });
  }
  page_Changed(event: any) {
    this.pageNumber = event; // Update the current page number
    this.projectTypeForm.get('pageNumber')?.setValue(this.pageNumber); // Set the new page number in the form
    
    // Reload the project types based on the updated page number
    this.getprojectTypes();
  }


  getprojectTypes() {
      let params = Object.assign({}, this.projectTypeForm.value);      
      params.id = params.id == null ? 0 : params.id;
      params.typeId = params.typeId == null ? '' : params.typeId;  
      this.projectTypeService.getProjectTypeAsync(params).subscribe((response:any) => {    
          this.projectTypeList = response.body;               
          let xPaginate = JSON.parse(response.headers.get('X-Pagination'));      
          this.pageConfig = this.userService.pageConfigInit("data_list", xPaginate.itemsPerPage, xPaginate.currentPage, xPaginate.totalItems);
      }, (error:any) => {
          console.log(error)
      })
  }

  submitProjectType() {
    if (this.projectTypeForm.valid) {
        let data = { ...this.projectTypeForm.value };
        data.id = data.id || 0;
        
        this.projectTypeService.saveProjectTypeAsync(data).subscribe(
            (response: any) => {
                if (response.status == true) {
                  // console.log("response >>> ", response);
                  // console.log("status >>> ", response.status);
                    this.utilityService.success("Saved Successfully", "Server Response", 1000);
                    this.getprojectTypes();
                    this.isEntryScreen = true; // Show list view after save
                } else {
                    this.utilityService.fail("Something went wrong", "Server Response", 1000);
                }
            },
            (error: any) => {
                console.error(error);
                this.utilityService.fail("Error saving data", "Server Response");
            }
        );
    } else {
        this.utilityService.fail("Invalid form", "Site Response");
    }
}

  editProjectType(id: any) {
    let params = { id: id };
    this.projectTypeService.getProjectTypeByIdAsync(params).subscribe((response: any) => {
      if (response) {
        this.isEntryScreen = false;
        this.modalTitle = "Edit Project Type";
        this.btnTitle = "Update";
        this.projectTypeForm.patchValue(response[0]); 
      }
    }, (error: any) => {
      console.log("Error retrieving project type:", error);
    });
  }

  deleteProjectType(id: number) {
    this.projectTypeService.deleteProjectTypeAsync(id).subscribe(
      (response: any) => {
        if (response.status) {
          this.utilityService.success("Deleted Successfully", "Server Response", 1000);
          this.getprojectTypes();
        } else {
          this.utilityService.fail("Failed to delete", "Server Response");
        }
      },
      (error: any) => this.utilityService.fail("Error", "Server Response")
    );
  }
}
