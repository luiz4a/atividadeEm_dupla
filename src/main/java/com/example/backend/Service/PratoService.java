package com.example.backend.Service;

import com.example.backend.Repository.PratoRepository;
import com.example.backend.Enums.Categoria;
import com.example.backend.Enums.Disponibilidade;
import com.example.backend.Exception.PratoDuplicadoException;
import com.example.backend.Model.Prato;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PratoService {

    @Autowired
    private PratoRepository pratoRepository;

    public Prato salvarPrato(Prato prato) {
        if (pratoRepository.findByNome(prato.getNome()).isPresent()) {
            throw new PratoDuplicadoException("Já existe um prato cadastrado com o nome: " + prato.getNome());
        }
        return pratoRepository.save(prato);
    }

    public List<Prato> listarTodos() {
        return pratoRepository.findAll();
    }

    public List<Prato> listarPorCategoria(Categoria categoria) {
        return pratoRepository.findByCategoria(categoria);
    }

    public List<Prato> listarPorDisponibilidade(Disponibilidade disponibilidade) {
        return pratoRepository.findByDisponibilidade(disponibilidade);
    }

    public List<Prato> listarPorCategoriaEDisponibilidade(Categoria categoria, Disponibilidade disponibilidade) {
        return pratoRepository.findByCategoriaAndDisponibilidade(categoria, disponibilidade);
    }
}
