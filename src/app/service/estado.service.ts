import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Estado } from '../model/estado';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private httpCliente: HttpClient) { }

  getEstado(): Observable<Estado[]>{
    return this.httpCliente.get<Estado[]>('http://localhost:8080/estados').pipe(map(res => res));
  }

}

