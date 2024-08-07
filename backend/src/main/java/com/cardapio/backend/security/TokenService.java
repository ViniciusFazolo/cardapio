package com.cardapio.backend.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.cardapio.backend.models.User;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")  //pegar la do aplication.propperts
    private String secret;

    public String generateToken(User user){
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);

            String token = JWT.create()
                    .withIssuer("backend") //quem esta emetindo esse token
                    .withSubject(user.getEmail()) //quem vai receber o token
                    .withExpiresAt(this.generateExpirationDate()) //quando inspira o token
                    .sign(algorithm); //gerar de fato o token
            return token;
        }catch (JWTCreationException exception){
            throw new RuntimeException("Error while authenticating");
        }
   }

    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("backend")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch (JWTVerificationException exception){
            return null;
        }
   }

    private Instant generateExpirationDate(){
        return LocalDateTime.now().plusHours(24).toInstant(ZoneOffset.of("-03:00"));
   }
}
