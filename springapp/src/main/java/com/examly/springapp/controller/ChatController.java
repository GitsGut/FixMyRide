package com.examly.springapp.controller;
 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.service.GeminiChatService;
 
// Request body model for user input
record ChatRequest(String message) {}
 
// Response body model for AI output
record ChatResponse(String response) {}
 
@RestController
@RequestMapping("/api/gemini")
public class ChatController {
 
    private final GeminiChatService chatService;
 
    // Use constructor injection to get the service bean
    public ChatController(GeminiChatService chatService) {
        this.chatService = chatService;
    }
 
    /**
     * POST endpoint for sending a message to the chatbot.
     * Access via: POST http://localhost:8080/api/gemini/chat
     * Request Body: {"message": "Hello, how do you work?"}
     */
    @PostMapping("/ask")
    public ResponseEntity<ChatResponse> handleChat(@RequestBody ChatRequest request) {
        if (request.message() == null || request.message().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(new ChatResponse("Message cannot be empty."));
        }   
        
        // Get the response from the chat service, which handles the API call
        String aiResponse = chatService.getResponse(request.message());
        
        // Return a 200 OK response with the AI's reply
        return ResponseEntity.ok(new ChatResponse(aiResponse));
    }
}
 