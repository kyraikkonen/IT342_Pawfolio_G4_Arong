package edu.cit.arong.pawfolio.Service;

import edu.cit.arong.pawfolio.Model.User;
import edu.cit.arong.pawfolio.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthStrategyFactory factory;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthStrategyFactory factory){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.factory = factory;
    }

    public User register(String name, String email, String password){

        String hashedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    public User login(String type, Object request){
        AuthStrategy strategy = factory.getStrategy(type);
        return strategy.authenticate(request);
    }
}