package edu.cit.arong.pawfolio.Repository;

import edu.cit.arong.pawfolio.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}