package com.example.demo.services;

import com.example.demo.controller.requests.UserDrugAddUpdateRequest;
import com.example.demo.controller.requests.UserDrugDeleteRequest;
import com.example.demo.controller.requests.UserUpdateByIdRequest;
import com.example.demo.models.UserDrugs;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface UserDrugsService {
    Optional<UserDrugs> addDrugToUser(UserDrugAddUpdateRequest userDrugs);

    Optional<UserDrugs> updateDrugToUserById(UserUpdateByIdRequest userUpdateByIdRequest);

    List<UserDrugs> getAllUsersDrugs();

    Optional<UserDrugs> getById(int id);

    Optional<UserDrugs> approvePostByManger(int id, boolean bool);

    List<UserDrugs> getAllApprovedUsersDrugs();

    Optional<UserDrugs> addReceiverForMedicine(int id, String email);

    List<UserDrugs> getAllPendingUsersDrugs();

    List<UserDrugs> getAllReceivedMedicineByUser(String email);
    List<UserDrugs> getAllReceivedMedicine();

    List<UserDrugs> getHistoryOfDonation(String email);
     List<Double> getHistoryCount();

//    Optional<UserDrugs> updateDrugToUser(UserDrugAddUpdateRequest userDrugs);
//    void deleteDrugFromUser(UserDrugDeleteRequest userDrugDeleteRequest);
//    void deleteDrugKindFromUser(UserDrugDeleteRequest userDrugDeleteRequest);
//
//    void deleteDrugFromUserById(int id);

}







