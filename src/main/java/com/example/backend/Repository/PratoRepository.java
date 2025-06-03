package com.example.backend.Repository;

import com.example.backend.Enums.Categoria;
import com.example.backend.Enums.Disponibilidade;
import com.example.backend.Model.Prato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PratoRepository extends JpaRepository<Prato, Long> {

    List<Prato> findByCategoria(Categoria categoria);

    List<Prato> findByDisponibilidade(Disponibilidade disponibilidade);

    List<Prato> findByCategoriaAndDisponibilidade(Categoria categoria, Disponibilidade disponibilidade);

    // ✅ Adicionado para verificação de nome duplicado
    Optional<Prato> findByNome(String nome);
}
