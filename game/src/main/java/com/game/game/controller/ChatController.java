package com.game.game.controller;

import java.util.ArrayList;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.game.game.model.Chord;
import com.game.game.model.Helper;
import com.game.game.model.Item;
import com.game.game.model.ItemHelper;
import com.game.game.model.Items;
import com.game.game.model.Message;
import com.game.game.model.PostitionHelper;
import com.game.game.model.ReturnCharacters;
import com.game.game.repository.CharacterArrayListRepository;
import com.mongodb.client.model.geojson.Position;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:5173")
@Controller
public class ChatController {



    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private CharacterArrayListRepository characterRepo;

    private ArrayList<Helper> characters = new ArrayList<>();
    private ArrayList<ItemHelper> itemsList = new ArrayList<>();
    private ArrayList<Item> itemList = new ArrayList<>();

    @MessageMapping("/messaage")
    @SendTo("/chatroom/public")
    public Message receivedPublicMessage(@Payload Message message){
        return message;
    }

    @MessageMapping("/private-messaage")
    @SendTo("/chatroom/public")
    public Message receivedPrivateMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        return message;
    }


    // @MessageMapping("/hello")
    // @SendTo("/topic/greetings")
    // public Helper receivedPrivateMessage(){

    //     //String sessionId = SimpAttributesContextHolder.currentAttributes().getSessionId();
    //     System.out.println("------------skdals");

    //     Random rand = new Random();
   
    //     // Generate random integers in range 0 to 999
    //     int rand_int1 = rand.nextInt(1000);

    //     Float rand_int2 = rand.nextFloat(1.5f);
    //     Float rand_int3 = rand.nextFloat(1.5f);
        
    //     Helper helper = new Helper();
    //     PostitionHelper pos = new PostitionHelper();
        
    //     Float array[] = {rand_int2, 0.0f, rand_int3};

    //     helper.setId(rand_int1 + "");
    //     helper.setPosition(array);
    //     helper.setBottomColor("#0092ff");
    //     helper.setTopColor("#0092ff");
    //     helper.setHairColor("#0092ff");
       
    //     return helper;
    // }


    @MessageMapping("/private-game")
    @SendTo("/private/game")
    public Helper privateStarter(){
        //String sessionId = SimpAttributesContextHolder.currentAttributes().getSessionId();
        System.out.println("------------skdals");

        Random rand = new Random();
   
        // Generate random integers in range 0 to 999
        int rand_int1 = rand.nextInt(1000);

        Float rand_int2 = rand.nextFloat(1.5f);
        Float rand_int3 = rand.nextFloat(1.5f);
        
        Helper helper = new Helper();
        PostitionHelper pos = new PostitionHelper();
        
        Float array[] = {rand_int2, 0.0f, rand_int3};

        helper.setId(rand_int1 + "");
        helper.setPosition(array);
        helper.setBottomColor("#0092ff");
        helper.setTopColor("#0092ff");
        helper.setHairColor("#0092ff");
       
        return helper;
    }

    // so first we substribe to this topic 
    // next we gather the information from the player 
    // 
    @MessageMapping("/move")
    @SendTo("/move/player")
    public ArrayList<Helper> movePlayer(@Payload(required = false) Helper character){
       
        // we need to test this out 
        if(character != null){

            // get rid of for loop for a hashmap so we can look up ids 
            
            for(int i = 0; i < characters.size(); i++){
                
                System.out.println("--------x67");
                System.out.println(character.getPath().size());
                for (int j = 0; j < character.getPath().size();  j++ ){
                    System.out.println(character.getPath().get(j));
                
                }
                if(characters.get(i).getId().compareTo(character.getId()) == 0){
                    characters.get(i).setPosition(character.getNewPosition());
                    characters.get(i).setPath(character.getPath());
                }
            }
    
        }
        return characters;
    }


    @MessageMapping("/move2")
    @SendTo("/move2/player")
    public String movePlayer2(@Payload(required = false) String id){
       
            for(int i = 0; i < characters.size(); i++){
                if(characters.get(i).getId().compareTo(id) == 0){
                    ArrayList<Chord> newPath = characters.get(i).getPath();
                    System.out.println("---------x5677777777");
                    System.out.println(characters.get(i).getId());
                    System.out.println(id);
                    if(newPath != null){
                        newPath.remove(0);
                        characters.get(i).setPath(newPath);
                        System.out.println("---------x56777777773");
                        return "done";
                    }
                    
                }
            }
            return "done";
            
        
    
    
    }


    @MessageMapping("/funiture")
    @SendTo("/funiture")
    public ArrayList<Helper> spawnFuniture(@Payload(required = false) Helper character){

        // we need to test this out 
        if(character != null){

            // get rid of for loop for a hashmap so we can look up ids 
            for(int i = 0; i < characters.size(); i++){
                if(characters.get(i).getId().compareTo(character.getId()) == 0){
                    characters.get(i).setPosition(character.getNewPosition());
                }
            }
    
        }
        return characters;
    }


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public ReturnCharacters charcterList(@Payload(required = false) String id){

        //String sessionId = SimpAttributesContextHolder.currentAttributes().getSessionId();
        
        System.out.println("------------skdals");

        Random rand = new Random();
   
        // Generate random integers in range 0 to 999
        int rand_int1 = rand.nextInt(1000);
        
        Helper helper = new Helper();
        PostitionHelper pos = new PostitionHelper();
        
        Float array[] = {0.0f, 0.0f, 0.0f};

        helper.setId(id);
        helper.setPosition(array);
        helper.setBottomColor("#0092ff");
        helper.setTopColor("#0092ff");
        helper.setHairColor("#0092ff");
        characters.add(helper);
        characterRepo.save(helper);

        int arrayF[] = {2, 2};
        int arrayF2[] = {3, 6};
        int mapSize[] = {10, 10};

        // itemList.add(new Item("Chair", arrayF));
        // itemList.add(new Item("Table", arrayF2));

        int postionChair[] = {1, 0};
        int postionChair2[] = {8, 8};
        ArrayList<Items> itemsList = new ArrayList<>();
        itemsList.add(new Items(new Item("Chair", arrayF, postionChair, 2), postionChair, 2));
        itemsList.add(new Items(new Item("Chair", arrayF, postionChair2, 1), postionChair2, 1));


        // we want 
        //size of the map 
        // gridDivision int 
        // items no list 

    
        
 


        ItemHelper itemHelper = new ItemHelper();
        itemHelper.setSize(mapSize);
        itemHelper.setItems(itemsList);
        itemHelper.setItemsList(itemList);
        itemHelper.setGridDivision(2);

        ReturnCharacters hello = new ReturnCharacters();
        hello.setCharacters(characters);
        hello.setItems(itemList);
        hello.setMap(itemHelper);

        return hello;
    }

    
    // now I am able to sub
    @SubscribeMapping("/topic")
    public Helper broadcastNews() {
        
        System.out.println("------------bobobobo");
        Helper helper = new Helper();
        PostitionHelper pos = new PostitionHelper();
        helper.setId("q");
        
       // helper.setPosition(pos);
        return helper;
    }


    
}
