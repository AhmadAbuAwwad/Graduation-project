package com.example.demo.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDrugsReceiverDTO {
    private int id;
    private String drug;
    private String drugDonor;
    private String drugReceiver;
}
