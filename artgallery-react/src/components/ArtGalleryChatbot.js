import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

// Simple config for the chatbot
const config = {
  initialMessages: [
    {
      type: 'text',
      id: 1,
      message: 'Hi! Ask me anything about the artworks in this gallery.',
    },
  ],
  botName: 'ArtBot',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#222',
    },
    chatButton: {
      backgroundColor: '#ffd700',
    },
  },
};

// Custom message parser
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }
  parse(message) {
    this.actionProvider.handleUserMessage(message);
  }
}

// Custom action provider
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  async handleUserMessage(message) {
    // Send message to Django backend
    try {
      const response = await fetch('/api/chatbot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      this.setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          this.createChatBotMessage(data.reply || 'Sorry, I could not find info about that artwork.'),
        ],
      }));
    } catch (e) {
      this.setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          this.createChatBotMessage('Sorry, there was a problem contacting the server.'),
        ],
      }));
    }
  }
}

// Floating Chatbot UI
const ArtGalleryChatbot = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          bottom: 32,
          left: 32,
          zIndex: 2000,
          background: '#222',
          color: '#ffd700',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          fontSize: 28,
          boxShadow: '0 2px 8px #0008',
          cursor: 'pointer',
        }}
        aria-label="Open Art Gallery Chatbot"
      >
        💬
      </button>
      {/* Chatbot modal */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 100,
            left: 32,
            zIndex: 2100,
            background: 'rgba(30,30,30,0.95)',
            borderRadius: 16,
            boxShadow: '0 8px 32px #000a',
            padding: 0,
            width: 350,
            maxWidth: '90vw',
            height: 480,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 8 }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffd700',
                fontSize: 22,
                cursor: 'pointer',
                fontWeight: 700,
              }}
              aria-label="Close Chatbot"
            >
              ×
            </button>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              placeholderText="Ask about any artwork..."
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ArtGalleryChatbot; 