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
  dataAdmissao: string; // ou Date, dependendo da sua preferência de manipulação
  ativo: boolean;

  // Campos do Departamento (Regra 3.4)
  departamentoId: number;
  departamentoNome: string;
  departamentoSigla: string;
  departamentoAtivo: boolean; // (Regra 3.2 - Aviso)
}
