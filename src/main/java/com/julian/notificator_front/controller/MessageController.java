package com.julian.notificator_front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.julian.notificator_front.model.DestinationType;
import com.julian.notificator_front.model.MessageRequest;
import com.julian.notificator_front.model.telegram.DestinationTelegramType;
import com.julian.notificator_front.service.MessageService;

import jakarta.validation.Valid;

@Controller
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/")
    public String index(Model model) {

        model.addAttribute("messageRequest", new MessageRequest());

        model.addAttribute("destinations", DestinationType.values());

        model.addAttribute("telegramDestinations",
                DestinationTelegramType.values());

        return "index";
    }

    @PostMapping("/send")
    public String send(
            @Valid MessageRequest messageRequest) {

        messageService.sendMessage(messageRequest);

        return "redirect:/";
    }
}