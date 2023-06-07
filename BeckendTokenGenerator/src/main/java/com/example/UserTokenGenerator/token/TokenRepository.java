package com.example.UserTokenGenerator.token;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<TokenModel, Long> {
    TokenModel findByTokenAndUserId(String token, Long userId);
    TokenModel findFirstByUserIdOrderByCreatedDateDesc(Long userId);
}

