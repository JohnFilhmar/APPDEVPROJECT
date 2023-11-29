
import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { IoChatbox } from "react-icons/io5";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { Button, TextInput } from 'flowbite-react';
import { IoSend } from "react-icons/io5";
import useGetMessages from '../../hooks/useGetMessages';
import useChats from '../../hooks/useAddMessage';
import useGetUsers from '../../hooks/useGetUsers';
import { IoMenu } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

const FloatingButton = () => {
  const [isTransformed, setIsTransformed] = useState(false);
  const [receiver, setCurrentChat] = useState("");
  const [userMessage, setMessage] = useState("");
  const [conversations, setConversations] = useState(false);
// eslint-disable-next-line
  const { fetchData, response: data, loading: loadingMessages, error: errorMessages } = useGetMessages();
// eslint-disable-next-line
  const { response, loading, error, addMessage } = useChats(sessionStorage.getItem('username'), receiver, userMessage);
// eslint-disable-next-line
  const { response: userData, loading: loadingUsers, error: errorUsers } = useGetUsers();
  const [chats, setChats] = useState([...userData]);
  const chatboxRef = useRef();

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
    setCurrentChat(localStorage.getItem('lastchat'));
  }, [isTransformed,receiver,addMessage]);

  useEffect(() => {
    setChats([...userData]);
  }, [userData]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 500);

  //   return () => clearInterval(intervalId);
  // }, [fetchData]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userMessage.trim() !== '') {
      fetchData();
      addMessage();
      setMessage('');
    }
  };

  const handleChat = (chat) => {
    fetchData();
    setCurrentChat(chat);
    localStorage.setItem('lastchat', chat);
  }

  const handleChatBox = () => {
    fetchData();
    setIsTransformed(!isTransformed);
    if(!isTransformed){

    } else {

    }
  };
  
  const searchChat = (query) => {
    const results = userData.filter((users) => 
      users.userName.toLowerCase().includes(query.toLowerCase())
    );
    setChats(results);
  }

  // const clearChat = async () => {
  //   console.log('Chat Cleared');
  //   try {
  //     const response = await axios.delete('Chats')
  //   } catch(error) {

  //   }
  // }

  return (
    <div className={`floating-button ${isTransformed ? 'transformed' : ''}`}>
      <button onClick={handleChatBox}>
        {isTransformed ?
          <div className="flex">
            <MdOutlineCloseFullscreen className='lg:w-5 lg:h-5 lg:mt-1'/>
          </div>
          :
          <div className="flex">
            <IoChatbox className='lg:w-5 lg:h-5 lg:mt-1'/>
          </div>
        }
      </button>
      {isTransformed && (
        <div className='w-300 h-auto border-solid chat-box text-xs max-w-[90vw] md:max-w-[500px] lg:max-w-[500px]'>
          <h5 className="flex font-bold tracking-tight text-base text-gray-900 dark:text-white p-3 justify-between border-b border-gray-500 border-t-1 border-r-1 border-l-1 border-gray-200">
            <div className="flex items-center">
              <IoMdChatboxes className='w-5 h-5 mr-1 mt-1'/>
              Chat
            </div>
            <div className="mt-1 ml-auto items-last hover:cursor-pointer flex gap-4">
              <p onClick={() => setConversations(!conversations)}>
                <IoMenu />
              </p>
              <p onClick={handleChatBox}>
                <IoMdCloseCircle />
              </p>
            </div>
          </h5>
          <div className="flex min-h-[40.37328094302554vh] max-h-[40.37328094302554vh]">
            <div className="sm:grow md:basis-9/12 lg:basis-9/12 h-auto bg-slate-100 w-96 overflow-auto scroll-smooth overflow-x-hidden chatbox"ref={chatboxRef}>
              <div className="flex flex-col">
              {
                data.map((msg) => (
                  receiver === msg.receiver && msg.sender === sessionStorage.getItem('username') ? 
                    <div
                      key={msg.message_id}
                      className={`flex p-2 ${
                        msg.sender === sessionStorage.getItem('username') ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <p
                        className={`font-bold text-slate p-2 rounded-lg ${
                          msg.sender === sessionStorage.getItem('username') ? 'bg-blue-200' : 'bg-gray-200'
                        }`}
                      >
                        {msg.message}
                      </p>
                    </div>
                  : 
                  msg.receiver === sessionStorage.getItem('username') && msg.sender === receiver ? 
                    <div
                      key={msg.message_id}
                      className={`flex p-2 ${
                        msg.receiver === receiver ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <p
                        className={`font-bold text-slate p-2 rounded-lg ${
                          msg.receiver === receiver ? 'bg-blue-200' : 'bg-gray-200'
                        }`}
                      >
                        {msg.message}
                      </p>
                    </div>
                  : null
                ))
              }
              </div>
            </div>
            <div className={`${ conversations ? "block" : "hidden" } basis-3/12 h-auto bg-slate-200 w-full text-center`}>
              {/* <button onClick={clearChat} className="m-1 bg-red-500 text-white py-2 w-fit">
                Clear Chat
              </button> */}
              { conversations && (
                <>
                  <TextInput
                    type='text'
                    id='chats'
                    autoComplete=''
                    placeholder='Search'
                    onChange={(e) => searchChat(e.target.value)}
                    sizing="sm"
                    className='w-full p-1'
                  />
                  {chats.slice(0, 8).map((user) => 
                    sessionStorage.getItem('username') !== user.userName ? 
                      (
                        <div key={user.id}>
                          <p
                            onClick={() => handleChat(`${user.userName}`)}
                            className='font-bold text-slate-800 p-2 bg-red-300 rounded-lg m-1 hover:cursor-pointer'
                          >
                            {user.userName}
                          </p>
                        </div>
                      )
                    : ""
                  )}
                </>
              )}
            </div>
          </div>
          {/* {error && <p className='text-center font-bold text-xl text-red-700 py-1'>Choose who to chat first!</p>} */}
          <form onSubmit={handleSendMessage} className="flex">
            <TextInput
              type='text'
              id='message'
              placeholder='Send a message...'
              value={userMessage}
              onChange={(e) => setMessage(e.target.value)}
              sizing="lg"
              className='w-full'
              autoComplete="off"
              maxLength={255}
            />
            <Button type="submit"><IoSend /></Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
