package com.julian.notificator_front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.julian.notificator_front.model.DestinationType;
import com.julian.notificator_front.model.MessageRequest;
import com.julian.notificator_front.model.telegram.DestinationTelegramType;
import com.julian.notificator_front.service.MessageService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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

            @RequestParam(
                    name = "file",
                    required = false
            ) MultipartFile file,

            RedirectAttributes redirectAttributes) {
        
        try {

            boolean hasFile =
                    file != null && !file.isEmpty();

            /*
             * TELEGRAM
             */
            if (messageRequest.getDestination()
                    == DestinationType.TELEGRAM) {

                switch (telegramAction) {

                    case "PIN":

                        messageRequest
                                .setTelegramPollRequest(null);

                        messageService
                                .sendPinMessage(messageRequest);

                        break;

                    case "POLL":

                        messageService
                                .sendPoll(messageRequest);

                        break;

                    case "NORMAL":
                    default:

                        messageRequest
                                .setTelegramPollRequest(null);

                        if (hasFile) {

                            messageService
                                    .sendFile(
                                            messageRequest,
                                            file
                                    );

                        } else {

                            messageService
                                    .sendMessage(messageRequest);
                        }

                        break;
                }

            }

            /*
             * DISCORD / MAIL
             */
            else if (
                    messageRequest.getDestination()
                            == DestinationType.DISCORD
                    ||
                    messageRequest.getDestination()
                            == DestinationType.MAIL
            ) {

                messageRequest
                        .setTelegramPollRequest(null);

                if (hasFile) {

                    messageService
                            .sendFile(
                                    messageRequest,
                                    file
                            );

                } else {

                    messageService
                            .sendMessage(messageRequest);
                }

            }

            /*
             * RESTO DE DESTINOS
             */
            else {

                messageRequest
                        .setTelegramPollRequest(null);

                messageService
                        .sendMessage(messageRequest);
            }

            redirectAttributes.addFlashAttribute(
                    "successMessage",
                    "¡Mensaje enviado correctamente!"
            );

        } catch (Exception e) {
            
            log.error("ERROR AL ENVIAR MENSAJE: {}", e.getMessage());

            redirectAttributes.addFlashAttribute(
                    "errorMessage",
                    "No se ha podido enviar el mensaje."
            );
        }

        return "redirect:/";
    }
}