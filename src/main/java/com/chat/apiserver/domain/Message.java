package com.chat.apiserver.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import java.time.LocalDateTime;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Message {
    private String text;
    private LocalDateTime time;
    private String userName;

    public Message(String text, String userName) {
        this.text = text;
        this.userName = userName;
        this.time = LocalDateTime.now();
    }
}
