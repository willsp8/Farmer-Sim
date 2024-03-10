package com.game.game.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    private String name; 
    private int[] size;
    private int[] gridPoistion;
    private int rotation;

    
}
