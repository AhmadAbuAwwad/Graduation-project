package com.example.demo.exception;

public class MedicineNotFoundException extends RuntimeException {
    public MedicineNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MedicineNotFoundException(String message) {
        super(message);
    }

    public MedicineNotFoundException(Throwable cause) {
        super(cause);
    }
}
