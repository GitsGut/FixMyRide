package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.FeedbackDto;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.model.VehicleMaintenance;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.repository.VehicleServiceRepo;

import jakarta.persistence.EntityNotFoundException;


@Service
public class FeedbackServiceImpl implements FeedbackService{
    private final FeedbackRepo feedbackRepo;
    private final UserRepo userRepo;
    private final VehicleServiceRepo vehicleServiceRepo;
    @Autowired 
    public FeedbackServiceImpl(FeedbackRepo feedbackRepo , UserRepo userRepo ,VehicleServiceRepo vehicleServiceRepo ){
        this.feedbackRepo = feedbackRepo;
        this.userRepo = userRepo;
        this.vehicleServiceRepo = vehicleServiceRepo;
    }
    @Override
    public FeedbackDto createFeedback(FeedbackDto feedback) {
        Optional<User> usert = userRepo.findById(feedback.user().userId()) ;



        if(usert.isEmpty()){
            throw new EntityNotFoundException("User not found");
        }

        User user = usert.get();

        Optional<VehicleMaintenance> servicet = vehicleServiceRepo.findById(feedback.service().serviceId());
        if(servicet.isEmpty()){
            throw new EntityNotFoundException("Service not found");
        }
        VehicleMaintenance service = servicet.get();
        Feedback savedFeedback = feedbackRepo.save(FeedbackDto.toEntity(feedback, user, service));
        return FeedbackDto.fromEntity(savedFeedback) ;
    }
    @Override
    public List<FeedbackDto> getAllFeedbacks() {
        List<Feedback> list = feedbackRepo.findAll();
        List<FeedbackDto> dtoList = new ArrayList<>();
        for(Feedback feedback : list){
            dtoList.add(FeedbackDto.fromEntity(feedback));
        }
        return dtoList;
    }
    @Override
    public FeedbackDto updateFeedback(Long feedbackId, FeedbackDto feedbackDto) {
        Optional<Feedback> optionalFeedback = feedbackRepo.findById(feedbackId);
        if (optionalFeedback.isEmpty()) {
            throw new EntityNotFoundException("Feedback not found");
        }
    
        Feedback feedback = optionalFeedback.get();
        feedback.setMessage(feedbackDto.message());
        feedback.setRating(feedbackDto.rating());
    
        Integer newUserId = feedbackDto.user().userId();
        Integer currentUserId = feedback.getUser().getUserId();
    
        if (!newUserId.equals(currentUserId)) {
            Optional<User> optionalUser = userRepo.findById(newUserId);
            if (optionalUser.isEmpty()) {
                throw new EntityNotFoundException("User not found");
            }
            feedback.setUser(optionalUser.get());
        }
    
        Feedback updated = feedbackRepo.save(feedback);
        return FeedbackDto.fromEntity(updated);
    }
    @Override
    public FeedbackDto deleteFeedback(Long feedbackId) {
        Optional<Feedback> feedbackt = feedbackRepo.findById(feedbackId);
        if(feedbackt.isEmpty())
        {
            throw new EntityNotFoundException("Feedback not found");
        }

       Feedback feedback = feedbackt.get();
        feedbackRepo.delete(feedback);
        return FeedbackDto.fromEntity(feedback);
    }
    @Override
    public List<FeedbackDto> getFeedbackByUserId(int userId) {
        List<Feedback> list = feedbackRepo.findFeedbackByUserId(userId);
        List<FeedbackDto> dtoList = new ArrayList<>();
        for(Feedback feedback : list){
            dtoList.add(FeedbackDto.fromEntity(feedback));
        }
        return dtoList;
    }
    @Override
    public List<FeedbackDto> getFeedbackByServiceId(Long serviceId) {
        List<Feedback> list = feedbackRepo.findFeedbackByServiceId(serviceId);
        List<FeedbackDto> dtoList = new ArrayList<>();
        for(Feedback feedback : list){
            dtoList.add(FeedbackDto.fromEntity(feedback));
        }
        return dtoList;
    }

    
}
