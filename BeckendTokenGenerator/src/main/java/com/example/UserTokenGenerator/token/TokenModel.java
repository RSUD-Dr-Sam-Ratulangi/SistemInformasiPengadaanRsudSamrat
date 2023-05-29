package com.example.UserTokenGenerator.token;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@NoArgsConstructor
@Entity
@Table(name = "tokens")
public class TokenModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token", length = 1000)
    private String token;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "revoked_date")
    private Date revokedDate;
    // constructors, getters, and setters

}
