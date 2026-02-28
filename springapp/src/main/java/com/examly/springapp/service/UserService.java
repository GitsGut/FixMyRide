package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.dto.LoginRequestDto;
import com.examly.springapp.dto.RegisterDto;
import com.examly.springapp.dto.UserDto;
import com.examly.springapp.model.LoginDTO;

public interface UserService {

    RegisterDto createUser(RegisterDto userDto);
    List<UserDto> findAllUsers();
    UserDto getByUserId(int userId);
    void deleteUser(int userId);
    UserDto updateUser(UserDto userDto);
    Optional<UserDto> getUserByName(String name);
      public LoginDTO loginUser(LoginRequestDto user);
      public UserDto updateApprovalStatus(UserDto userDto);

}
