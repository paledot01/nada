import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../model/empleado';
import { map } from 'rxjs/operators'; // <------- agregado
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class EmpleadoService {

  url = "http://localhost:8080/empleados";

  constructor(private httpCliente: HttpClient) { 

  }

  getEmpleado(): Observable<Empleado[]>{
    return this.httpCliente.get<Empleado[]>(this.url).pipe(map(res => res));
  }

  getReportePDF(){
    return this.httpCliente.get<Empleado[]>(this.url + '/rpt_PDF');
  }

  saveEmpleado(request : any): Observable<any>{
    return this.httpCliente.post<any>('http://localhost:8080/empleados' + '', request).pipe(map(res => res));
  }

  updateEmpleado(request : any, id : String): Observable<any>{
    return this.httpCliente.put<any>('http://localhost:8080/empleados' + '/' + id, request).pipe(map(res => res));
  }

  deleteEmpleado(id: String): Observable<any>{
    return this.httpCliente.delete<any>('http://localhost:8080/empleados' + '/' + id);//.pipe(map(res => res));
  }

}
