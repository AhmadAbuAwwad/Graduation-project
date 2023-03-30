package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.Date;

//  Many to Many Table
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "user_drugs")
public class UserDrugs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",
            updatable = false,
            nullable = false
    )
    private Integer id;

    @Column(name = "production_date")
    private Date productionDate;
    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "status")
    private String status;   //  Pending
    //  Rejected
    //  Approved

    @JoinColumn(name = "receiver")
    private String userReceiver;

    @ManyToOne
    @JoinColumn(name = "drug_id")
    private Drug drug;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo userDonor;
}
