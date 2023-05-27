/*package com.example.pengadaanrsudsamrat.UTIL;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtAuthenticationInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
            return false;
        }

        String token = authorizationHeader.substring(7);

        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey("TJRFUXEPqF+67DCsagwJwsBAadt9rjV8VQBh7VxXWnC6v9mFWViprlgYFTBzhtRUe158PJ/JG/BmQsufV9aStg==").parseClaimsJws(token);
            request.setAttribute("userId", claims.getBody().get("userId"));
            request.setAttribute("username", claims.getBody().get("username"));
            request.setAttribute("role", claims.getBody().get("role"));
            return true;
        } catch (JwtException ex) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
            return false;
        }
    }
}
*/