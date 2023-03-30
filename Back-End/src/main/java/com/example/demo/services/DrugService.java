package com.example.demo.services;

import com.example.demo.controller.requests.DrugRequest;
import com.example.demo.models.Drug;

import java.util.List;
import java.util.Optional;

public interface DrugService {

    List<Drug> findAllDrugsInformation();

    List<Drug> findDrugByDrugName(String drugName);

    Optional<Drug> findFirstDrugByDrugName(String drugName);

    Optional<Drug> saveDrug(DrugRequest drugInfo);

    Optional<Drug> editDrug(String drugName, DrugRequest newDrug);

    void deleteDrug(String drugName);

    void deleteDrugById(int id);
}






