package com.example.mysql_example.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Entity
@Transactional
@Data
@NoArgsConstructor
@Table(name="address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="add_id")
    private Long addressId;
    private String city;
    private String addressType;
    //@OneToOne(mappedBy = "address")
    //private Employee employee;
}
