package com.examly.springapp.dto;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.model.VehicleMaintenance;

public record FeedbackDto(
    Long feedbackId,
    String message,
    int rating,
    UserDto user,
    VehicleMaintenanceDto service
) {

    // Convert DTO to Entity
    public static Feedback toEntity(FeedbackDto dto, User user, VehicleMaintenance service) {
        Feedback.FeedbackBuilder builder = Feedback.builder()
            .message(dto.message())
            .rating(dto.rating())
            .user(user)
            .service(service);

        if (dto.feedbackId() != null) {
            builder.feedbackId(dto.feedbackId());
        }

        return builder.build();
    }

    // Convert Entity to DTO
    public static FeedbackDto fromEntity(Feedback feedback) {
        UserDto user = UserDto.fromEntity(feedback.getUser());
        VehicleMaintenanceDto service = VehicleMaintenanceDto.fromEntity(feedback.getService());

        return new FeedbackDto(
            feedback.getFeedbackId(),
            feedback.getMessage(),
            feedback.getRating(),
            user,
            service
        );
    }
}