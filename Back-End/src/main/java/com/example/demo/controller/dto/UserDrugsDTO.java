package com.example.demo.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDrugsDTO {
    private int id;
    private DrugDTO drug;

    private UserInfoDTO userDonor;
    @JsonProperty("production_date")
    private Date productionDate;
    @JsonProperty("expiration_date")
    private Date expirationDate;

    private String status;
}
