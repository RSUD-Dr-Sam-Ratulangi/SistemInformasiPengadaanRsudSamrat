package com.example.beckendreportingpengadaan.FakturOrder;

import com.example.beckendreportingpengadaan.Exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/faktur-orders")
public class FakturOrderController {
    @Autowired
    private FakturOrderService fakturOrderService;

    @PostMapping
    public ResponseEntity<ResponseFakturOrderDTO> createFakturOrder(@RequestParam("orderId") String orderId,
                                                                    @RequestParam("files") List<MultipartFile> files) {
        try {
            CreateFakturOrderDTO createDTO = new CreateFakturOrderDTO();
            createDTO.setOrderId(orderId);
            createDTO.setFiles(files);

            ResponseFakturOrderDTO responseDTO = fakturOrderService.createFakturOrder(createDTO);
            return ResponseEntity.ok(responseDTO);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ResponseFakturOrderDTO> getFakturOrderByOrderId(@PathVariable String orderId) {
        try {
            ResponseFakturOrderDTO responseDTO = fakturOrderService.getByOrderId(orderId);
            return ResponseEntity.ok(responseDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
