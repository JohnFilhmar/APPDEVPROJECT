import React, { useState } from 'react';

const Messages = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'user' },
    { id: 2, text: 'Hi there!', sender: 'other' },
    // Add more messages as needed
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
      };

      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <>
        <div className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-semibold">Multi-Hub Communication</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:text-base md:text-lg lg:text-xl">
            {/* Message display area */}
            <div className="col-span-2 lg:col-span-3 bg-gray-200 p-4 h-96 overflow-y-auto">
                {messages.map((message) => (
                    <div
                    key={message.id}
                    className={`mb-2 p-2 ${
                        message.sender === 'user' ? 'bg-blue-500 text-white text-right' : 'bg-gray-300 text-left'
                    }`}
                    >
                    {message.text}
                    </div>
                ))}
            </div>

            {/* New message input and send button */}
            <div className="col-span-2 lg:col-span-3 bg-gray-200 p-4">
                <div className="flex">
                    <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow border border-gray-400 p-2 mr-2"
                    placeholder="Type your message..."
                    />
                    <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white p-2 rounded"
                    >
                    Send
                    </button>
                </div>
            </div>
        </div>
    </>
  );
};
  
export default Messages;
