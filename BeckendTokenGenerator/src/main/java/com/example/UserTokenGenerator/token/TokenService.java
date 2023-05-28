package com.example.UserTokenGenerator.token;


import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    public TokenModel createToken(String token, Long userId) {
        TokenModel newToken = new TokenModel();
        newToken.setToken(token);
        newToken.setUserId(userId);
        newToken.setCreatedDate(new Date());
        return tokenRepository.save(newToken);
    }

    public TokenModel getToken(String token, Long userId) {
        return tokenRepository.findByTokenAndUserId(token, userId);
    }

    public void revokeToken(String token, Long userId) {
        TokenModel tokenToRevoke = tokenRepository.findByTokenAndUserId(token, userId);
        if (tokenToRevoke != null) {
            tokenToRevoke.setRevokedDate(new Date());
            tokenRepository.save(tokenToRevoke);
        }
    }

    public TokenModel getLatestToken(Long userId) {
        return tokenRepository.findFirstByUserIdOrderByCreatedDateDesc(userId);
    }
}
