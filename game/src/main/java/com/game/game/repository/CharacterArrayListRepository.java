package com.game.game.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.game.game.model.Helper;

@Repository
public interface CharacterArrayListRepository extends MongoRepository<Helper, String> {
    // Optional<List<Helper>> findById(String id);
    //Optional<List<Helper>> findById(String id);
    
} 