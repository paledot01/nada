import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Distrito } from '../model/distrito';

@Injectable({
  providedIn: 'root'
})


export class DistritoService {

  constructor(private httpCliente: HttpClient) { 

  }

  getDistrito(): Observable<Distrito[]>{
    return this.httpCliente.get<Distrito[]>('http://localhost:8080/distritos').pipe(map(res => res));
  }

}
