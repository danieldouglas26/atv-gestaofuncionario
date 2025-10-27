package com.fatesg.csoftware.gestaofuncionario.service;

import java.util.List;

import com.fatesg.csoftware.gestaofuncionario.dto.DepartamentoRequestDTO;
import com.fatesg.csoftware.gestaofuncionario.dto.DepartamentoResponseDTO;

public interface DepartamentoService {

    List<DepartamentoResponseDTO> listarTodos();

    List<DepartamentoResponseDTO> listarAtivos();

    DepartamentoResponseDTO buscarPorId(Long id);

    DepartamentoResponseDTO criarDepartamento(DepartamentoRequestDTO requestDTO);

    DepartamentoResponseDTO atualizarDepartamento(Long id, DepartamentoRequestDTO requestDTO);

    void inativarDepartamento(Long id);
}