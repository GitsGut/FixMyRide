package com.examly.springapp.dto;

import com.examly.springapp.model.User;

public record RegisterDto( 
Integer userId ,
String email ,
String password ,
String username ,
String mobileNumber ,
String userRole ) {

  
    public static User toEntity(RegisterDto registerDto)
    { 

          User.UserBuilder builder = User.builder().
          email(registerDto.email()).password(registerDto.password()).
          username(registerDto.username()).mobileNumber(registerDto.mobileNumber()).
          userRole(registerDto.userRole());
  

                    if(registerDto.userId() != null )
                    {
                        builder.userId(registerDto.userId());
                    }
    
            
            return builder.build();
            
    }
    
public static RegisterDto fromEntity(User user) {
    return new RegisterDto(
        user.getUserId(),
        user.getEmail(),
        user.getPassword(),
        user.getUsername(),
        user.getMobileNumber(),
        user.getUserRole()
    );
}


}


