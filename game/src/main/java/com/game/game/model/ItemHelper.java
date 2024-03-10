package com.game.game.model;

import java.lang.reflect.Array;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemHelper {
    private int size[];
    private int gridDivision;
    private ArrayList<Items> items;
    private ArrayList<Item> itemsList;
    
}
