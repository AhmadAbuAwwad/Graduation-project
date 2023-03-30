package com.example.demo.controller;

import com.example.demo.controller.dto.UserInfoDTO;
import com.example.demo.controller.requests.UserInfoRequest;
import com.example.demo.models.UserInfo;
import com.example.demo.services.UserInfoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Controller for User Info
 */

@RestController
@RequestMapping("api/userInfo")
public class UserInformationController
{
    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    ModelMapper modelMapper;

    //  UserInfo
    private UserInfoDTO convertUserInfoToDto(UserInfo userInfo) {
        UserInfoDTO userInfoDto = modelMapper.map(userInfo, UserInfoDTO.class);
        return userInfoDto;
    }
    @GetMapping("/getUsersInformation")
    public ResponseEntity<List<UserInfoDTO>> findAllUsersData(){
        return new ResponseEntity(userInfoService.findAllUsers().stream()
                .map(this::convertUserInfoToDto)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/getUserInformation/{email}")
    public ResponseEntity<UserInfoDTO> findLoggedInUserById(@PathVariable("email") String email){
        return new ResponseEntity(convertUserInfoToDto(userInfoService.findUserByEmail(email).get()), HttpStatus.OK);
    }

    @PutMapping("/updateUserInformation")
    public ResponseEntity<UserInfoDTO> updateLoginUser(@RequestBody UserInfoRequest userInfoRequest){
        if(userInfoService.findUserByEmail(userInfoRequest.getEmail()).isPresent())
            return new ResponseEntity(convertUserInfoToDto(userInfoService.updateUser(userInfoRequest).get()), HttpStatus.OK);
        return  new ResponseEntity(new UserInfoDTO(), HttpStatus.CONFLICT);
    }

    @DeleteMapping("/deleteUserInformation/{email}")
    public ResponseEntity<String> deleteLoginUser(@PathVariable("email") String email){
        userInfoService.deleteUser(email);
        return new ResponseEntity("Person with email: " + email + " was deleted", HttpStatus.OK);
    }
}
