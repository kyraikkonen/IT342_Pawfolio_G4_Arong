package edu.cit.arong.pawfolio.Service;

import edu.cit.arong.pawfolio.Model.User;
import org.springframework.stereotype.Component;

@Component
public class AuthLogger implements AuthObserver {

    @Override
    public void update(String event, User user){
        System.out.println("EVENT: " + event + " | User: " + user.getEmail());
    }
}