package com.example.beckendreportingpengadaan.Nota;

import java.io.IOException;

public interface NotaService {

    NotaResponseDTO getByOrderId(String orderId);
    NotaResponseDTO createNota(NotaRequestDTO requestDTO) throws IOException;
}
