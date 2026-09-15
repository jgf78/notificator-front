package com.julian.notificator_front.service;

import com.julian.notificator_front.model.MessageRequest;

public interface MessageService {

    void sendMessage(MessageRequest messageRequest);

}
