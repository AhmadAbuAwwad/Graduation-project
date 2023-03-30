package com.example.demo.models;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@Table(name = "users_information")
@Entity
public class UserInfo {

    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;


    @Column(name = "user_email",
            updatable = false,
            nullable = false,
            columnDefinition ="Text")
    private String email;


    @Column(name = "first_name",
            columnDefinition = "TEXT")
    private String firstName;

    @Column(name = "last_name",
            columnDefinition = "TEXT")
    private String lastName;

    @Column(name = "address",
            columnDefinition = "TEXT")
    private String address;

    @Column(name = "city",
            columnDefinition = "TEXT")
    private String city;

    @Column(name = "nearest_popular_place",
            columnDefinition = "TEXT")
    private String nearestPopularPlace;

    @Column(name = "phone_number",                            // Column annotation used to assign properties for the column elements
            nullable = false,
            columnDefinition ="BIGINT default 0")   // 1 role means User where 0 role means Admin
    private long phoneNumber;

    @OneToMany(mappedBy = "userDonor")
    private List<UserDrugs> userDrugsList;
    
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
//                ", userDrugsList=" + userDrugsList +
                '}';
    }

}

