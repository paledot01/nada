import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Distrito } from 'src/app/model/distrito';
import { Empleado } from 'src/app/model/empleado';
import { Estado } from 'src/app/model/estado';
import { DistritoService } from 'src/app/service/distrito.service';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { EstadoService } from 'src/app/service/estado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})

export class EmpleadoComponent implements OnInit{

  listaEmp: Empleado [] = [];
  listaDis: Distrito [] = [];
  listaEst: Estado [] = [];
  formEmpleado: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  codigoUpdate: String ="";

  constructor(private empleadoServ: EmpleadoService, private distritoServ: DistritoService, private estadoServ: EstadoService, private http: HttpClient){
    
  }

  ngOnInit(): void {
    this.listarEmpleados();
    this.listarDistritos();
    this.listarEstados();

    this.formEmpleado = new FormGroup({
      codDistrito:  new FormControl(''),
	    codEstado:    new FormControl(''),
	    nombre:       new FormControl(''),
	    apellidos:    new FormControl(''),
	    dni:          new FormControl(''),
	    direccion:    new FormControl(''),
	    telefono:     new FormControl(''),
	    email:        new FormControl(''),
	    usuario:      new FormControl(''),
	    contrasena:   new FormControl('')
    });

  }

  listarEmpleados(){
    this.empleadoServ.getEmpleado().subscribe(resp => {
      if(resp){
        this.listaEmp = resp;
        console.log(this.listaEmp);
      }
    });
  }

  guardarEmpleado(){
    //this.formEmpleado.controls['status'].setValue('1');
    console.log(this.formEmpleado.value);
    this.empleadoServ.saveEmpleado(this.formEmpleado.value).subscribe(resp =>{
      if(resp){
        this.listarEmpleados();
        this.formEmpleado.reset();
      }
    });
  }

  actualizarEmpleado(){
    console.log(this.formEmpleado.value);
    this.empleadoServ.updateEmpleado(this.formEmpleado.value, this.codigoUpdate).subscribe(resp =>{
      if(resp){
        this.listarEmpleados();
        this.formEmpleado.reset();
      }
    });
  }

  eliminarEmpleado(id: any){
    this.empleadoServ.deleteEmpleado(id).subscribe(resp =>{
      if(resp){
        console.log("entro");
        this.listarEmpleados();
      }
      
      //if(resp){}
    });
  }

  newEmpleado(){
    this.isUpdate = false;
    this.formEmpleado.reset();
  }

  selectItem(item: any){
    this.isUpdate = true;
    this.codigoUpdate = item.codEmpleado;
    //this.formEmpleado.controls[''].setValue(item.distrito.codDistrito);
    this.formEmpleado.controls['codDistrito'].setValue(item.distrito.codDistrito);
    this.formEmpleado.controls['codEstado'].setValue(item.estado.codEstado);
    this.formEmpleado.controls['nombre'].setValue(item.nombre);
    this.formEmpleado.controls['apellidos'].setValue(item.apellidos);
    this.formEmpleado.controls['dni'].setValue(item.dni);
    this.formEmpleado.controls['direccion'].setValue(item.direccion);
    this.formEmpleado.controls['telefono'].setValue(item.telefono);
    this.formEmpleado.controls['email'].setValue(item.email);
    this.formEmpleado.controls['usuario'].setValue(item.usuario);
    this.formEmpleado.controls['contrasena'].setValue(item.contrasena);
  }
  
  listarDistritos(){
    this.distritoServ.getDistrito().subscribe(resp => {
      if(resp){
        this.listaDis = resp;
        console.log(this.listaDis);
      }
    });
  }

  listarEstados(){
    this.estadoServ.getEstado().subscribe(resp => {
      if(resp){
        this.listaEst = resp;
        console.log(this.listaEst);
      }
    });
  }

  crearReportePDF(): any{ // primero se realiza la consulta y segundo se crea el archivo apartir de la consulta y se descarga
    const url = "http://localhost:8080/empleados/rpt_PDF";
    this.http.get(url, {
      headers:{
        "Accept": "application/pdf"
      },
      responseType: 'blob'
      //observe: 'response' // corrompe el archivo ¿porque?
    }).subscribe({
      next: (x : any) => {
        console.log("x", x);
        var newBlob = new Blob([x], { type: "application/pdf" });        
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement("a");
        link.href = data;
        link.download = "lista_empleados.pdf";
        link.click()
      },
      error:  (err) => {
        console.log("Error", err);
      }
    });
  }

  
  crearReporteEXCEL(): any{ // primero se realiza la consulta y segundo se crea el archivo apartir de la consulta y se descarga
    const url = "http://localhost:8080/empleados/rpt_EXCEL";
    this.http.get(url, {
      headers:{
        "Accept": "application/vnd.ms-excel, application/octet-stream , text/plain , */*"
      },
      responseType: 'blob'
      //observe: 'response' // corrompe el archivo ¿porque?
    }).subscribe({
      next: (x : any) => {
        console.log("x", x);
        var newBlob = new Blob([x], { type: "application/octet-stream" });        
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement("a");
        link.href = data;
        link.download = "lista_empleados.xlsx";
        link.click()
      },
      error:  (err) => {
        console.log("Error", err);
      }
    });
  }


}
