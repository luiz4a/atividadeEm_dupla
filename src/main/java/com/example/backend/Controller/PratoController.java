package com.example.backend.Controller;

import com.example.backend.Enums.Categoria;
import com.example.backend.Enums.Disponibilidade;
import com.example.backend.Model.Prato;
import com.example.backend.Service.PratoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pratos")
public class PratoController {

    @Autowired
    private PratoService pratoService;

    @PostMapping
    public ResponseEntity<Prato> cadastrarPrato(@RequestBody @Valid Prato prato) {
        Prato novoPrato = pratoService.salvarPrato(prato);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(novoPrato.getId())
                .toUri();
        return ResponseEntity.created(uri).body(novoPrato);
    }

    @GetMapping
    public ResponseEntity<List<Prato>> listarPratos(
            @RequestParam(required = false) Categoria categoria,
            @RequestParam(required = false) Disponibilidade disponibilidade) {

        List<Prato> pratos;

        if (categoria != null && disponibilidade != null) {
            pratos = pratoService.listarPorCategoriaEDisponibilidade(categoria, disponibilidade);
        } else if (categoria != null) {
            pratos = pratoService.listarPorCategoria(categoria);
        } else if (disponibilidade != null) {
            pratos = pratoService.listarPorDisponibilidade(disponibilidade);
        } else {
            pratos = pratoService.listarTodos();
        }


        return ResponseEntity.ok(pratos);
    }
}
