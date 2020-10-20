import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HornoComponent } from './componente/horno/horno.component';
import { Horno2Component } from './componente/horno2/horno2.component';


const routes: Routes = [
  { path: '', component: HornoComponent },
  {path: 'horno1', component: HornoComponent},
  {path: 'horno2', component: Horno2Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
