import { useState } from 'react'
import './App.css'

        function ChatInput({chatMessages, setChatMessages}){
            const[inputText,setInputText]=React.useState('');


            function saveInputText(event){
                setInputText(event.target.value);
            }

            function sendMessage(){
                const newChatMessages=[
                    ...chatMessages,
                    {
                        message:inputText,
                        sender:'user',
                        id: crypto.randomUUID()
                    }
                ];
                  setChatMessages(newChatMessages);
                
                const response=Chatbot.getResponse(inputText);
                  setChatMessages([
                    ...newChatMessages,
                    {
                        message:response,
                        sender:'bot',
                        id: crypto.randomUUID()
                    }
                ]);

                setInputText('');
            }
            return (
                <>
                    <input 
                        placeholder="send a message to chatbot" 
                        size="30" 
                        onChange={saveInputText}
                        value={inputText}
                    

                    />
                    <button
                        onClick={sendMessage}
                    >Send</button>
                </>
            );
        }

        function ChatMessage({message,sender}){
            //const message=props.message;
            //const {sender}=props;
            // if(sender==='bot'){
            //      return (
            //     <div>                    
            //         <img src="./robot.png" width="40"></img>
            //         {message}
            //     </div>
            // );
            // }

                return(

                    <div>
                        {sender ==='bot'&&<img src="./robot.png" width="40"></img>}
                        {message}
                        {sender ==='user' && <img src="./user.png" width="40"></img>}
                    </div>
                );

           
        }

        function ChatMgs({chatMessages}){

            
            return(
                <>
                {chatMessages.map((chatMessages)=>{
                                return (
                                    <ChatMessage
                                        message={chatMessages.message}
                                        sender={chatMessages.sender}
                                        key={chatMessages.id} 
                                    />
                        );
                     })
                }

               
                
                </>
            );
        }
function App() {
const [chatMessages,setChatMessages] =useState([{
            
                message:'hello chatbot',
                sender:'user',
                id:'id1'
            },
            {
               message:'hello how can i help you',
                sender:'bot',
                id:'id2' 
            },
            {
               message:'can you get me todays date?',
                sender:'user',
                id:'id3' 
            },
            {
               message:'Today is April 13th',
                sender:'bot',
                id:'id4' 
            }]);

            return (
                <>
                    <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
                    <ChatMgs chatMessages={chatMessages} />
                </>
            );
          
               
        }

export default App
