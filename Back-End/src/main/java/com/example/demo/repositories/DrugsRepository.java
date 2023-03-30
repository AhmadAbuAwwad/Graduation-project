package com.example.demo.repositories;

import com.example.demo.models.Drug;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface DrugsRepository extends JpaRepository<Drug, Integer> {
    public List<Drug> findByDrugName(String drugName);
    public Optional<Drug> findFirstByDrugNameContaining(String drugName);

    public Optional<Drug> findFirstByGenericNamesContaining(String drugName);
    public Optional<Drug> deleteDrugByDrugName(String drugName);

    Optional<Drug> findFirstByDrugNameAndDoseTypeAndCompanyAndGenericNames(String drugName,String doseType, String Company, String genericNames);

}