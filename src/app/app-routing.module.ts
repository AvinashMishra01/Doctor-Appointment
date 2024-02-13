import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  {path:'', redirectTo:'/home' ,pathMatch:'full'},
  {path:'home', component: HomeComponent},
 { path:'appointment/:id', component: AppointmentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
