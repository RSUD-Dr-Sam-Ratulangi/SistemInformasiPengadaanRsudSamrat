package com.example.beckendreportingpengadaan.FakturOrder;

import java.io.IOException;

public interface FakturOrderService {


    ResponseFakturOrderDTO createFakturOrder(CreateFakturOrderDTO createDTO) throws IOException;
    ResponseFakturOrderDTO getByOrderId(String orderId);

}
