package com.julian.notificator_front.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.julian.notificator_front.model.MessageRequest;
import com.julian.notificator_front.service.MessageService;

@Service
public class MessageServiceImpl implements MessageService {

    private final RestClient restClient;

    private final String messagesPath;

    public MessageServiceImpl(
            RestClient.Builder restClientBuilder,
            @Value("${notificator.api.url}") String notificatorApiUrl,
            @Value("${notificator.api.messages-path}") String messagesPath) {

        this.restClient = restClientBuilder
                .baseUrl(notificatorApiUrl)
                .build();

        this.messagesPath = messagesPath;
    }

    @Override
    public void sendMessage(MessageRequest messageRequest) {

        restClient.post()
                .uri(messagesPath)
                .contentType(MediaType.APPLICATION_JSON)
                .body(messageRequest)
                .retrieve()
                .toBodilessEntity();
    }
}
