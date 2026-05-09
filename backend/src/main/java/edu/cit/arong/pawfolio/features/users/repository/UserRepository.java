package edu.cit.arong.pawfolio.features.users.repository;

import edu.cit.arong.pawfolio.features.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}