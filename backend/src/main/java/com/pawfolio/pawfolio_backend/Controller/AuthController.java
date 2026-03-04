package com.pawfolio.pawfolio_backend.Controller;

import com.pawfolio.pawfolio_backend.DTO.LoginRequest;
import com.pawfolio.pawfolio_backend.DTO.RegisterRequest;
import com.pawfolio.pawfolio_backend.Model.User;
import com.pawfolio.pawfolio_backend.Service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request){

        return authService.register(
                request.name,
                request.email,
                request.password
        );
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request){

        return authService.login(
                request.email,
                request.password
        );
    }
}