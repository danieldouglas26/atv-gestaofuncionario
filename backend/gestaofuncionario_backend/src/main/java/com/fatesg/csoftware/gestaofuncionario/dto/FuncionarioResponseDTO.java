package com.fatesg.csoftware.gestaofuncionario.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fatesg.csoftware.gestaofuncionario.model.Funcionario;

public class FuncionarioResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private String cargo;
    private BigDecimal salario;
    private LocalDate dataAdmissao;
    private Boolean ativo;

    private Long departamentoId;
    private String departamentoNome;
    private String departamentoSigla;
    private Boolean departamentoAtivo; 

    public FuncionarioResponseDTO(Long id, String nome, String email, String cargo, BigDecimal salario,
            LocalDate dataAdmissao, Boolean ativo, Long departamentoId, String departamentoNome,
            String departamentoSigla, Boolean departamentoAtivo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cargo = cargo;
        this.salario = salario;
        this.dataAdmissao = dataAdmissao;
        this.ativo = ativo;
        this.departamentoId = departamentoId;
        this.departamentoNome = departamentoNome;
        this.departamentoSigla = departamentoSigla;
        this.departamentoAtivo = departamentoAtivo;
    }

    public static FuncionarioResponseDTO fromEntity(Funcionario funcionario) {
        Long depId = (funcionario.getDepartamento() != null) ? funcionario.getDepartamento().getId() : null;
        String depNome = (funcionario.getDepartamento() != null) ? funcionario.getDepartamento().getNome() : null;
        String depSigla = (funcionario.getDepartamento() != null) ? funcionario.getDepartamento().getSigla() : null;
        Boolean depAtivo = (funcionario.getDepartamento() != null) ? funcionario.getDepartamento().isAtivo() : null;

        return new FuncionarioResponseDTO(
                funcionario.getId(),
                funcionario.getNome(),
                funcionario.getEmail(),
                funcionario.getCargo(),
                funcionario.getSalario(),
                funcionario.getDataAdmissao(),
                funcionario.isAtivo(),
                depId,
                depNome,
                depSigla,
                depAtivo);
    }

   
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public BigDecimal getSalario() {
        return salario;
    }

    public void setSalario(BigDecimal salario) {
        this.salario = salario;
    }

    public LocalDate getDataAdmissao() {
        return dataAdmissao;
    }

    public void setDataAdmissao(LocalDate dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

  
    public Long getDepartamentoId() {
        return departamentoId;
    }

    public void setDepartamentoId(Long departamentoId) {
        this.departamentoId = departamentoId;
    }

    public String getDepartamentoNome() {
        return departamentoNome;
    }

    public void setDepartamentoNome(String departamentoNome) {
        this.departamentoNome = departamentoNome;
    }

    public String getDepartamentoSigla() {
        return departamentoSigla;
    }

    public void setDepartamentoSigla(String departamentoSigla) {
        this.departamentoSigla = departamentoSigla;
    }

    public Boolean getDepartamentoAtivo() {
        return departamentoAtivo;
    }

    public void setDepartamentoAtivo(Boolean departamentoAtivo) {
        this.departamentoAtivo = departamentoAtivo;
    }
}