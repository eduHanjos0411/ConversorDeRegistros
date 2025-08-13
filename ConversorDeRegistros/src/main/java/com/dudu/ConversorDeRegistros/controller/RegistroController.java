package com.dudu.ConversorDeRegistros.controller;

import com.dudu.ConversorDeRegistros.dto.RegistroRequestDTO;
import com.dudu.ConversorDeRegistros.dto.RegistroResponseDTO;
import com.dudu.ConversorDeRegistros.entity.Registro;
import com.dudu.ConversorDeRegistros.service.RegistroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registros")
public class RegistroController {

    public final RegistroService service;

    public RegistroController(RegistroService service) {
        this.service = service;
    }

    @PostMapping("/novoRegistro")
    public ResponseEntity<RegistroResponseDTO> criarNovoRegistro(@RequestBody RegistroRequestDTO rr) {
        RegistroResponseDTO novoRegistro = service.criarNovoRegistro(rr);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoRegistro);
    }

    @GetMapping("/todosRegistros")
    public ResponseEntity<List<RegistroResponseDTO>> todosOsRegistros() {
        List<RegistroResponseDTO> todos = service.todosOsRegistros();

        return ResponseEntity.ok(todos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroResponseDTO> encontrarRegistroPorId(@PathVariable Integer id) {
        RegistroResponseDTO registroEncontrado = service.registroPorId(id);

        return ResponseEntity.ok(registroEncontrado);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<RegistroResponseDTO> atualizarRegistro(@PathVariable Integer id, @RequestBody RegistroRequestDTO rr) {
        RegistroResponseDTO registroAlterado = service.atualizarRegistro(id, rr);

        return ResponseEntity.ok(registroAlterado);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> deletarRegistroPorId(@PathVariable Integer id) {
        service.deletarRegistroPorId(id);

        return ResponseEntity.noContent().build();
    }

}
