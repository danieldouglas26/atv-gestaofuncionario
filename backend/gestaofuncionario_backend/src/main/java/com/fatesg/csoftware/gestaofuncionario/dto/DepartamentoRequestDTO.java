package com.fatesg.csoftware.gestaofuncionario.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DepartamentoRequestDTO {

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String nome;

    @NotBlank(message = "Sigla é obrigatória")
    @Size(min = 2, max = 10, message = "Sigla deve ter entre 2 e 10 caracteres")
    private String sigla;

    public DepartamentoRequestDTO() {
    }

    public DepartamentoRequestDTO(String nome, String sigla) {
        this.nome = nome;
        this.sigla = sigla;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }
}