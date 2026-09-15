package com.julian.notificator_front.model;

import com.julian.notificator_front.model.telegram.DestinationTelegramType;
import com.julian.notificator_front.model.telegram.MessagePayload;
import com.julian.notificator_front.model.telegram.TelegramPollRequest;

import lombok.Data;

@Data
public class MessageRequest {

    private String message;

    private DestinationType destination = DestinationType.ALL;

    private DestinationTelegramType destinationTelegram =
            DestinationTelegramType.ALL;

    private TelegramPollRequest telegramPollRequest;

    private MessagePayload messagePayload =
            new MessagePayload();
}