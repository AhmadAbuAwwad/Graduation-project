package com.example.demo.controller;

import com.example.demo.controller.dto.UserDrugDTO;
import com.example.demo.controller.dto.UserDrugsDTO;
import com.example.demo.controller.dto.UserDrugsReceiverDTO;
import com.example.demo.controller.requests.UserDrugAddUpdateRequest;
import com.example.demo.controller.requests.UserDrugDeleteRequest;
import com.example.demo.controller.requests.UserUpdateByIdRequest;
import com.example.demo.exception.FailedPostingMedicine;
import com.example.demo.models.UserDrugs;
import com.example.demo.services.DrugService;
import com.example.demo.services.UserDrugsService;
import com.example.demo.services.UserInfoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Controller for Drugs
 */

@RestController
@RequestMapping("api/userDrug")
public class UserDrugController {
    @Autowired
    private DrugService drugService;
    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private UserDrugsService userDrugsService;

    @Autowired
    private ModelMapper modelMapper;

    //  UserDrugs
    private UserDrugsDTO convertUserDrugsToDto(UserDrugs userDrugs) {
        UserDrugsDTO userDrugsDto = modelMapper.map(userDrugs, UserDrugsDTO.class);
        return userDrugsDto;
    }

    //  UserDrugs
    private UserDrugDTO convertUserDrugToDto(UserDrugs userDrugs) {
        UserDrugDTO userDrugsDto = modelMapper.map(userDrugs, UserDrugDTO.class);
        userDrugsDto.setUserDonor(userDrugs.getUserDonor().getFirstName() + " " + userDrugs.getUserDonor().getLastName());
        return userDrugsDto;
    }

    //  UserDrugs Receiver
    private UserDrugsReceiverDTO convertUserDrugsReceiverToDto(UserDrugs userDrugs) {

        UserDrugsReceiverDTO userDrugsReceiverDto = new UserDrugsReceiverDTO();
        userDrugsReceiverDto.setDrug(userDrugs.getDrug().getDrugName());
        userDrugsReceiverDto.setDrugDonor(userDrugs.getUserDonor().getEmail());
        userDrugsReceiverDto.setDrugReceiver(userDrugs.getUserReceiver());
        userDrugsReceiverDto.setId(userDrugs.getId());
        return userDrugsReceiverDto;
    }

    @GetMapping("/getAllDrugUser")
    public ResponseEntity<List<UserDrugsDTO>> findAllUsersDrugs() {
        return new ResponseEntity(userDrugsService.getAllUsersDrugs().stream()
                .map(this::convertUserDrugsToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/getAllApprovedDrugUser")
    public ResponseEntity<List<UserDrugsDTO>> findAllApprovedUsersDrugs() {
        return new ResponseEntity(userDrugsService.getAllApprovedUsersDrugs().stream()
                .map(this::convertUserDrugsToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/getDonationHistory/{email}")
    public ResponseEntity<List<UserDrugsDTO>> getDonationHistory(@PathVariable("email") String email) {
        return new ResponseEntity(userDrugsService.getHistoryOfDonation(email).stream()
                .map(this::convertUserDrugsReceiverToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/getAllPendingDrugUser")
    public ResponseEntity<List<UserDrugDTO>> findAllPendingUsersDrugs() {
        return new ResponseEntity(userDrugsService.getAllPendingUsersDrugs().stream()
                .map(this::convertUserDrugToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/getAllReceivedMedicines")
    public ResponseEntity<List<UserDrugsReceiverDTO>> getAllReceivedMedicines() {
        return new ResponseEntity(userDrugsService.getAllReceivedMedicine().stream()
                .map(this::convertUserDrugsReceiverToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/getCounterOfDonation")
    public ResponseEntity<List<Double>> getCounterOfDonation() {
        return new ResponseEntity(userDrugsService.getHistoryCount(), HttpStatus.OK);
    }

    @GetMapping("/getReceivedForUser/{email}")
    public ResponseEntity<List<UserDrugsReceiverDTO>> getReceivedForUser(@PathVariable("email") String email) {
        return new ResponseEntity(userDrugsService.getAllReceivedMedicineByUser(email).stream()
                .map(this::convertUserDrugsReceiverToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @PostMapping("/askForMedicine/{id}/{email}")
    public ResponseEntity<List<UserDrugsReceiverDTO>> getReceivedForUser(@PathVariable("id") int id, @PathVariable("email") String email) {
        return new ResponseEntity(convertUserDrugsReceiverToDto(userDrugsService.addReceiverForMedicine(id, email).get()), HttpStatus.OK);
    }

    @GetMapping("/getDrugsfromUser/{email}")
    public ResponseEntity<List<UserDrugsDTO>> findAllUserDrugs(@PathVariable("email") String email) {
        return new ResponseEntity(userInfoService.findUserByEmail(email).get().getUserDrugsList().stream()
                .map(this::convertUserDrugsToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/getUsersforDrug/{drugName}")
    public ResponseEntity<List<UserDrugsDTO>> findAllDrugUsers(@PathVariable("drugName") String drugName) {
        return new ResponseEntity(drugService.findFirstDrugByDrugName(drugName).get().getDrugUsersList().stream()
                .map(this::convertUserDrugsToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @PostMapping("/addDrugToUserList")
    public ResponseEntity<UserDrugsDTO> addDrugToList(@RequestBody UserDrugAddUpdateRequest userDrugAddUpdateRequest) {
        Optional<UserDrugs> userDrugs = userDrugsService.addDrugToUser(userDrugAddUpdateRequest);
        if (!userDrugs.isPresent())
            throw new FailedPostingMedicine("Failed while posting the medicine into table");
        return new ResponseEntity(convertUserDrugsToDto(userDrugs.get()), HttpStatus.OK);
    }

    @PostMapping("/approveByMangerPost/{id}/{bool}")
    public ResponseEntity<UserDrugsDTO> ApproveByMangerPost(@PathVariable("id") int id, @PathVariable("bool") boolean bool) {
        return new ResponseEntity(convertUserDrugsToDto(userDrugsService.approvePostByManger(id, bool).get()), HttpStatus.OK);
    }


    @PutMapping("/updateDrugToUserListById")
    public ResponseEntity<UserDrugsDTO> updateDrugToListById(@RequestBody UserUpdateByIdRequest userUpdateByIdRequest) {

        return new ResponseEntity(convertUserDrugsToDto(userDrugsService.updateDrugToUserById(userUpdateByIdRequest).get()), HttpStatus.OK);
    }
//    @PutMapping("/updateDrugToUserList")
//    public ResponseEntity<UserDrugsDTO> updateDrugToList(@RequestBody UserDrugAddUpdateRequest userDrugAddUpdateRequest){
//        return new ResponseEntity(convertUserDrugsToDto(userDrugsService.updateDrugToUser(userDrugAddUpdateRequest).get()), HttpStatus.OK);
//    }


//    @DeleteMapping("/deleteDrugFromUserList")
//    public ResponseEntity<String> deleteDrugFromList(@RequestBody UserDrugDeleteRequest userDrugDeleteRequest){
//        userDrugsService.deleteDrugFromUser(userDrugDeleteRequest);
//        return new ResponseEntity(userDrugDeleteRequest.getDrugName() + " was deleted from user with email: "
//                + userDrugDeleteRequest.getEmail(), HttpStatus.OK);
//    }
//
//    @DeleteMapping("/deleteDrugFromUserListById/{id}")
//    public ResponseEntity<String> deleteDrugById(@PathVariable("id") int id){
//        userDrugsService.deleteDrugFromUserById(id);
//        return new ResponseEntity("Drug in list with id = " + id + " was deleted",HttpStatus.OK);
//    }
//
//    @DeleteMapping("/deleteDrugKindFromUserList")
//    public ResponseEntity<String> deleteAllDrugKindFromList(@RequestBody UserDrugDeleteRequest userDrugDeleteRequest){
//        userDrugsService.deleteDrugKindFromUser(userDrugDeleteRequest);
//
//        return new ResponseEntity(userDrugDeleteRequest.getDrugName() + " was deleted from user with email: "
//                + userDrugDeleteRequest.getEmail(), HttpStatus.OK);
//    }
}
