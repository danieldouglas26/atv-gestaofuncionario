package com.fatesg.csoftware.gestaofuncionario.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fatesg.csoftware.gestaofuncionario.dto.FuncionarioRequestDTO;
import com.fatesg.csoftware.gestaofuncionario.dto.FuncionarioResponseDTO;
import com.fatesg.csoftware.gestaofuncionario.exception.BusinessRuleException;
import com.fatesg.csoftware.gestaofuncionario.exception.EmailConflictException;
import com.fatesg.csoftware.gestaofuncionario.exception.ResourceNotFoundException;
import com.fatesg.csoftware.gestaofuncionario.model.Funcionario;
import com.fatesg.csoftware.gestaofuncionario.repository.FuncionarioRepository;

import jakarta.persistence.criteria.Predicate;

@Service
public class FuncionarioServiceImpl implements FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioServiceImpl(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<FuncionarioResponseDTO> listarTodos(String cargo, Boolean ativo) {

        Sort sort = Sort.by(Sort.Direction.ASC, "nome");

        Specification<Funcionario> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (cargo != null && !cargo.trim().isEmpty()) {
                predicates.add(cb.equal(root.get("cargo"), cargo));
            }
            if (ativo != null) {
                predicates.add(cb.equal(root.get("ativo"), ativo));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        List<Funcionario> funcionarios = funcionarioRepository.findAll(spec, sort);

        return funcionarios.stream()
                .map(FuncionarioResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public FuncionarioResponseDTO buscarPorId(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado com ID: " + id));

        return FuncionarioResponseDTO.fromEntity(funcionario);
    }

    @Override
    @Transactional
    public FuncionarioResponseDTO criarFuncionario(FuncionarioRequestDTO requestDTO) {
        Optional<Funcionario> emailExistente = funcionarioRepository.findByEmail(requestDTO.getEmail());

        if (emailExistente.isPresent()) {
            Funcionario existente = emailExistente.get();

            if (existente.isAtivo()) {
                throw new EmailConflictException("E-mail já cadastrado e ativo no sistema.");
            } else {

                return reativarEAtualizarFuncionario(existente, requestDTO);
            }
        }

        Funcionario novoFuncionario = new Funcionario();
        novoFuncionario.setNome(requestDTO.getNome());
        novoFuncionario.setEmail(requestDTO.getEmail());
        novoFuncionario.setCargo(requestDTO.getCargo());
        novoFuncionario.setSalario(requestDTO.getSalario());
        novoFuncionario.setDataAdmissao(requestDTO.getDataAdmissao());
        novoFuncionario.setAtivo(true);

        Funcionario salvo = funcionarioRepository.save(novoFuncionario);
        return FuncionarioResponseDTO.fromEntity(salvo);
    }

    private FuncionarioResponseDTO reativarEAtualizarFuncionario(Funcionario funcionario, FuncionarioRequestDTO dto) {
        funcionario.setNome(dto.getNome());
        funcionario.setCargo(dto.getCargo());
        funcionario.setSalario(dto.getSalario());
        funcionario.setDataAdmissao(dto.getDataAdmissao());
        funcionario.setAtivo(true);

        Funcionario salvo = funcionarioRepository.save(funcionario);
        return FuncionarioResponseDTO.fromEntity(salvo);
    }

    @Override
    @Transactional
    public FuncionarioResponseDTO atualizarFuncionario(Long id, FuncionarioRequestDTO requestDTO) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado com ID: " + id));

        if (!funcionario.isAtivo()) {
            throw new BusinessRuleException("Somente funcionários ativos podem ser editados.");
        }

        if (requestDTO.getSalario().compareTo(funcionario.getSalario()) < 0) {
            throw new BusinessRuleException(
                    "O salário não pode ser reduzido (valor atual: " + funcionario.getSalario() + ").");
        }

        Optional<Funcionario> emailExistente = funcionarioRepository.findByEmailAndIdNot(requestDTO.getEmail(), id);
        if (emailExistente.isPresent()) {
            throw new EmailConflictException("E-mail já pertence a outro funcionário cadastrado.");
        }

        funcionario.setNome(requestDTO.getNome());
        funcionario.setEmail(requestDTO.getEmail());
        funcionario.setCargo(requestDTO.getCargo());
        funcionario.setSalario(requestDTO.getSalario());
        funcionario.setDataAdmissao(requestDTO.getDataAdmissao());

        Funcionario salvo = funcionarioRepository.save(funcionario);
        return FuncionarioResponseDTO.fromEntity(salvo);
    }

    @Override
    @Transactional
    public void inativarFuncionario(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado com ID: " + id));

        if (!funcionario.isAtivo()) {
            throw new BusinessRuleException("Funcionário já está inativo.");
        }

        funcionario.setAtivo(false);
        funcionarioRepository.save(funcionario);
    }
}