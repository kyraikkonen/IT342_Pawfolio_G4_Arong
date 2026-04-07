package edu.cit.arong.pawfolio.Service;

import edu.cit.arong.pawfolio.Model.User;

public interface AuthObserver {
    void update(String event, User user);
}