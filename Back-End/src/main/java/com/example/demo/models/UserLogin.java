package com.example.demo.models;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import jakarta.persistence.*;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@Table(name = "users_login")
@Entity
public class UserLogin {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;


    @Column(name = "login_email",
            unique = true,
            updatable = false,
            nullable = false,
            columnDefinition ="Text")
    private String email;

    @Column(name = "role",
            columnDefinition ="integer")
    private int role;
}
