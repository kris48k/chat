package com.chat.apiserver.controller;
import com.chat.apiserver.domain.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
//import org.springframework.stereotype.RestController;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import com.chat.apiserver.domain.MessageService;

import java.util.List;

@Controller
@RequestMapping("/messages")
public class MessageController {

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
    }
}