package com.fatesg.csoftware.gestaofuncionario.controller;

import java.util.List;
 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fatesg.csoftware.gestaofuncionario.dto.DepartamentoRequestDTO;
import com.fatesg.csoftware.gestaofuncionario.dto.DepartamentoResponseDTO;
import com.fatesg.csoftware.gestaofuncionario.service.DepartamentoService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/departamentos")
@Tag(name = "Departamentos", description = "Endpoints para Gestão de Departamentos")
@CrossOrigin(origins = "*") 
public class DepartamentoController {

    private final DepartamentoService departamentoService;

    public DepartamentoController(DepartamentoService departamentoService) {
        this.departamentoService = departamentoService;
    }

    @GetMapping
    public ResponseEntity<List<DepartamentoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(departamentoService.listarTodos());
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<DepartamentoResponseDTO>> listarAtivos() {
        return ResponseEntity.ok(departamentoService.listarAtivos());
    }

    @PostMapping
    public ResponseEntity<DepartamentoResponseDTO> criarDepartamento(
            @Valid @RequestBody DepartamentoRequestDTO requestDTO) {
        DepartamentoResponseDTO novoDep = departamentoService.criarDepartamento(requestDTO);
        return new ResponseEntity<>(novoDep, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartamentoResponseDTO> atualizarDepartamento(
            @PathVariable Long id,
            @Valid @RequestBody DepartamentoRequestDTO requestDTO) {
        DepartamentoResponseDTO depAtualizado = departamentoService.atualizarDepartamento(id, requestDTO);
        return ResponseEntity.ok(depAtualizado);
    }

    @PatchMapping("/{id}/inativar")
    @ResponseStatus(HttpStatus.NO_CONTENT) 
    public void inativarDepartamento(@PathVariable Long id) {
        departamentoService.inativarDepartamento(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartamentoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(departamentoService.buscarPorId(id));
    }
}
