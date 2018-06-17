package com.chat.apiserver.domain;

import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MessageService {
    private ArrayList<Message> list;

    public MessageService() {
        list = new ArrayList<Message>();
    }

    public void addMessage(Message message) {
        list.add(message);
    }

    public ArrayList<Message> listMessages() {
        return list;
    }
}
