package com.example.pengadaanrsudsamrat.UTIL;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import java.io.IOException;

@Slf4j
public class LoggingRequestInterceptor implements ClientHttpRequestInterceptor {

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        traceRequest(request, body);
        ClientHttpResponse response = execution.execute(request, body);
        traceResponse(response);
        return response;
    }

    private void traceRequest(HttpRequest request, byte[] body) {
        log.debug("=========================== Request Begin ===========================");
        log.debug("URI         : {}", request.getURI());
        log.debug("Method      : {}", request.getMethod());
        log.debug("Headers     : {}", request.getHeaders());
        log.debug("Request Body: {}", new String(body));
        log.debug("============================ Request End ============================");
    }

    private void traceResponse(ClientHttpResponse response) throws IOException {
        log.debug("=========================== Response Begin ===========================");
        log.debug("Status code  : {}", response.getStatusCode());
        log.debug("Headers      : {}", response.getHeaders());
        // Read the response body if needed
        // String responseBody = StreamUtils.copyToString(response.getBody(), StandardCharsets.UTF_8);
        // logger.debug("Response Body: {}", responseBody);
        log.debug("============================ Response End ============================");
    }
}
