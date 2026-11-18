package com.example.Tutor_Application_System.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;



@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private Long expiry;

    private  Key getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    
    public String generateToken(UserDetails userdetails){
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expiry);

        return Jwts.builder().setSubject(userdetails.getUsername()).setExpiration(expiration).setIssuedAt(now)
        .signWith(getSigningKey(),SignatureAlgorithm.HS256)
        .compact();
    }

    public String extractUserName(String token){
        return getAllClaims(token).getSubject();
    }

    public boolean isExpired(String token){
        return getAllClaims(token).getExpiration().before(new Date());
    }

    public boolean isValid(String token,UserDetails userdetails){
        String username = extractUserName(token);
        return username.equals(userdetails.getUsername()) && !isExpired(token);
    }

    private Claims getAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }
}
