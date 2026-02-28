package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.LoginRequestDto;
import com.examly.springapp.dto.RegisterDto;
import com.examly.springapp.dto.UserDto;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.service.OtpService;
import com.examly.springapp.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final OtpService otpService;

    @Autowired
    public UserController(UserService userService, OtpService otpService) {
        this.userService = userService;
        this.otpService = otpService;
    }
    
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PutMapping("/user/approval")
    public UserDto updateApprovalStatus(@RequestBody UserDto userDto) {

        return userService.updateApprovalStatus(userDto);

    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterDto registerUser(@RequestBody RegisterDto userDto) {
        otpService.generateOtp(userDto.email());
        return userService.createUser(userDto);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginDTO login(@RequestBody LoginRequestDto dto) {
        return userService.loginUser(dto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDto> getAllUser() {
        return userService.findAllUsers();
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/user/view/profile")
    @ResponseStatus(HttpStatus.OK)
    public UserDto updateUser(@RequestBody UserDto userDto) {
        return userService.updateUser(userDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER','SUPER_ADMIN')")
    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public UserDto getUserById(@PathVariable int userId) {
        return userService.getByUserId(userId);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @GetMapping("/name/{name}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<UserDto> getUserByName(@PathVariable String name) {
        return userService.getUserByName(name);
    }

}
