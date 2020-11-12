import { Horno3Component } from './componente/horno3/horno3.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HornoComponent } from './componente/horno/horno.component';
import { Horno2Component } from './componente/horno2/horno2.component';
import { Horno4Component } from './componente/horno4/horno4.component';


const routes: Routes = [
  { path: '', component: HornoComponent },
  {path: 'horno1', component: HornoComponent},
  {path: 'horno2', component: Horno2Component},
  {path: 'horno3', component: Horno3Component},
  {path: 'horno4', component: Horno4Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
