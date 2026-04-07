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
    private final AuthEventManager eventManager;
    private final AuthLogger authLogger;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthStrategyFactory factory,
                       AuthEventManager eventManager,
                       AuthLogger authLogger){

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.factory = factory;
        this.eventManager = eventManager;
        this.authLogger = authLogger;

        this.eventManager.addObserver(authLogger);
    }

    public User register(String name, String email, String password){

        String hashedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(hashedPassword);
        User savedUser = userRepository.save(user);

        eventManager.notifyObservers("REGISTER", savedUser);

        return savedUser;
    }

    public User login(String type, Object request){
        AuthStrategy strategy = factory.getStrategy(type);
        User user = strategy.authenticate(request);

        eventManager.notifyObservers("LOGIN", user);

        return user;
    }
}