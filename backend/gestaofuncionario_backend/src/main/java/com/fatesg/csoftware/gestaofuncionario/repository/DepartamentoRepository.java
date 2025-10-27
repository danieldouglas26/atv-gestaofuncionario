package com.fatesg.csoftware.gestaofuncionario.repository;

import java.util.List;
import java.util.Optional; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fatesg.csoftware.gestaofuncionario.model.Departamento;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {

    boolean existsByNome(String nome);

    boolean existsByNomeAndIdNot(String nome, Long id);

    List<Departamento> findByAtivoTrue();

    Optional<Departamento> findByNome(String nome);

}
