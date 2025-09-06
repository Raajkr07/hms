package com.hopemeds.auth.util;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Base64;

public class JwtKeyGenerator {
    public static void main(String[] args) {
        byte[] key = Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded();
        String base64Key = Base64.getEncoder().encodeToString(key);
        System.out.println("JWT Secret (Base64): " + base64Key);
    }
}
