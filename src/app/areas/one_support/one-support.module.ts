import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerConfig, TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelect2Module } from 'ng-select2';
import { NgxPaginationModule } from 'ngx-pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { OneSupportComponent } from './one-support.component';
import { OneSupportRouting } from './one-support.routing';
import { getTimepickerConfig } from '../../shared/factory-service';
import { UtilityService } from '../../shared/services/utility.service';
import { ProjectTypeListComponent } from './project-type/list/project-type-list.component';
import { ProjectComponent } from './project/list/project.component';
import { AddProjectComponent } from './project/insert-update/add-project.component';
import { EditProjectComponent } from './project/insert-update/edit-project.component';


@NgModule({
    imports: [
        CommonModule,      
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        NgSelect2Module,
        NgxPaginationModule,
        TimepickerModule.forRoot(),
        TypeaheadModule.forRoot(),
        TooltipModule,
        MatExpansionModule,
        NgbDatepickerModule,
        OneSupportRouting
    ],
    declarations: [
      OneSupportComponent,
      ProjectTypeListComponent,
      ProjectComponent,
      AddProjectComponent,
      EditProjectComponent
    ],
    providers: [UtilityService, DatePipe, { provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})

export class OneSupportModule { }
