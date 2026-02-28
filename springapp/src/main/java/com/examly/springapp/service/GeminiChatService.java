package com.examly.springapp.service;
 
import com.google.genai.Client;
import com.google.genai.Chat;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
 
@Service
public class GeminiChatService {
 
    // 1. Inject the API Key from application.properties
    @Value("${gemini.api.key}")
    private String apiKey;
 
    
    private   Chat chatSession;


 
    // 2. Initialize the Client and Chat Session after Spring creates the bean
    @PostConstruct
    public void init() {
        Client geminiClient;
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalArgumentException("Gemini API Key is missing or invalid in application.properties.");
        }
        
        // Build the Client explicitly using the injected API key
        geminiClient = Client.builder()
                                  .apiKey(apiKey)
                                  .build();
 
        // Create a persistent chat session
        String modelName = "gemini-2.5-flash"; 
        this.chatSession = geminiClient.chats.create(modelName);
        
    }
 
    /**
     * Sends a message to the persistent chat session and returns the response.
     * @param userPrompt The message from the user.
     * @return The AI's generated response text.
     */
    public String getResponse(String userPrompt) {
        try {
            // Send the message using the chat session
            
    String domainPrompt = """
        You are a helpful assistant for a vehicle service website.
        Only answer questions related to vehicle servicing, repairs, maintenance, pricing, appointment booking, or related topics.
        If the question is unrelated, politely respond that you can only assist with vehicle service-related queries.

        User: %s
    """.formatted(userPrompt);

            GenerateContentResponse response = chatSession.sendMessage(domainPrompt);

          
            
            // Return the text content of the response
            return response.text();
        } catch (Exception e) {
            return "Sorry, I am currently unable to respond to your request.";
        }
    }
}
 