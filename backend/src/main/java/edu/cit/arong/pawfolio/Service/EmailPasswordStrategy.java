package edu.cit.arong.pawfolio.Service;

import edu.cit.arong.pawfolio.DTO.LoginRequest;
import edu.cit.arong.pawfolio.Model.User;
import edu.cit.arong.pawfolio.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EmailPasswordStrategy implements AuthStrategy {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public EmailPasswordStrategy(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User authenticate(Object request){

        LoginRequest login = (LoginRequest) request;

        User user = userRepository.findByEmail(login.email);

        if(user == null){
            throw new RuntimeException("User not found");
        }

        if(!passwordEncoder.matches(login.password, user.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}