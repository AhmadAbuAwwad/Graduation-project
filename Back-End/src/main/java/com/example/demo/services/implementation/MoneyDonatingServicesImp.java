package com.example.demo.services.implementation;

import com.example.demo.controller.requests.MoneyDonatingRequest;
import com.example.demo.models.MoneyDonating;
import com.example.demo.repositories.MoneyDonatingRepository;
import com.example.demo.services.MoneyDonatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoneyDonatingServicesImp implements MoneyDonatingService {

    @Autowired
    private MoneyDonatingRepository moneyDonatingRepository;
    @Override
    public List<MoneyDonating> findAllHistory() {
        return moneyDonatingRepository.findAll();
    }

    @Override
    public Optional<MoneyDonating> findById(int id) {
        if(moneyDonatingRepository.findById(id).isPresent())
            return (moneyDonatingRepository.findById(id));
        return Optional.empty();
    }

    @Override
    public Optional<MoneyDonating> addToHistory(MoneyDonatingRequest moneyDonatingRequest) {
        MoneyDonating moneyDonating = new MoneyDonating();
        moneyDonating.setDateOfDonating(moneyDonatingRequest.getDateOfDonating());
        moneyDonating.setMoneyAmount(moneyDonatingRequest.getMoneyAmount());
        moneyDonating.setCardHolder(moneyDonatingRequest.getCardHolder());
        moneyDonating.setCardNumber(moneyDonatingRequest.getCardNumber());
        moneyDonating.setEmail(moneyDonatingRequest.getEmail());
        moneyDonating.setMoneyUnit(moneyDonatingRequest.getMoneyUnit());
        moneyDonatingRepository.save(moneyDonating);
        return moneyDonatingRepository.findTopByOrderByIdDesc();
    }

    @Override
    public List<MoneyDonating> findHistoryForUser(String email) {
        return moneyDonatingRepository.findAllByEmail(email);
    }
    @Override
    public double getHistoryCount() {
        double summation = 0;
        for (MoneyDonating moneyDonatings: moneyDonatingRepository.findAll()) {
            if(moneyDonatings.getMoneyAmount() > 0)
                if(moneyDonatings.getMoneyUnit().equals("$")) {
                    summation += moneyDonatings.getMoneyAmount() * 3.5;
                    continue;
                }
            summation += moneyDonatings.getMoneyAmount();
        }
        return summation;
    }
}
