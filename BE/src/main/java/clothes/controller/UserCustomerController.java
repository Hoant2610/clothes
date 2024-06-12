package clothes.controller;

import clothes.dto.ChangePassRequest;
import clothes.entity.User;
import clothes.service.UserService;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "*")
public class UserCustomerController {
    private UserService userService;
    public UserCustomerController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public User getCustomerByUsername(@PathVariable String username){
        return userService.findUserByUsername(username);
    }
    @PutMapping("/{username}")
    public ResponseEntity<?> updateCustomerByUsername(@PathVariable String username,@RequestBody User updateUser){
        return userService.updateCustomer(username,updateUser);
    }
    @PutMapping("/changePass/{username}")
    public ResponseEntity<?> changePass(@PathVariable String username,@RequestBody ChangePassRequest changePassRequest){
        return userService.changePassword(username,changePassRequest);
    }
}
