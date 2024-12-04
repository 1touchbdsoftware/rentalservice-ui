import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneSupportComponent } from './one-support.component';
import { ProjectTypeListComponent } from './project-type/list/project-type-list.component';
import { ProjectComponent } from './project/list/project.component';
import { AuthGuard } from '../../shared/services/auth.guard';

const routes: Routes = [
    {
        path: "",
        component: OneSupportComponent,
        children: [           
            { path: "project-type", component: ProjectTypeListComponent, data: { component: "ProjectTypeListComponent" }, canActivate: [AuthGuard] },
            { path: "project", component: ProjectComponent, data: { component: "ProjectComponent" }, canActivate: [AuthGuard] },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OneSupportRouting { }