package com.cardapio.backend.exception;

public class DescriptionUniqueException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public DescriptionUniqueException() {
        super("Descrição já cadastrada");
    }
}
