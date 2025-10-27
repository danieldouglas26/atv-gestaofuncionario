import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento.model';

@Injectable({
  providedIn: 'root'
})

export class DepartamentoService {

  private baseUrl = 'http://localhost:8080/api/departamentos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.baseUrl);
  }

  listarAtivos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.baseUrl}/ativos`);
  }

  buscarPorId(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.baseUrl}/${id}`);
  }

  criar(departamento: { nome: string; sigla: string }): Observable<Departamento> {
    return this.http.post<Departamento>(this.baseUrl, departamento);
  }

  atualizar(id: number, departamento: { nome: string; sigla: string }): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.baseUrl}/${id}`, departamento);
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/inativar`, {});
  }
}
