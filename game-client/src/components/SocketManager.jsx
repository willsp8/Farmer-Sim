import { useEffect } from "react";
import { over } from "stompjs";
import { atom, useAtom } from 'jotai'


var stompClient = null

export const charactersAtom = atom([])

export const SocketManager = () => {
    const [_characters, setCharacters] = useAtom(charactersAtom)
    
    const onConnected = (e) => {
      
        // let session =  stompClient.subscribe('/app/topic', (greeting) => {
        //     console.log("heyyy")
        //     console.log(JSON.parse(greeting.body))
        //     //showGreeting(JSON.parse(greeting.body).content);
        //     });



            // so we coonect then we substribe to this topic 
            stompClient.subscribe('/topic/greetings', (greeting) => {
                console.log("sender sender sender me ")
                setCharacters(JSON.parse(greeting.body))
                //showGreeting(JSON.parse(greeting.body).content);
            });

            stompClient.subscribe('/move/player', (greeting) => {
                console.log("Bob bob bob me ")
                console.log(JSON.parse(greeting.body))

                // we do this later with the for loop 
                setCharacters(JSON.parse(greeting.body))
                //showGreeting(JSON.parse(greeting.body).content);
            });

        userJoin()
      }
    
    
    
      const userJoin=()=>{
            
        // once we subscribe to this topic we can then gather the data from our user 
        stompClient.send('/app/hello',{});
        
        
            
      }
    
      const onError = ()=> {
        
      }

      const hey = () => {
        console.log("heyyyy")
        // let payLoadData = JSON.parse(payload.body)
        // console.log(payLoadData)
    }
    
    
      
    
    
      useEffect(() => {
    
        stompClient = Stomp.client("ws://localhost:8080/ws");
          // Stomp.connect
          // stompClient = Stomp.over(socket);
    
        stompClient.connect({}, onConnected, onError);
          
    
      }, [])


}

export default SocketManager;