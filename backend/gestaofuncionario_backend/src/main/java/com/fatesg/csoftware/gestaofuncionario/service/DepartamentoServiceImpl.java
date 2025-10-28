package com.fatesg.csoftware.gestaofuncionario.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fatesg.csoftware.gestaofuncionario.dto.DepartamentoRequestDTO;
import com.fatesg.csoftware.gestaofuncionario.dto.DepartamentoResponseDTO;
import com.fatesg.csoftware.gestaofuncionario.exception.BusinessRuleException;
import com.fatesg.csoftware.gestaofuncionario.exception.DataConflictException;
import com.fatesg.csoftware.gestaofuncionario.exception.ResourceNotFoundException;
import com.fatesg.csoftware.gestaofuncionario.model.Departamento;
import com.fatesg.csoftware.gestaofuncionario.repository.DepartamentoRepository;

@Service
public class DepartamentoServiceImpl implements DepartamentoService {

    private final DepartamentoRepository departamentoRepository;

    public DepartamentoServiceImpl(DepartamentoRepository departamentoRepository) {
        this.departamentoRepository = departamentoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartamentoResponseDTO> listarTodos() {
        return departamentoRepository.findAll().stream()
                .map(DepartamentoResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartamentoResponseDTO> listarAtivos() {
        return departamentoRepository.findByAtivoTrue().stream()
                .map(DepartamentoResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DepartamentoResponseDTO buscarPorId(Long id) {
        Departamento dep = departamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Departamento não encontrado com ID: " + id));
        return DepartamentoResponseDTO.fromEntity(dep);
    }

    @Override
    @Transactional
    public DepartamentoResponseDTO criarDepartamento(DepartamentoRequestDTO requestDTO) {
        if (departamentoRepository.existsByNome(requestDTO.getNome())) {
            throw new DataConflictException("Nome de departamento já cadastrado: " + requestDTO.getNome());
        }

        Departamento novoDep = new Departamento();
        novoDep.setNome(requestDTO.getNome());
        novoDep.setSigla(requestDTO.getSigla());
        novoDep.setAtivo(true); // Default é true

        Departamento salvo = departamentoRepository.save(novoDep);
        return DepartamentoResponseDTO.fromEntity(salvo);
    }

    @Override
    @Transactional
    public DepartamentoResponseDTO atualizarDepartamento(Long id, DepartamentoRequestDTO requestDTO) {
        Departamento dep = departamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Departamento não encontrado com ID: " + id));

        if (departamentoRepository.existsByNomeAndIdNot(requestDTO.getNome(), id)) {
            throw new DataConflictException("Nome de departamento já cadastrado: " + requestDTO.getNome());
        }

        dep.setNome(requestDTO.getNome());
        dep.setSigla(requestDTO.getSigla());

        Departamento salvo = departamentoRepository.save(dep);
        return DepartamentoResponseDTO.fromEntity(salvo);
    }

    @Override
    @Transactional
    public void inativarDepartamento(Long id) {
        Departamento dep = departamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Departamento não encontrado com ID: " + id));

        if (!dep.isAtivo()) {
            throw new BusinessRuleException("Departamento já está inativo.");
        }

        dep.setAtivo(false);
        departamentoRepository.save(dep);
    }

}
