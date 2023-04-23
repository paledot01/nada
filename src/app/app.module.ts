import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { HttpClientModule } from '@angular/common/http' // <----- agregado
import { ReactiveFormsModule } from '@angular/forms' // <------- agregado


@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // <------- agregado
    ReactiveFormsModule // <------- agregado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
