export interface FuncionarioRequest {
  nome: string;
  email: string;
  cargo: string;
  salario: number;
  dataAdmissao: string;
}

export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  salario: number;
  dataAdmissao: string;
  ativo: boolean;
}
