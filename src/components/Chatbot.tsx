"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { findResponse, suggestedQuestions } from "@/lib/knowledge-base";

interface Message {
  role: "user" | "bot";
  content: string;
}

const initialBotMessage: Message = {
  role: "bot",
  content:
    "¡Hola! Soy el **Asistente de Ingeniería de ROTELU**. Un ingeniero senior con más de 35 años de experiencia en estructuras metálicas, calderería pesada y soldadura certificada.\n\nEstoy aquí para asesorarle técnicamente. Puede preguntarme sobre:\n\n• **Soldadura certificada** (EN 1090, ISO 3834)\n• **Componentes hidroeléctricos**\n• **Estructuras offshore**\n• **Fabricación naval**\n• **Equipos a presión**\n• **Materiales y procesos**\n• **Presupuestos y proyectos**\n\n¿En qué puedo ayudarle?",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const handleSend = (text?: string) => {
    const message = (text || input).trim();
    if (!message) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setShowSuggestions(false);

    setTimeout(() => {
      const match = findResponse(message);
      if (match) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: match.response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "Gracias por su consulta. Para proporcionarle una respuesta técnica precisa, ¿podría darme más detalles? Por ejemplo: sector del proyecto, tipo de componente, dimensiones aproximadas, materiales requeridos, o cualquier especificación técnica que tenga.\n\nTambién puede contactar directamente a nuestro equipo de ingeniería a través del formulario de contacto para una atención personalizada.",
          },
        ]);
      }
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange rounded-full flex items-center justify-center shadow-lg shadow-orange/20 hover:bg-orange-hover transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Open engineering assistant"
      >
        {open ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] sm:w-[400px] h-[560px] bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange/20 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-orange" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">
                    ROTELU Engineering Assistant
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-green-500/80 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-orange"
                        : "bg-zinc-800"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} className="text-white" />
                    ) : (
                      <Bot size={14} className="text-orange" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-lg text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-orange text-white"
                        : "bg-zinc-800/80 text-zinc-300"
                    }`}
                  >
                    {msg.content.split("\n").map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {showSuggestions && (
                <div className="pt-2">
                  <p className="text-zinc-600 text-xs mb-2">
                    Preguntas frecuentes:
                  </p>
                  <div className="space-y-1.5">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="block w-full text-left px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs rounded-sm transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-zinc-800">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escriba su consulta técnica..."
                  className="flex-1 px-3.5 py-2.5 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm placeholder-zinc-600 focus:border-orange/50 outline-none transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="px-3.5 py-2.5 bg-orange text-white rounded-sm hover:bg-orange-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-zinc-700 text-[10px] mt-1.5 text-center">
                Asistente técnico de ROTELU — Ingeniería de estructuras metálicas
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
