package com.example.demo.services.implementation;

import com.example.demo.controller.requests.UserLoginRequest;
import com.example.demo.models.UserInfo;
import com.example.demo.models.UserLogin;
import com.example.demo.repositories.UserInformationRepository;
import com.example.demo.repositories.UserLoginRepository;
import com.example.demo.services.UserInfoService;
import com.example.demo.services.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserLoginServiceImp implements UserLoginService {

	@Autowired
	private UserLoginRepository userLoginRepository;
	@Autowired
	private UserInformationRepository userInformationRepository;
	@Autowired
	private UserInfoService userInfoService;

	@Override
	public List<UserLogin> findAllUsers() {
		return userLoginRepository.findAll();
	}

	@Override
	public Optional<UserLogin> findUserByEmail(String email) {
		Optional<UserLogin> user = userLoginRepository.findUserLoginByEmail(email);
		if(user.isPresent()) {
			return user;
		}
		return Optional.empty();
	}

	@Override
	public Optional<UserLogin> createUser(UserLoginRequest userLoginRequest) {
		if(userLoginRepository.findUserLoginByEmail(userLoginRequest.getEmail()).isPresent())
			return userLoginRepository.findUserLoginByEmail(userLoginRequest.getEmail());

		UserLogin userLogin = new UserLogin();
		userLogin.setEmail(userLoginRequest.getEmail());
		userLogin.setRole(userLoginRequest.getRole());


		UserInfo userInfo = new UserInfo();
		userInfo.setEmail(userLoginRequest.getEmail());
		userLoginRepository.save(userLogin);
		userInformationRepository.save(userInfo);
		return userLoginRepository.findUserLoginByEmail(userLoginRequest.getEmail());
	}

	@Override
	public boolean deleteUser(String email) {
		Optional<UserLogin> employee = userLoginRepository.findUserLoginByEmail(email);
		if(employee.isPresent()) {
			userLoginRepository.delete(employee.get());
			userInfoService.deleteUser(email);
			return true;
		}
		return false;
	}

	@Override
	public boolean makeAdmin(String email) {
		Optional<UserLogin> userLogin = userLoginRepository.findUserLoginByEmail(email);
		if(userLogin.isPresent()){
			userLogin.get().setRole(0);
			return true;
		}
		return false;
	}
}
