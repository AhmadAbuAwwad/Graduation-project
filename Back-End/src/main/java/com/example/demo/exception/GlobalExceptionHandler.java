package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import java.io.IOException;

@ControllerAdvice
public class GlobalExceptionHandler {
    public static final String DEFAULT_ERROR_VIEW = "error";

    @ExceptionHandler(value = {HttpClientErrorException.BadRequest.class, FailedPostingMedicine.class, MethodArgumentNotValidException.class})
    protected ResponseEntity<Object> handleBadRequest(Exception ex, WebRequest request) throws IOException {
        ex.printStackTrace();
        String message = ex.getMessage();

        ErrorDetails error = new ErrorDetails(ResponseErrors.BAD_REQUEST.getType(), ResponseErrors.BAD_REQUEST.getCode(),
                ((ServletWebRequest) request).getRequest().getRequestURI(), message);

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }


//    @ExceptionHandler(value = BadRequestException.class)
//    public ModelAndView
//    defaultErrorHandler(HttpServletRequest req, BadRequestException badRequestException) throws Exception {
//        // If the exception is annotated with @ResponseStatus rethrow it and let
//        // the framework handle it - like the OrderNotFoundException example
//        // at the start of this post.
//        // AnnotationUtils is a Spring Framework utility class.
//        if (AnnotationUtils.findAnnotation
//                (badRequestException.getClass(), ResponseStatus.class) != null)
//            throw badRequestException;
//
//        // Otherwise setup and send the user to a default error-view.
//        ModelAndView mav = new ModelAndView();
//        mav.addObject("exception", badRequestException);
//        mav.addObject("url", req.getRequestURL());
//        mav.setViewName(DEFAULT_ERROR_VIEW);
//        return mav;
//    }

//
    @ExceptionHandler(value = {MedicineNotFoundException.class})
    protected ResponseEntity<Object> MedicineNotFound(MedicineNotFoundException ex, WebRequest request) throws IOException {
        ex.printStackTrace();
        String details = ex.getMessage();
        ErrorDetails error = new
                ErrorDetails(ResponseErrors.NOT_FOUND.getType(), ResponseErrors.NOT_FOUND.getCode(),
                ((ServletWebRequest) request).getRequest().getRequestURI(), details);

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}