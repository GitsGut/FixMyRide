package com.examly.springapp.controller;

import com.examly.springapp.dto.FeedbackDto;
import com.examly.springapp.exception.FeedbackNotFoundException;
import com.examly.springapp.service.FeedbackServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackServiceImpl service;

    @Autowired
    public FeedbackController(FeedbackServiceImpl service) {
        this.service = service;
    }
   

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FeedbackDto createFeedback(@RequestBody FeedbackDto feedback) {
        return service.createFeedback(feedback);
    }
  
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FeedbackDto> getAllFeedbacks() {
        List<FeedbackDto> list = service.getAllFeedbacks();
        if (list.isEmpty()) {
            throw new FeedbackNotFoundException("Feedback list is empty");
        }
        return list;
    }
   
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @PutMapping("/{feedbackId}")
    @ResponseStatus(HttpStatus.OK)
    public FeedbackDto updateFeedback(@PathVariable Long feedbackId, @RequestBody FeedbackDto feedback) {
        return service.updateFeedback(feedbackId, feedback);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN')")
    @DeleteMapping("/{feedbackId}")
    @ResponseStatus(HttpStatus.OK)
    public FeedbackDto deleteFeedback(@PathVariable Long feedbackId) {
        return service.deleteFeedback(feedbackId);
    }
  

    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','USER')")
    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<FeedbackDto> getFeedbackByUserId(@PathVariable int userId) {
        List<FeedbackDto> list = service.getFeedbackByUserId(userId);
        if (list.isEmpty()) {
            throw new FeedbackNotFoundException("No feedback found for user ID: " + userId);
        }
        return list;
    }

    
    @PreAuthorize("hasAnyRole('ADMIN','SUPER_ADMIN','USER')")
@GetMapping("/service/{serviceId}")
@ResponseStatus(HttpStatus.OK)
public List<FeedbackDto> getFeedbackByServiceId(@PathVariable Long serviceId) {
    List<FeedbackDto> list = service.getFeedbackByServiceId(serviceId);
    if (list.isEmpty()) {
        throw new FeedbackNotFoundException("No feedback found for service ID: " + serviceId);
    }
    return list;
}

}
