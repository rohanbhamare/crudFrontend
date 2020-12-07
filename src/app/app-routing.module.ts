import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path:'', redirectTo:"users", pathMatch:'full'},
  { path:"users", component: UsersComponent},
  { path:"adduser", component: AdduserComponent},
  { path:"edituser/:id", component: EdituserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
