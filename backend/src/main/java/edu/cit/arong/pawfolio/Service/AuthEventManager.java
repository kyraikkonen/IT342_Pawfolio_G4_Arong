package edu.cit.arong.pawfolio.Service;

import edu.cit.arong.pawfolio.Model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AuthEventManager {

    private final List<AuthObserver> observers = new ArrayList<>();

    public void addObserver(AuthObserver observer){
        observers.add(observer);
    }

    public void notifyObservers(String event, User user){
        for(AuthObserver observer : observers){
            observer.update(event, user);
        }
    }
}