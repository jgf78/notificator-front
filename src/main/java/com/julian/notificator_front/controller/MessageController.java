package com.julian.notificator_front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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

        model.addAttribute(
                "messageRequest",
                new MessageRequest()
        );

        model.addAttribute(
                "destinations",
                DestinationType.values()
        );

        model.addAttribute(
                "telegramDestinations",
                DestinationTelegramType.values()
        );

        return "index";
    }

    @PostMapping("/send")
    public String send(
            @Valid MessageRequest messageRequest,
            @RequestParam(
                    name = "telegramAction",
                    defaultValue = "NORMAL"
            ) String telegramAction,
            RedirectAttributes redirectAttributes) {

        try {

            if (messageRequest.getDestination() != DestinationType.TELEGRAM) {

                messageRequest.setTelegramPollRequest(null);

                messageService.sendMessage(messageRequest);

            } else {

                switch (telegramAction) {

                    case "PIN":

                        messageRequest.setTelegramPollRequest(null);

                        messageService.sendPinMessage(messageRequest);

                        break;

                    case "POLL":

                        messageService.sendPoll(messageRequest);

                        break;

                    case "NORMAL":
                    default:

                        messageRequest.setTelegramPollRequest(null);

                        messageService.sendMessage(messageRequest);

                        break;
                }
            }

            redirectAttributes.addFlashAttribute(
                    "successMessage",
                    "¡Mensaje enviado correctamente!"
            );

        } catch (Exception e) {

            System.err.println(
                    "ERROR AL ENVIAR MENSAJE: " + e.getMessage()
            );

            redirectAttributes.addFlashAttribute(
                    "errorMessage",
                    "No se ha podido enviar el mensaje."
            );
        }

        return "redirect:/";
    }
}