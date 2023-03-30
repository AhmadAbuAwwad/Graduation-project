package com.example.demo.controller;

import com.example.demo.controller.dto.UserLoginDTO;
import com.example.demo.controller.requests.UserLoginRequest;
import com.example.demo.models.UserLogin;
import com.example.demo.services.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller for User Login
 */

@RestController
@RequestMapping("api/userlogin")
public class UserLoginController
{
    @Autowired
    private UserLoginService userLoginService;

    @GetMapping("/getUsersLogin")
    public ResponseEntity<List<UserLoginDTO>> findAllUsersData(){
        return new ResponseEntity(userLoginService.findAllUsers(), HttpStatus.OK);
    }
    @GetMapping("/getUserLogin/{email}")
    public ResponseEntity<UserLoginDTO> findLoggedInUserById(@PathVariable("email") String email){
        if(userLoginService.findUserByEmail(email).isPresent())
            return new ResponseEntity(userLoginService.findUserByEmail(email).get(), HttpStatus.OK);
        return new ResponseEntity(Optional.empty(), HttpStatus.CONFLICT);
    }
    @PostMapping("/createUser")
    public ResponseEntity<UserLoginDTO> createLoginUser(@RequestBody UserLoginRequest userLoginRequest){
        Optional<UserLogin> userLoginOptional = userLoginService.findUserByEmail(userLoginRequest.getEmail());
        if(!userLoginOptional.isPresent())
            return new ResponseEntity(userLoginService.createUser(userLoginRequest), HttpStatus.OK);
        return new ResponseEntity(userLoginService.findUserByEmail(userLoginRequest.getEmail()).get(), HttpStatus.CONFLICT);
    }
    @DeleteMapping("/deleteUserLogin/{email}")
    public ResponseEntity<UserLoginDTO> deleteLoginUser(@PathVariable("email") String email){
        return new ResponseEntity(userLoginService.deleteUser(email), HttpStatus.OK);
    }

    @PostMapping("/makeAdmin/{email}")
    public ResponseEntity<String> makeUserAnAdmin(@PathVariable("email") String email){
        if(userLoginService.makeAdmin(email))
            return new ResponseEntity(email + " is admin now", HttpStatus.OK);
        return new ResponseEntity(email + " was not found", HttpStatus.NOT_FOUND);

    }
}
