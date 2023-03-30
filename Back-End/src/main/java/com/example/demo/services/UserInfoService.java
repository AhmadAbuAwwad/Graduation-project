package com.example.demo.services;

import com.example.demo.controller.requests.UserDrugAddUpdateRequest;
import com.example.demo.controller.requests.UserInfoRequest;
import com.example.demo.models.UserInfo;

import java.util.List;
import java.util.Optional;

public interface UserInfoService {

	List<UserInfo> findAllUsers();

	Optional<UserInfo> findUserByEmail(String email);

	Optional<UserInfo> updateUser(UserInfoRequest employee);
	boolean deleteUser(String email);
}
