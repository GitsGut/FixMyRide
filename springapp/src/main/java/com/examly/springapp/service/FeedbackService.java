package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.FeedbackDto;

public interface FeedbackService {
 public FeedbackDto createFeedback(FeedbackDto feedback);
     public List<FeedbackDto> getAllFeedbacks();
    public FeedbackDto updateFeedback(Long feedbackId , FeedbackDto feedback);
    public FeedbackDto deleteFeedback(Long feedbackId);
    public List<FeedbackDto> getFeedbackByUserId(int userId);
    public List<FeedbackDto> getFeedbackByServiceId(Long serviceId);
}
