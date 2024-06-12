package clothes.controller;

import clothes.entity.Cart;
import clothes.entity.User;
import clothes.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class UserAdminController {
    private UserService userService;
    public UserAdminController(UserService userService){
        this.userService = userService;
    }
    @GetMapping("/getallcustomer")
    public List<User> getCustomer(){
        return  userService.getAllCustomer();
    }
    @GetMapping("/getallcustomer/{id}")
    public User getCustomerById(@PathVariable int id){
        return  userService.getCustomerById(id);
    }
    @PutMapping("/getallcustomer/{id}")
    public ResponseEntity<User> updateCustomerById(@PathVariable int id,@RequestBody User userRequest){
        User user = userService.getCustomerById(id);
        BeanUtils.copyProperties(userRequest,user);
        userService.saveCustomer(user);
        return  ResponseEntity.ok(user);
    }
    @PostMapping("/getallcustomer")
    public ResponseEntity<?> createCustomer(@RequestBody User user){
        return userService.createCustomer(user);
    }
    @GetMapping("/getalladmin")
    public List<User> getAdmin(){
        return  userService.getAllAdmin();
    }
    @GetMapping("/getalladmin/{id}")
    public User getAdminById(@PathVariable int id){
        return  userService.getAdminById(id);
    }
    @PutMapping("/getalladmin/{id}")
    public ResponseEntity<User> updateAdminById(@PathVariable int id,@RequestBody User userRequest){
        User user = userService.getAdminById(id);
        BeanUtils.copyProperties(userRequest,user);
        userService.saveAdmin(user);
        return  ResponseEntity.ok(user);
    }
    @PostMapping("/getalladmin")
    public ResponseEntity<?> createAdmin(@RequestBody User user){
        return userService.createAdmin(user);
    }


}
