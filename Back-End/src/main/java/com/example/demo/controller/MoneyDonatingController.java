package com.example.demo.controller;

import com.example.demo.controller.dto.MoneyDonatingDTO;
import com.example.demo.controller.requests.MoneyDonatingRequest;
import com.example.demo.models.MoneyDonating;
import com.example.demo.services.MoneyDonatingService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Controller for Drugs
 */

@RestController
@RequestMapping("api/moneyDonating")
public class MoneyDonatingController
{
    @Autowired
    private MoneyDonatingService moneyDonatingService;
    @Autowired
    private ModelMapper modelMapper;

    //  Drugs
    private MoneyDonatingDTO convertToDto(MoneyDonating moneyDonating) {
        MoneyDonatingDTO moneyDonatingDTO = modelMapper.map(moneyDonating, MoneyDonatingDTO.class);
        return moneyDonatingDTO;
    }

    @GetMapping("/getCounterOfDonation")
    public ResponseEntity<Double> getCounterOfDonation() {
        return new ResponseEntity(moneyDonatingService.getHistoryCount(), HttpStatus.OK);
    }
    @GetMapping("/getAllHistory")
    public ResponseEntity<List<MoneyDonatingDTO>> findAllUsersData(){
        if(moneyDonatingService.findAllHistory().isEmpty())
            return new ResponseEntity<>(List.of(), HttpStatus.NOT_ACCEPTABLE);
        return new ResponseEntity<>(moneyDonatingService.findAllHistory().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/getHistoryForUser/{email}")
    public ResponseEntity<List<MoneyDonatingDTO>> getHistoryForUser(@PathVariable("email") String email){
        if(moneyDonatingService.findHistoryForUser(email).isEmpty())
            return new ResponseEntity<>(List.of(), HttpStatus.NOT_ACCEPTABLE);
        return new ResponseEntity<>(moneyDonatingService.findHistoryForUser(email).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @PostMapping("/donateMoney")
    public ResponseEntity<MoneyDonatingDTO> createDrug(@RequestBody MoneyDonatingRequest moneyDonatingRequest){
        Optional<MoneyDonating> moneyDonatingOptional = moneyDonatingService.addToHistory(moneyDonatingRequest);
        if(moneyDonatingOptional.isPresent())
            return new ResponseEntity(convertToDto(moneyDonatingOptional.get()), HttpStatus.OK);
        return new ResponseEntity(Optional.empty(), HttpStatus.CONFLICT);
    }

}