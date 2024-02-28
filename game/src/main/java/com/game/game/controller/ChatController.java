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

import com.game.game.model.Helper;
import com.game.game.model.Message;
import com.game.game.model.PostitionHelper;
import com.mongodb.client.model.geojson.Position;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private ArrayList<Helper> characters = new ArrayList<>();

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
                if(characters.get(i).getId().compareTo(character.getId()) == 0){
                    characters.get(i).setPosition(character.getNewPosition());
                }
            }
    
        }
        return characters;
    }


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public ArrayList<Helper> charcterList(@Payload(required = false) String id){

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
        return characters;
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
