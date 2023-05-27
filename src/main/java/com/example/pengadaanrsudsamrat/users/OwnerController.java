package com.example.pengadaanrsudsamrat.users;

import com.example.pengadaanrsudsamrat.users.DTO.OwnerRequestDTO;
import com.example.pengadaanrsudsamrat.users.DTO.OwnerResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/owners")
public class OwnerController {


    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping("/login")
    public ResponseEntity<OwnerResponseDTO> login(@RequestBody OwnerRequestDTO ownerRequestDTO) {
        OwnerResponseDTO ownerResponseDTO = ownerService.login(ownerRequestDTO);
        if (ownerResponseDTO != null) {
            return ResponseEntity.ok(ownerResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


}

