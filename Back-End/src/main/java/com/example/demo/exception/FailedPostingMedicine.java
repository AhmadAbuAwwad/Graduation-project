package com.example.demo.exception;

public class FailedPostingMedicine extends RuntimeException {
    public FailedPostingMedicine(String message, Throwable cause) {
        super(message, cause);
    }

    public FailedPostingMedicine(String message) {
        super(message);
    }

    public FailedPostingMedicine(Throwable cause) {
        super(cause);
    }
}
