package com.game.game.model;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReturnCharacters {
    private ArrayList<Helper> characters;
    private ArrayList<Item> items;
    private ItemHelper map;
    
}
