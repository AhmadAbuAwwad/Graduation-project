package com.example.demo.controller.requests;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoRequest {

    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String nearestPopularPlace;
    private long phoneNumber;

    @Override
    public String toString() {
        return "UserInfo{" +
                "  email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", nearestPopularPlace='" + nearestPopularPlace + '\'' +
                ", phoneNumber=" + phoneNumber +
                '}';
    }

}

