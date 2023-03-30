package com.example.demo.services.implementation;

import com.example.demo.controller.requests.UserDrugAddUpdateRequest;
import com.example.demo.controller.requests.UserInfoRequest;
import com.example.demo.models.Drug;
import com.example.demo.models.UserDrugs;
import com.example.demo.models.UserInfo;
import com.example.demo.repositories.DrugsRepository;
import com.example.demo.repositories.UserDrugsRepository;
import com.example.demo.repositories.UserInformationRepository;
import com.example.demo.services.UserInfoService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserInfoServiceImp implements UserInfoService {

	@Autowired
	private UserInformationRepository userInformationRepository;
	@Autowired
	private DrugsRepository drugsRepository;
	@Autowired
	private UserDrugsRepository userDrugsRepository;

	@Override
	public List<UserInfo> findAllUsers() {
		return userInformationRepository.findAll();
	}

	@Override
	public Optional<UserInfo> findUserByEmail(String email) {
		Optional<UserInfo> user = userInformationRepository.findUserInfoByEmail(email);
		if(user.isPresent()) {
			return user;
		}
		return Optional.empty();
	}

	@Override
	public Optional<UserInfo> updateUser(UserInfoRequest userInfo) {
		Optional<UserInfo> user = userInformationRepository.findUserInfoByEmail(userInfo.getEmail());
		if(user.isPresent()) {
			user.get().setFirstName(userInfo.getFirstName());
			user.get().setLastName(userInfo.getLastName());
			user.get().setAddress(userInfo.getAddress());
			user.get().setCity(userInfo.getCity());
			user.get().setPhoneNumber(userInfo.getPhoneNumber());
			user.get().setNearestPopularPlace(userInfo.getNearestPopularPlace());
			userInformationRepository.save(user.get());
			return user;
		}
		return Optional.empty();
	}


	@Override
	public boolean deleteUser(String email) {
		Optional<UserInfo> userInfo = userInformationRepository.findUserInfoByEmail(email);
		if(userInfo.isPresent()) {
			userInformationRepository.delete(userInfo.get());
			return true;
		}
		return false;
	}

//	@Override
//	public Optional<UserInfo> createUser(String email) {
//		UserInfo userInfo = new UserInfo();
//		userInfo.setEmail(email);
//		userInformationRepository.save(userInfo);
//		return userInformationRepository.findUserInfoByEmail(email);
//	}
//
//	@Override
//	public boolean addDrugToUser(UserDrugAddUpdateRequest userDrugAddUpdateRequest) {
//		Optional<UserInfo> userInfo = userInformationRepository.findUserInfoByEmail(userDrugAddUpdateRequest.getEmail());
//		Optional<Drug> drug = Optional.of(drugsRepository.findById(userDrugAddUpdateRequest.getId()).get());
//		if(userInfo.isPresent() && drug.isPresent()) {
//			UserDrugs userDrugs = new UserDrugs();
//			userDrugs.setDrug(drug.get());
//			userDrugs.setUserDonor(userInfo.get());
//			userDrugs.setExpirationDate(userDrugAddUpdateRequest.getExpirationDate());
//			userDrugs.setProductionDate(userDrugAddUpdateRequest.getProductionDate());
//			userDrugsRepository.saveAndFlush(userDrugs);
//			return true;
//		}
//		return false;
//	}

}
