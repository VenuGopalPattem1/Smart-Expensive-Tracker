package com.nt.backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
        response.setContentType("application/json");

        PrintWriter writer = response.getWriter();
        writer.write("{\"timestamp\":\"" + System.currentTimeMillis() + "\", " +
                     "\"status\":401, " +
                     "\"error\":\"Unauthorized\", " +
                     "\"message\":\"JWT token is missing or invalid.\"}");
        writer.flush();
    }
}
