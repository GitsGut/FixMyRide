package com.examly.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Feedback;

public interface FeedbackRepo extends JpaRepository<Feedback,Long>{

    @Query("select f from Feedback f where f.user.userId = :userId")
    public List<Feedback> findFeedbackByUserId(int userId);

    @Query("select f from Feedback f where f.service.serviceId = :serviceId")
    public List<Feedback> findFeedbackByServiceId(Long serviceId);

}
