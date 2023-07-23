package com.example.beckendreportingpengadaan.Nota;

public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException(String message) {
        super(message);
    }

    public EntityAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}

