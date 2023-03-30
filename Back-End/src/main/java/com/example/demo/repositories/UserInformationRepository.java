package com.example.demo.repositories;

import com.example.demo.models.UserInfo;
import com.example.demo.models.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInformationRepository extends JpaRepository<UserInfo, Integer>{
    public Optional<UserInfo>findUserInfoByEmail(String email);
    public Optional<UserInfo>deleteUserLoginByEmail(String email);
}