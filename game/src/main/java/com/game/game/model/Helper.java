package com.game.game.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "character")
public class Helper {

    @Id
    private String id;
    
    private Float position[];
    private Float newPosition[];
    private String hairColor;
    private String topColor;
    private  ArrayList<Chord> path; 
    private String bottomColor;

}
