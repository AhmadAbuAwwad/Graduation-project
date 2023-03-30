package com.example.demo.repositories;

import com.example.demo.models.MoneyDonating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface MoneyDonatingRepository extends JpaRepository<MoneyDonating, Integer> {
    public List<MoneyDonating> findAllByEmail(String email);
    public Optional<MoneyDonating> findTopByOrderByIdDesc();

}