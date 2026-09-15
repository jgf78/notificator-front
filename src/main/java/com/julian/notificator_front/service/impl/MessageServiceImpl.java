package com.julian.notificator_front.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.julian.notificator_front.model.MessageRequest;
import com.julian.notificator_front.service.MessageService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MessageServiceImpl implements MessageService {

    private final RestClient restClient;

    private final String messagesPath;
    private final String sendPinPath;
    private final String sendPollPath;

    public MessageServiceImpl(
            RestClient.Builder restClientBuilder,
            @Value("${notificator.api.url}") String notificatorApiUrl,
            @Value("${notificator.api.messages-path}") String messagesPath,
            @Value("${notificator.api.send-pin-path}") String sendPinPath,
            @Value("${notificator.api.send-poll-path}") String sendPollPath) {

        this.restClient = restClientBuilder
                .baseUrl(notificatorApiUrl)
                .build();

        this.messagesPath = messagesPath;
        this.sendPinPath = sendPinPath;
        this.sendPollPath = sendPollPath;
    }

    @Override
    public void sendMessage(MessageRequest messageRequest) {
        
        log.info("ENVIANDO NORMAL: {}", messageRequest);

        restClient.post()
                .uri(messagesPath)
                .contentType(MediaType.APPLICATION_JSON)
                .body(messageRequest)
                .retrieve()
                .toBodilessEntity();
    }

    @Override
    public void sendPinMessage(MessageRequest messageRequest) {
        
        log.info("ENVIANDO ANCLADO: {}", messageRequest);

        restClient.post()
                .uri(sendPinPath)
                .contentType(MediaType.APPLICATION_JSON)
                .body(messageRequest)
                .retrieve()
                .toBodilessEntity();
    }

    @Override
    public void sendPoll(MessageRequest messageRequest) {
        
        log.info("ENVIANDO ENCUESTA: {}", messageRequest);

        restClient.post()
                .uri(sendPollPath)
                .contentType(MediaType.APPLICATION_JSON)
                .body(messageRequest.getTelegramPollRequest())
                .retrieve()
                .toBodilessEntity();
    }
}
