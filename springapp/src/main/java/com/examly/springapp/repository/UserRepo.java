package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.User;

public interface UserRepo extends JpaRepository<User,Integer> {
 

  @Query("select u from User u where u.email like  :email")
  public Optional<User> findByEmail(String email);

  @Query("select u from User u where u.username like  :username")
  public Optional<User> findByUsername(String username);

  
  @Query("select u from User u where u.mobileNumber like  :mobileNumber")
  public Optional<User> findByMobileNumber(String mobileNumber);




}
