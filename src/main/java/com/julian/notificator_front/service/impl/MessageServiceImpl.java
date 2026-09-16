package com.julian.notificator_front.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

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

    private final String sendFilePath;

    public MessageServiceImpl(

            RestClient.Builder restClientBuilder,

            @Value("${notificator.api.url}") String notificatorApiUrl,

            @Value("${notificator.api.messages-path}") String messagesPath,

            @Value("${notificator.api.send-pin-path}") String sendPinPath,

            @Value("${notificator.api.send-poll-path}") String sendPollPath,

            @Value("${notificator.api.send-file-path}") String sendFilePath) {

        this.restClient = restClientBuilder
                .baseUrl(notificatorApiUrl)
                .build();

        this.messagesPath = messagesPath;

        this.sendPinPath = sendPinPath;

        this.sendPollPath = sendPollPath;

        this.sendFilePath = sendFilePath;
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

    @Override
    public void sendFile(
            MessageRequest messageRequest,
            MultipartFile file) {

        log.info("ENVIANDO MENSAJE CON ARCHIVO: {}", messageRequest);

        try {

            MultipartBodyBuilder builder =
                    new MultipartBodyBuilder();

            builder
                    .part(
                            "message",
                            messageRequest.getMessage()
                    );

            builder
                    .part(
                            "destination",
                            messageRequest
                                    .getDestination()
                                    .name()
                    );

            if (messageRequest.getDestinationTelegram() != null) {

                builder
                        .part(
                                "destinationTelegram",
                                messageRequest
                                        .getDestinationTelegram()
                                        .name()
                        );
            }

            if (file != null && !file.isEmpty()) {

                builder
                        .part(
                                "file",
                                file.getResource()
                        )
                        .filename(file.getOriginalFilename());

                builder
                        .part(
                                "filename",
                                file.getOriginalFilename()
                        );
            }
            
            MultiValueMap<String, org.springframework.http.HttpEntity<?>> body =
                    builder.build();

            restClient.post()
                    .uri(sendFilePath)
                    .contentType(
                            MediaType.MULTIPART_FORM_DATA
                    )
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();

            log.info("ARCHIVO ENVIADO CORRECTAMENTE");

        } catch (Exception e) {

            System.err.println(
                    "ERROR ENVIANDO ARCHIVO: "
                            + e.getMessage()
            );

            log.error(
                    "ERROR ENVIANDO ARCHIVO: {}",
                    e.getMessage()
            );

            throw new RuntimeException(
                    "Error enviando archivo",
                    e
            );
        }
    }
}
