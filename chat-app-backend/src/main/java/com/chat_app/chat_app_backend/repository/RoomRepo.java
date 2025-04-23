package com.chat_app.chat_app_backend.repository;

import com.chat_app.chat_app_backend.entity.Room;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepo extends MongoRepository<Room, String> {
  // getroom using rooomid;
    Room findByRoomId(String roomId);
}
