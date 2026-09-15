package com.julian.notificator_front.model.telegram;

import java.util.List;

import lombok.Data;

@Data
public class TelegramPollRequest {

    private String question;

    private List<String> options;

    private boolean anonymous = true;

    private boolean multipleAnswers = false;

    private String type = "regular";

    private Integer correctOptionId;
}

