package com.fatesg.csoftware.gestaofuncionario.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fatesg.csoftware.gestaofuncionario.dto.FuncionarioRequestDTO;
import com.fatesg.csoftware.gestaofuncionario.dto.FuncionarioResponseDTO;
import com.fatesg.csoftware.gestaofuncionario.service.FuncionarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/funcionarios")
@Tag(name = "Funcionários", description = "API para Gestão de Funcionários")
@CrossOrigin(origins = "http://localhost:4200")
public class FuncionarioController {

        private final FuncionarioService funcionarioService;

        public FuncionarioController(FuncionarioService funcionarioService) {
                this.funcionarioService = funcionarioService;
        }

        @Operation(summary = "Lista ou filtra funcionários", description = "Lista todos os funcionários ou filtra por cargo e/ou status (ativo/inativo). Os resultados são sempre ordenados alfabeticamente pelo nome.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Lista de funcionários recuperada com sucesso")
        })
        @GetMapping
        public ResponseEntity<List<FuncionarioResponseDTO>> listar(
                        @Parameter(description = "Filtrar por cargo (ex: Analista)") @RequestParam(required = false) String cargo,

                        @Parameter(description = "Filtrar por status (true para ativos, false para inativos)") @RequestParam(required = false) Boolean ativo) {

                List<FuncionarioResponseDTO> lista = funcionarioService.listarTodos(cargo, ativo);
                return ResponseEntity.ok(lista);
        }

        @Operation(summary = "Busca funcionário por ID", description = "Retorna os dados de um funcionário específico pelo seu ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Funcionário encontrado"),
                        @ApiResponse(responseCode = "404", description = "Funcionário não encontrado", content = @Content)
        })
        @GetMapping("/{id}")
        public ResponseEntity<FuncionarioResponseDTO> buscarPorId(@PathVariable Long id) {
                FuncionarioResponseDTO dto = funcionarioService.buscarPorId(id);
                return ResponseEntity.ok(dto);
        }

        @Operation(summary = "Cadastra novo funcionário", description = "Cria um novo funcionário. Se o e-mail já existir e estiver inativo, reativa e atualiza os dados.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Funcionário criado ou reativado com sucesso"),
                        @ApiResponse(responseCode = "400", description = "Dados inválidos (validação falhou)", content = @Content),
                        @ApiResponse(responseCode = "409", description = "E-mail já cadastrado e ativo", content = @Content)
        })
        @PostMapping
        public ResponseEntity<FuncionarioResponseDTO> cadastrar(
                        @Valid @RequestBody FuncionarioRequestDTO requestDTO) {

                FuncionarioResponseDTO responseDTO = funcionarioService.criarFuncionario(requestDTO);

                URI location = ServletUriComponentsBuilder
                                .fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(responseDTO.getId())
                                .toUri();

                return ResponseEntity.created(location).body(responseDTO);
        }

        @Operation(summary = "Atualiza funcionário existente", description = "Atualiza os dados de um funcionário ativo. Não permite reduzir salário.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Funcionário atualizado com sucesso"),
                        @ApiResponse(responseCode = "400", description = "Regra de negócio violada (ex: salário reduzido, funcionário inativo) ou dados inválidos", content = @Content),
                        @ApiResponse(responseCode = "404", description = "Funcionário não encontrado", content = @Content),
                        @ApiResponse(responseCode = "409", description = "E-mail já pertence a outro funcionário", content = @Content)
        })
        @PutMapping("/{id}")
        public ResponseEntity<FuncionarioResponseDTO> atualizar(
                        @PathVariable Long id,
                        @Valid @RequestBody FuncionarioRequestDTO requestDTO) {

                FuncionarioResponseDTO responseDTO = funcionarioService.atualizarFuncionario(id, requestDTO);
                return ResponseEntity.ok(responseDTO);
        }

        @Operation(summary = "Inativa um funcionário", description = "Muda o status de um funcionário para 'ativo = false'. Não exclui o registro.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Funcionário inativado com sucesso", content = @Content),
                        @ApiResponse(responseCode = "400", description = "Funcionário já está inativo", content = @Content),
                        @ApiResponse(responseCode = "404", description = "Funcionário não encontrado", content = @Content)
        })
        @PatchMapping("/{id}/inativar")
        public ResponseEntity<Void> inativar(@PathVariable Long id) {
                funcionarioService.inativarFuncionario(id);
                return ResponseEntity.noContent().build();
        }
}