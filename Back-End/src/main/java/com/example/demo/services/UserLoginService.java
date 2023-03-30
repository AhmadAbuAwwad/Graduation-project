package com.example.demo.services;

import com.example.demo.controller.requests.UserLoginRequest;
import com.example.demo.models.UserLogin;
import java.util.List;
import java.util.Optional;

public interface UserLoginService {

	List<UserLogin> findAllUsers();

	Optional<UserLogin> findUserByEmail(String email);

	Optional<UserLogin> createUser(UserLoginRequest userLoginRequest);

	boolean deleteUser(String email);

	boolean makeAdmin(String email);
}