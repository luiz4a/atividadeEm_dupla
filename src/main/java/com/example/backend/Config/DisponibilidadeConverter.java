package com.example.backend.Config;

import com.example.backend.Enums.Disponibilidade;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class DisponibilidadeConverter implements Converter<String, Disponibilidade> {

    @Override
    public Disponibilidade convert(String source) {
        try {
            return Disponibilidade.valueOf(source.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Disponibilidade inválida: " + source);
        }
    }
}
