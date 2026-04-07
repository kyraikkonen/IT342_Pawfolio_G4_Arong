package edu.cit.arong.pawfolio.Service;

import edu.cit.arong.pawfolio.Model.User;
import edu.cit.arong.pawfolio.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class OAuthStrategy implements AuthStrategy {

    private final UserRepository userRepository;

    public OAuthStrategy(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User authenticate(Object request){

        Map<String, Object> attributes = (Map<String, Object>) request;

        OAuthUserAdapter userAdapter = new GoogleUserAdapter(attributes);

        String email = userAdapter.getEmail();
        String name = userAdapter.getName();

        User user = userRepository.findByEmail(email);

        if(user == null){
            user = new User();
            user.setEmail(email);
            user.setName(name);
            userRepository.save(user);
        }

        return user;
    }
}