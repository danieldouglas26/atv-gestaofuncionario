import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario, FuncionarioRequest } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/funcionarios';

  listar(cargo?: string, ativo?: boolean): Observable<Funcionario[]> {
    let params = new HttpParams();

    if (cargo) {
      params = params.set('cargo', cargo);
    }
    if (ativo !== undefined && ativo !== null) {
      params = params.set('ativo', ativo.toString());
    }

    return this.http.get<Funcionario[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  criar(request: FuncionarioRequest): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, request);
  }

  atualizar(id: number, request: FuncionarioRequest): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, request);
  }

  inativar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/inativar`, {});
  }
}
