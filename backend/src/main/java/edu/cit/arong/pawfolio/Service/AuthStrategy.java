package edu.cit.arong.pawfolio.Service;

import edu.cit.arong.pawfolio.Model.User;

public interface AuthStrategy {
    User authenticate(Object request);
}