package com.example.demo.repositories;

import com.example.demo.models.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserLoginRepository extends JpaRepository<UserLogin, Integer>{
    public Optional<UserLogin>findUserLoginByEmail(String email);
}