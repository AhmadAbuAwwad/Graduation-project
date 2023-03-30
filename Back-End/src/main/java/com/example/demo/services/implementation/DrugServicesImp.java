package com.example.demo.services.implementation;

import com.example.demo.controller.requests.DrugRequest;
import com.example.demo.exception.MedicineNotFoundException;
import com.example.demo.models.Drug;
import com.example.demo.models.UserDrugs;
import com.example.demo.repositories.DrugsRepository;
import com.example.demo.repositories.UserDrugsRepository;
import com.example.demo.services.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DrugServicesImp implements DrugService {

    @Autowired
    private DrugsRepository drugsRepository;
    @Autowired
    private UserDrugsRepository userDrugsRepository;


    @Override
    public List<Drug> findAllDrugsInformation() {
        return drugsRepository.findAll();
    }

    @Override
    public List<Drug> findDrugByDrugName(String drugName) {
        return drugsRepository.findByDrugName(drugName);
    }

    @Override
    public Optional<Drug> findFirstDrugByDrugName(String drugName) {
        Optional<Drug> foundDrug = drugsRepository.findFirstByGenericNamesContaining(drugName.trim().toUpperCase());
        if (!foundDrug.isPresent()) {
            foundDrug = drugsRepository.findFirstByDrugNameContaining(drugName.trim().toUpperCase());
            if (!foundDrug.isPresent())
                throw new MedicineNotFoundException("Medicine was not found: " + drugName);
        }
        return foundDrug;
    }

    /**
     * Adding
     *
     * @param newDrug
     * @return
     */
    public Optional<Drug> saveDrug(DrugRequest newDrug) {
        if (!drugsRepository.findByDrugName(newDrug.getDrugName()).isEmpty()) {
            Optional<Drug> drug = Optional.of(drugsRepository.findByDrugName(newDrug.getDrugName()).get(0));
            return drug;
        }

        Drug drug = new Drug();
        drug.setDrugName(newDrug.getDrugName());
        drug.setCompany(newDrug.getCompany());
        drug.setDoseType(newDrug.getDoseType());

        if (newDrug.getPrice() == 0)
            drug.setPrice(25);
        drug.setPrice(newDrug.getPrice());

        drug.setGenericNames(newDrug.getGenericNames());
        drugsRepository.save(drug);
        Optional<Drug> newDrug1 = Optional.of(drugsRepository.findByDrugName(newDrug.getDrugName()).get(0));
        return newDrug1;
    }

    /**
     * Deleting
     *
     * @param drugName
     */
    @Override
    public void deleteDrug(String drugName) {
        List<UserDrugs> drugList = userDrugsRepository.findUserDrugsByDrug(drugsRepository.findByDrugName(drugName).get(0));
        for (UserDrugs userDrugs : drugList)
            userDrugsRepository.deleteById(userDrugs.getId());
        drugsRepository.deleteById(drugsRepository.findByDrugName(drugName).get(0).getId());
    }

    @Override
    public void deleteDrugById(int id) {
        drugsRepository.deleteById(id);
    }

    /**
     * Updating
     *
     * @param
     * @param newDrug
     */
    @Override
    public Optional<Drug> editDrug(String drugName, DrugRequest newDrug) {
        Optional<Drug> found = Optional.of(drugsRepository.findByDrugName(newDrug.getDrugName()).get(0));
        Drug drug = new Drug();
        drug.setId(found.get().getId());
        drug.setDrugName(newDrug.getDrugName());
        drug.setGenericNames(newDrug.getGenericNames());
        drug.setCompany(newDrug.getCompany());
        drug.setDoseType(newDrug.getDoseType());
        drug.setDrugUsersList(found.get().getDrugUsersList());
        drugsRepository.save(drug);
        return Optional.of(drugsRepository.findByDrugName(newDrug.getDrugName()).get(0));
    }
}
