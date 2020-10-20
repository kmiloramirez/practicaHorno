import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HornoComponent } from './componente/horno/horno.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Horno2Component } from './componente/horno2/horno2.component';
import { MenuComponent } from './componente/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HornoComponent,
    Horno2Component,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
