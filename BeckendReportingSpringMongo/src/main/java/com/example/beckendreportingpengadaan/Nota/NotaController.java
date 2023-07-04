package com.example.beckendreportingpengadaan.Nota;

import com.example.beckendreportingpengadaan.Exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/notas")
public class NotaController {

    @Autowired
    private NotaService notaService;

    @PostMapping
    public ResponseEntity<NotaResponseDTO> createNota(@RequestParam("orderId") String orderId,
                                                      @RequestParam("files") List<MultipartFile> files) {
        try {
            NotaRequestDTO requestDTO = new NotaRequestDTO();
            requestDTO.setOrderId(orderId);
            requestDTO.setFiles(files);

            NotaResponseDTO responseDTO = notaService.createNota(requestDTO);
            return ResponseEntity.ok(responseDTO);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<NotaResponseDTO> getNotaByOrderId(@PathVariable String orderId) {
        try {
            NotaResponseDTO responseDTO = notaService.getByOrderId(orderId);
            return ResponseEntity.ok(responseDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
