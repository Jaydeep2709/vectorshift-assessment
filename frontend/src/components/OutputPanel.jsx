import React, { useState, useRef, useEffect } from "react";
import "./OutputPanel.css";
import { chatWithPipeline } from "../services/pipelineService";

export default function OutputPanel({ setOutput, pipelineId }) {

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello. Click RUN, then chat."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);



  // ✅ Send message using compiled pipeline
  const handleSend = async () => {

    if (!input.trim() || loading)
      return;

    if (!pipelineId) {

      alert("Please click RUN first");

      return;
    }

    const userMessage = input;

    // show user message
    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: userMessage
      }
    ]);

    setInput("");
    setLoading(true);

    try {

      const result = await chatWithPipeline(
        pipelineId,
        userMessage
      );

      if (result.success) {

        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: result.output
          }
        ]);

      }
      else {

        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: "Pipeline execution failed."
          }
        ]);

      }

    }
    catch (err) {

      console.error(err);

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Server error."
        }
      ]);

    }

    setLoading(false);

  };



  // Enter key send
  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      handleSend();

    }

  };



  const clearChat = () => {

    setMessages([
      {
        role: "assistant",
        content: "Chat cleared. Ready."
      }
    ]);

  };



  return (

    <div className="chat-container">

      {/* Header */}
      <div className="chat-header">

        <div className="chat-title">
          AI Preview
        </div>

        <button
          className="clear-btn"
          onClick={clearChat}
        >
          Clear
        </button>

      </div>



      {/* Messages */}
      <div className="chat-messages">

        {messages.map((msg, i) => (

          <div
            key={i}
            className={`message-row ${msg.role}`}
          >

            <div className="message-bubble">
              {msg.content}
            </div>

          </div>

        ))}

        {loading && (

          <div className="message-row assistant">

            <div className="message-bubble typing">
              Thinking...
            </div>

          </div>

        )}

        <div ref={bottomRef} />

      </div>



      {/* Input */}
      <div className="chat-input-area">

        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="chat-input"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="send-btn"
        >
          Send
        </button>

      </div>

    </div>

  );

}
