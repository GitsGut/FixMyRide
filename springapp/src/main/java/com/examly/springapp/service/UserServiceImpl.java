package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.dto.LoginRequestDto;
import com.examly.springapp.dto.RegisterDto;
import com.examly.springapp.dto.UserDto;
import com.examly.springapp.exception.AdminNotApprovedException;
import com.examly.springapp.exception.EmailAlreadyExistException;
import com.examly.springapp.exception.MobileNumberAlreadyExistException;
import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.exception.UsernameAlreadyExistException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;




@Service
public class UserServiceImpl implements UserService {
 private final UserRepo userRepo ;
 private final  JwtUtils jwtUtils ;
 private final  PasswordEncoder passwordEncoder ;

@Autowired
   public UserServiceImpl( UserRepo userRepo , JwtUtils jwtUtils , PasswordEncoder passwordEncoder )
   {
     this.userRepo = userRepo ;
     this.jwtUtils = jwtUtils ;
     this.passwordEncoder = passwordEncoder;

   }


 

@Override
public RegisterDto createUser(RegisterDto registerDto) {
   if(userRepo.findByEmail(registerDto.email()).isPresent())
  {
    throw new EmailAlreadyExistException("User with Email : "+registerDto.email()+" Already exist.");
  }
  if(userRepo.findByMobileNumber(registerDto.mobileNumber()).isPresent())
  {
    throw new MobileNumberAlreadyExistException("User with MobileNumber : "+registerDto.mobileNumber()+" Already exist.");
  }
  if(userRepo.findByUsername(registerDto.username()).isPresent())
  {
    throw new UsernameAlreadyExistException("User with Username : "+registerDto.username()+" Already exist.");
  }
  User newUser = RegisterDto.toEntity(registerDto) ;
  newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

  User savedUser = userRepo.save(newUser);
  return RegisterDto.fromEntity(savedUser);
}



    @Override
    public LoginDTO loginUser(LoginRequestDto user) {
        User existingUser = userRepo.findByUsername(user.getUsername()).orElse(null);

      
        if(existingUser == null)
        {
            throw new UserNotFoundException("User Does not Exists");
        }
        if(passwordEncoder.matches(user.getPassword(),existingUser.getPassword()))
        {
          if(existingUser.getUserRole().equals("ADMIN")  && !existingUser.isApproved())
          {
            throw new AdminNotApprovedException("Admin Not Approved Please Contact Super Admin");
          }
          return  new LoginDTO(jwtUtils.generateToken(user.getUsername()),
          existingUser.getUsername(),existingUser.getUserRole(),existingUser.getUserId());      
        }
        else
        {
            throw new UsernameNotFoundException("Invalid credentials");
        }

    }

    @Override
   public UserDto updateApprovalStatus(UserDto userDto) {

    if (userDto!=null) {
           Optional<User> optUser = userRepo.findById(userDto.userId()) ;
           if(optUser.isEmpty())
           { 
            throw new UserNotFoundException("Not Found");
           }
           User user = optUser.get();
           user.setApproved(!userDto.approved());
            userRepo.save(user);
            return UserDto.fromEntity(user);
    } else {
        throw new UserNotFoundException("Not Found");
    }
}


@Override
public List<UserDto> findAllUsers() {
 
  List<User> userList = userRepo.findAll();
    if(userList.isEmpty())
    {
         throw new  UserNotFoundException("No Users Found");
    }
    else 
    {
        return  userList.stream().map(UserDto::fromEntity).collect(Collectors.toList()) ;
    }
}



@Override
public UserDto getByUserId(int userId) {
   Optional<User> user = userRepo.findById(userId);

   if(user.isEmpty())
   {
    throw new  UserNotFoundException("User with Id: "+userId+" Not Exists.");
   }
   else{
    return UserDto.fromEntity(user.get());
   }
}

@Override
public void deleteUser(int userId) {
   if(userRepo.existsById(userId))
   {
    userRepo.deleteById(userId);
   }
   else{
    throw new  UserNotFoundException("User with Id: "+userId+" Not Exists.");
   }
}

@Override
public UserDto updateUser(UserDto userDto) {
  
  Optional<User> user = userRepo.findById(userDto.userId());

  if(user.isPresent())
  {
    User newUser = UserDto.toEntity(userDto);
    newUser.setPassword(user.get().getPassword());

    User savedUser = userRepo.save(newUser);

    return UserDto.fromEntity(savedUser);
  }
  

    else{
     throw new  UserNotFoundException("User with Id: "+userDto.userId()+" Not Exists.");

    }
}

@Override
public Optional<UserDto> getUserByName(String name) {
 Optional<User> foundUser = userRepo.findByUsername(name) ;
if(foundUser.isPresent())
{
    return foundUser.map(UserDto::fromEntity) ;
}
else{
 throw new  UserNotFoundException("User with name: "+name+" Not Exists.");
}
}


}








