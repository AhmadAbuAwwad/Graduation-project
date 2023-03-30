package com.example.demo.services;

import com.example.demo.controller.requests.DrugRequest;
import com.example.demo.controller.requests.MoneyDonatingRequest;
import com.example.demo.models.Drug;
import com.example.demo.models.MoneyDonating;

import java.util.List;
import java.util.Optional;

public interface MoneyDonatingService {

    List<MoneyDonating> findAllHistory();

    Optional<MoneyDonating> findById(int id);


    Optional<MoneyDonating> addToHistory(MoneyDonatingRequest moneyDonatingRequest);
    List<MoneyDonating> findHistoryForUser(String email);

    double getHistoryCount();
}






