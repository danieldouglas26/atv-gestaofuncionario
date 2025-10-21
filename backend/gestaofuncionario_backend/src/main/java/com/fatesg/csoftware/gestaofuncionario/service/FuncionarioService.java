package com.fatesg.csoftware.gestaofuncionario.service;

import java.util.List;

import com.fatesg.csoftware.gestaofuncionario.dto.FuncionarioRequestDTO;
import com.fatesg.csoftware.gestaofuncionario.dto.FuncionarioResponseDTO;

public interface FuncionarioService {

    List<FuncionarioResponseDTO> listarTodos(String cargo, Boolean ativo);
    FuncionarioResponseDTO buscarPorId(Long id);
    FuncionarioResponseDTO criarFuncionario(FuncionarioRequestDTO requestDTO);
    FuncionarioResponseDTO atualizarFuncionario(Long id, FuncionarioRequestDTO requestDTO);
    void inativarFuncionario(Long id);
}