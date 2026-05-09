package edu.cit.arong.pawfolio.Controller;

import edu.cit.arong.pawfolio.Model.User;
import edu.cit.arong.pawfolio.Service.UserService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(
        origins = "http://localhost:5173"
)
public class UserController {

    private final UserService
            userService;

    public UserController(
            UserService userService
    ) {

        this.userService =
                userService;
    }

    @PutMapping("/{id}/image")
    public User updateProfileImage(

            @PathVariable Long id,

            @RequestBody
            Map<String, String> body

    ) {

        return userService
                .updateProfileImage(
                        id,
                        body.get("image")
                );
    }

    @PutMapping("/{id}")
    public User updateProfile(

            @PathVariable Long id,

            @RequestBody User updatedUser

    ) {

        return userService.updateProfile(
                id,
                updatedUser
        );

    }
}