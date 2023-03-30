package com.example.demo.controller;

import com.example.demo.controller.dto.DrugDTO;
import com.example.demo.controller.requests.DrugRequest;
import com.example.demo.models.Drug;
import com.example.demo.services.DrugService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for Drugs
 */

@RestController
@RequestMapping("api/drugs")
public class DrugController
{
    @Autowired
    private DrugService drugService;
    @Autowired
    private ModelMapper modelMapper;

    @Value("${MathpixKey}")
    private String mathpixKey1;

    //  Drugs
    private DrugDTO convertToDto(Drug drug) {
        DrugDTO drugDto = modelMapper.map(drug, DrugDTO.class);
        return drugDto;
    }

    @GetMapping("/getDrugs")
    public ResponseEntity<List<DrugDTO>> findAllUsersData(){
        return new ResponseEntity(drugService.findAllDrugsInformation().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/getDrugByName/{drugName}")
    public ResponseEntity<DrugDTO> findLoggedInUserById(@PathVariable("drugName") String drugName){
        if(drugService.findFirstDrugByDrugName(drugName).isPresent()) {
            DrugDTO drugDto = convertToDto(drugService.findFirstDrugByDrugName(drugName).get());
            return new ResponseEntity(drugDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(new DrugDTO(), HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/getDrugByImageName/{drugName}")
    public ResponseEntity<DrugDTO> findDrugByName(@PathVariable("drugName") String drugName){
        if(drugService.findFirstDrugByDrugName(drugName).isPresent()) {
            DrugDTO drugDto = convertToDto(drugService.findFirstDrugByDrugName(drugName).get());
            return new ResponseEntity(drugDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(new DrugDTO(), HttpStatus.NOT_ACCEPTABLE);
    }
    @GetMapping("/getMathPixKey")
    public ResponseEntity<String> MathPixKey(){
        return new ResponseEntity<>(mathpixKey1, HttpStatus.OK);
    }

    @PostMapping("/createDrug")
    public ResponseEntity<DrugDTO> createDrug(@RequestBody DrugRequest drugRequest){
        drugService.saveDrug(drugRequest);
        DrugDTO drugDto = convertToDto(drugService.findDrugByDrugName(drugRequest.getDrugName()).get(0));
        return new ResponseEntity(drugDto, HttpStatus.OK);
    }

    @PutMapping("/updateDrug/{drugName}")
    public ResponseEntity<DrugDTO> updateDrug(@PathVariable("drugName") String drugName, @RequestBody DrugRequest drugRequest){
        drugService.editDrug(drugName, drugRequest);
        DrugDTO drugDto = convertToDto(drugService.findDrugByDrugName(drugName).get(0));
        return new ResponseEntity(drugDto, HttpStatus.OK);
    }

    @DeleteMapping("/deleteDrug/{drugName}")
    public ResponseEntity<String> deleteDrug(@PathVariable("drugName") String drugName){
        drugService.deleteDrug(drugName);
        return new ResponseEntity(drugName.toUpperCase() + " has been deleted", HttpStatus.OK);
    }

    @DeleteMapping("/deleteDrugById/{id}")
    public ResponseEntity<String> deleteDrugById(@PathVariable("id") int id){
        drugService.deleteDrugById(id);
        return new ResponseEntity("Deleted", HttpStatus.OK);
    }
}