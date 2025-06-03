package com.example.backend.Config;

import com.example.backend.Enums.Categoria;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CategoriaConverter implements Converter<String, Categoria> {

    @Override
    public Categoria convert(String source) {
        try {
            return Categoria.valueOf(source.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Categoria inválida: " + source);
        }
    }
}
