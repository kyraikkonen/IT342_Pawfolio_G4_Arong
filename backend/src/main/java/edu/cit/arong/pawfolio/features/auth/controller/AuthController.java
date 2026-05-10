package edu.cit.arong.pawfolio.features.auth.controller;

import edu.cit.arong.pawfolio.features.auth.dto.LoginRequest;
import edu.cit.arong.pawfolio.features.auth.dto.RegisterRequest;
import edu.cit.arong.pawfolio.features.users.model.User;
import edu.cit.arong.pawfolio.features.auth.service.AuthService;
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