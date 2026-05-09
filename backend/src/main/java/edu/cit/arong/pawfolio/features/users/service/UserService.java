package edu.cit.arong.pawfolio.features.users.service;

import edu.cit.arong.pawfolio.features.users.model.User;
import edu.cit.arong.pawfolio.features.users.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository
            userRepository;

    public UserService(
            UserRepository userRepository
    ) {

        this.userRepository =
                userRepository;

    }

    /* UPDATE PROFILE */

    public User updateProfile(
            Long id,
            User updatedUser
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow();

        user.setName(
                updatedUser.getName()
        );

        user.setEmail(
                updatedUser.getEmail()
        );

        return userRepository.save(user);

    }

    /* UPDATE IMAGE */

    public User updateProfileImage(
            Long id,
            String image
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow();

        user.setImage(image);

        return userRepository.save(user);

    }

}