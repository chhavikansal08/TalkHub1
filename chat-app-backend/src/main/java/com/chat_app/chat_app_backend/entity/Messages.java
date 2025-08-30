package com.chat_app.chat_app_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;



public class Messages {

    private String sender;
    private String content;
    private LocalDateTime timeStamp;

    public Messages(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.timeStamp = LocalDateTime.now();
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public Messages() {
    }

    public Messages(String sender, String content, LocalDateTime timeStamp) {
        this.sender = sender;
        this.content = content;
        this.timeStamp = timeStamp;
    }
}
