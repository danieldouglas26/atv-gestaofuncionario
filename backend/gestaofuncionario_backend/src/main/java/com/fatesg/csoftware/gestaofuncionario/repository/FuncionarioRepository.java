package com.fatesg.csoftware.gestaofuncionario.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.fatesg.csoftware.gestaofuncionario.model.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>, JpaSpecificationExecutor<Funcionario> {
    Optional<Funcionario> findByEmail(String email);
    Optional<Funcionario> findByEmailAndIdNot(String email, Long id);
}