package com.example.demo.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "drugs")
public class Drug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "drug_id",                           // Column annotation used to assign properties for the column elements
            updatable = false,
            unique = true,
            nullable = false,
            columnDefinition ="integer")
    private Integer id;

    @Column(name = "drug_name")
    private String drugName;
    @Column(name = "generic_names")
    private String genericNames;
    @Column(name = "dose_type")
    private String doseType;
    @Column(name = "company")
    private String company;

    @Column(name = "price")
    private Integer price;

    @OneToMany(mappedBy = "drug")
    private List<UserDrugs> drugUsersList;

    @Override
    public String toString() {
        return "Drug{" +
                "id=" + id +
                ", drugName='" + drugName + '\'' +
                ", genericNames='" + genericNames + '\'' +
                ", doseType='" + doseType + '\'' +
                ", company='" + company + '\'' +
                '}';
    }
}
