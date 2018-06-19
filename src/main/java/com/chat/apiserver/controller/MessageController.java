package com.chat.apiserver.controller;
import com.chat.apiserver.domain.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import static org.springframework.web.bind.annotation.RequestMethod.*;

import com.chat.apiserver.domain.MessageService;

import java.util.List;

@Controller
@RequestMapping("/messages")
public class MessageController {

    SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);

    @Autowired
    private MessageService messagesService;

    @ResponseBody
    @RequestMapping(method = GET, produces = "application/json")
    public List<Message> getMessages() {
        return messagesService.listMessages();
    }

    @ResponseBody
    @RequestMapping(method = POST, produces = "application/json")
    public void addMessage(@RequestBody Message message) {
        messagesService.addMessage(message);
        try {
            sseEmitter.send(message);
        } catch (java.io.IOException ex) {
            System.out.println("Can't send a message through sse: " +  ex.toString());
        }
    }

    @RequestMapping(value="/newMessages", method = GET, produces="text/event-stream")
    SseEmitter newMessages() {
        return sseEmitter;
    }
}