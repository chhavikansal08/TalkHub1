package com.chat_app.chat_app_backend.entity;


import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "rooms")
public class Room {
    @Id
    private String id;//Mongo db : unique identifier
    @Indexed(unique = true)
    private String roomId;
    private List<Messages> messages = new ArrayList<>();

    public List<Messages> getMessages() {
        return messages;
    }

    public void setMessages(List<Messages> messages) {
        this.messages = messages;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }



    public Room() {
    }

    public Room(String id, String roomId, List<Messages> messages) {
        this.id = id;
        this.roomId = roomId;
        this.messages = messages;
    }
}