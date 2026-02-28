package com.examly.springapp.dto;

import com.examly.springapp.model.User;

public record UserDto(
    Integer userId ,
    String email ,
    String username ,
    String mobileNumber ,
    String userRole ,
    Boolean approved 
) {
  
    public static User toEntity(UserDto userDto)
    { 

          User.UserBuilder builder = User.builder().
          email(userDto.email()).
          username(userDto.username()).mobileNumber(userDto.mobileNumber()).
          userRole(userDto.userRole()).approved(userDto.approved());
  

                    if(userDto.userId() != null )
                    {
                        builder.userId(userDto.userId());
                    }
    
            
            return builder.build();
            
    }
    
public static UserDto fromEntity(User user) {
    return new UserDto(
        user.getUserId(),
        user.getEmail(),
        user.getUsername(),
        user.getMobileNumber(),
        user.getUserRole(),
        user.isApproved()
    );
}


}
