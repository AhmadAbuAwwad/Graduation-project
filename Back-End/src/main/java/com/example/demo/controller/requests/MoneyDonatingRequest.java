package com.example.demo.controller.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MoneyDonatingRequest {

    private int moneyAmount;
    private Date dateOfDonating;
    private String email;
    private long cardNumber;
    private String cardHolder;
    private String moneyUnit;
}

