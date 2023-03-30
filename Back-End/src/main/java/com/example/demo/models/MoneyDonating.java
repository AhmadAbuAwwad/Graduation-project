package com.example.demo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
    @Table(name = "money_donators")
public class MoneyDonating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",
            updatable = false,
            nullable = false
    )
    private Integer id;
    @Column(name = "money_amount")
    private int moneyAmount;
    @Column(name = "date_of_donating")
    private Date dateOfDonating;
    @JoinColumn(name = "email")
    private String email;
    @JoinColumn(name = "card_number")
    private long cardNumber;
    @JoinColumn(name = "card_holder")
    private String cardHolder;
    @JoinColumn(name = "money_unit")
    private String moneyUnit;
}
