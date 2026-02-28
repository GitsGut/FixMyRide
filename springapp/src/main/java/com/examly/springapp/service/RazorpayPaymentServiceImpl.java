package com.examly.springapp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.AppointmentDto;
import com.examly.springapp.dto.RazorpayPaymentDto;
import com.examly.springapp.exception.PaymentNotFoundException;
import com.examly.springapp.model.RazorpayPayment;
import com.examly.springapp.repository.RazorpayPaymentRepo;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;


@Service
public class RazorpayPaymentServiceImpl implements RazorpayPaymentService {


   
    private final RazorpayPaymentRepo   razorpayPaymentRepo;
    
    @Autowired
    public RazorpayPaymentServiceImpl(RazorpayPaymentRepo razorpayPaymentRepo)
    {
       this.razorpayPaymentRepo = razorpayPaymentRepo ;
    }

    @Value("${razorpay.api.key}")
    private String apikey ;


    @Value("${razorpay.api.secret}")
    private String apiSecret ;


 
   @Override
public RazorpayPaymentDto createPayment(RazorpayPaymentDto dto) {
    
       try{
         RazorpayClient razorpayClient = new RazorpayClient(apikey, apiSecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", dto.amount() * 100); // Razorpay expects amount in paise
        orderRequest.put("currency", dto.currency());
        orderRequest.put("receipt", dto.appointment().appointmentId().toString()); // Use appointment ID as receipt

        Order order = razorpayClient.orders.create(orderRequest);

        // Step 2: Prepare entity
        RazorpayPayment entity = RazorpayPaymentDto.toEntity(dto);
        entity.setOrderId(order.get("id")); 
        entity.setStatus("Paid"); 
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());

        // Step 3: Save to DB
        RazorpayPayment saved =   razorpayPaymentRepo.save(entity);

        // Step 4: Return DTO
        return RazorpayPaymentDto.fromEntity(saved);

    } catch (RazorpayException e) {
        throw new PaymentNotFoundException("Failed to create Razorpay order: ");
    }
}

    @Override
    public RazorpayPaymentDto getPaymentById(Long id) {
        RazorpayPayment payment =   razorpayPaymentRepo.findById(id)
            .orElseThrow(() -> new PaymentNotFoundException("Payment not found"));
        return RazorpayPaymentDto.fromEntity(payment);
    }

    @Override
    public List<RazorpayPaymentDto> getAllPayments() {
        return   razorpayPaymentRepo.findAll().stream()
            .map(RazorpayPaymentDto::fromEntity)
            .collect(Collectors.toList());
    }

    @Override
    public RazorpayPaymentDto updatePayment(Long id, RazorpayPaymentDto dto) {
        RazorpayPayment existing =   razorpayPaymentRepo.findById(id)
            .orElseThrow(() -> new PaymentNotFoundException("Payment not found"));

        existing.setPaymentId(dto.paymentId());
        existing.setOrderId(dto.orderId());
        existing.setSignature(dto.signature());
        existing.setCurrency(dto.currency());
        existing.setStatus(dto.status());
        existing.setAmount(dto.amount());
        existing.setCreatedAt(dto.createdAt());
        existing.setUpdatedAt(dto.updatedAt());
        existing.setAppointment(AppointmentDto.toEntity(dto.appointment()));

        RazorpayPayment updated =   razorpayPaymentRepo.save(existing);
        return RazorpayPaymentDto.fromEntity(updated);
    }
    
    @Override
    public RazorpayPaymentDto createCashPayment(RazorpayPaymentDto dto)
    {
        RazorpayPayment saved =   razorpayPaymentRepo.save(RazorpayPaymentDto.toEntity(dto));
        return RazorpayPaymentDto.fromEntity(saved);
    }

    @Override
    public void deletePayment(Long id) {
       razorpayPaymentRepo.deleteById(id);
    }

    
@Override
public RazorpayPaymentDto getPaymentByAppointmentId(Long appointmentId) {
    RazorpayPayment payment = razorpayPaymentRepo
        .findByAppointmentId(appointmentId)
        .orElseThrow(() -> new PaymentNotFoundException(
            "Payment not found for appointmentId: " + appointmentId));

    return RazorpayPaymentDto.fromEntity(payment);
}

}

