import { useEffect } from "react";
import { over } from "stompjs";
import { atom, useAtom } from 'jotai'
import Pathfinding from "pathfinding";


var stompClient = null

export const charactersAtom = atom([])
export const mapAtom = atom([])
export const userAtom = atom([])
export const mapAtom2 = atom([])



Math.floor(Math.random() * 50)
    localStorage.setItem('fun',  Math.floor(Math.random() * 50) + "AB")

export const SocketManager = () => {
    const [_characters, setCharacters] = useAtom(charactersAtom)
    const [_map, setMap] = useAtom(mapAtom)
    const [_map2, setMap2] = useAtom(mapAtom2)
    const [_user, setUser] = useAtom(userAtom)

    
    const onConnected = (e) => {
      
        // let session =  stompClient.subscribe('/app/topic', (greeting) => {
        //     console.log("heyyy")
        //     console.log(JSON.parse(greeting.body))
        //     //showGreeting(JSON.parse(greeting.body).content);
        //     });

       // console.log(JSON.parse(greeting.body))

            // so we coonect then we substribe to this topic 
            console.log("ajd;fjasdlfajksdhfjasdfkjasdjfaskjfhask")
            stompClient.subscribe('/topic/greetings', (greeting) => {
                console.log(JSON.parse(greeting.body))
                setUser(localStorage.getItem('fun'))

                setMap2(JSON.parse(greeting.body))
                setMap(JSON.parse(greeting.body).map)
                
                setCharacters(JSON.parse(greeting.body).characters)
                console.log(JSON.parse(greeting.body).map)
               
                
                //setUser(JSON.parse(greeting.body).map)
                //showGreeting(JSON.parse(greeting.body).content);
            });

            stompClient.subscribe('/move/player', (greeting) => {
              console.log("Bob bob bob me ")
              

              // we do this later with the for loop 
              setCharacters(JSON.parse(greeting.body))
              console.log(JSON.parse(greeting.body))
              //showGreeting(JSON.parse(greeting.body).content);
            });
            

            // stompClient.subscribe('/move/player', (greeting) => {
            //     console.log("Bob bob bob me ")
            //     console.log(JSON.parse(greeting.body))

            //     // we do this later with the for loop 
            //     setCharacters(JSON.parse(greeting.body))
            //     //showGreeting(JSON.parse(greeting.body).content);
            // });

        userJoin()
      }

      
    
    
    
      const userJoin=()=>{
            
        // once we subscribe to this topic we can then gather the data from our user 
        stompClient.send('/app/hello',{}, JSON.stringify(localStorage.getItem('fun')));
        
        
            
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
          console.log("jdkflajsdhflkahdksfhlkajsdkl")
    
        stompClient.connect({}, onConnected, onError);
          
    
      }, [])


}

export default SocketManager;