package com.julian.notificator_front.model.telegram;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessagePayload {

    private String file;

    private String filename;

    private boolean pin;
}
