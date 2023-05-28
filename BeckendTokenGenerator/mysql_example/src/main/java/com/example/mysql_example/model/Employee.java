package com.example.mysql_example.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Entity
@Transactional
@Data
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id")
    private Long id;
    private String name;
    private Integer age;
    private Boolean active;
    @Column(name = "PHONE_NUMBER")
    private Long phonenumber=(long) (Math.random()*Math.pow(10,10));
    private String designation;
    private Double salary=Math.random()*100000;
    //@OneToOne(cascade = CascadeType.ALL)
    //@JoinColumn(name = "fk_add_id")
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name ="fk_emp_id",referencedColumnName = "emp_id")
    private List<Address> address;
}
