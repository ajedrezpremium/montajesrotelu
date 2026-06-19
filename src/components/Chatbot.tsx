"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { findResponse, suggestedQuestions } from "@/lib/knowledge-base";

interface Message {
  role: "user" | "bot";
  content: string;
}

function renderMarkdown(text: string) {
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("•") || block.startsWith("-")) {
        const items = block.split("\n").filter((l) => l.startsWith("•") || l.startsWith("-"));
        return items.map((item) => item.replace(/^[•-]\s*/, "")).join("\n• ");
      }
      return block;
    })
    .join("\n\n");
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "¡Hola! Soy el **Asistente de Ingeniería de ROTELU** — ingeniero senior experto mundial en soldadura de alto nivel y estructuras metálicas.\n\nPuedo asesorarle técnicamente sobre:\n\n• **Soldadura certificada** (EN 1090, ISO 3834-2, ASME, PED)\n• **Procesos de soldadura** (SAW, MIG/MAG, TIG, electrodo)\n• **Materiales** (aceros al carbono, inoxidables, offshore, alta resistencia)\n• **Componentes hidroeléctricos, offshore, navales y equipos a presión**\n• **Certificaciones, WPS/PQR, ensayos no destructivos (END)**\n\n¿En qué puedo ayudarle?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSend = async (text?: string) => {
    const message = (text || input).trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setShowSuggestions(false);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.slice(1).map((m) => ({
              role: m.role === "bot" ? "assistant" : ("user" as const),
              content: m.content,
            })),
            { role: "user" as const, content: message },
          ],
        }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      setMessages((prev) => [...prev, { role: "bot", content: "" }]);

      const decoder = new TextDecoder();
      let botContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        botContent += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "bot", content: botContent };
          return updated;
        });
      }
    } catch {
      const fallback = findResponse(message);
      if (fallback) {
        setMessages((prev) => [...prev, { role: "bot", content: fallback.response }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "Gracias por su consulta. Por el momento no puedo conectar con el motor de IA. ¿Podría darme más detalles técnicos? O puede contactar directamente a nuestro equipo de ingeniería a través del formulario de contacto.",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
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
                    <span className={`w-1.5 h-1.5 rounded-full ${loading ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`} />
                    <span className={`text-xs ${loading ? "text-yellow-500/80" : "text-green-500/80"}`}>
                      {loading ? "Pensando..." : "Online"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {loading && <Loader2 size={14} className="text-orange animate-spin" />}
                <button
                  onClick={() => setOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
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
                      msg.role === "user" ? "bg-orange" : "bg-zinc-800"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} className="text-white" />
                    ) : (
                      <Bot size={14} className="text-orange" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-orange text-white"
                        : "bg-zinc-800/80 text-zinc-300"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {showSuggestions && messages.length === 1 && (
                <div className="pt-2">
                  <p className="text-zinc-600 text-xs mb-2">
                    Preguntas frecuentes:
                  </p>
                  <div className="space-y-1.5">
                    {suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        disabled={loading}
                        className="block w-full text-left px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs rounded-sm transition-colors disabled:opacity-50"
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
                  disabled={loading}
                  className="flex-1 px-3.5 py-2.5 bg-black/50 border border-zinc-800 rounded-sm text-white text-sm placeholder-zinc-600 focus:border-orange/50 outline-none transition-colors disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="px-3.5 py-2.5 bg-orange text-white rounded-sm hover:bg-orange-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
              <p className="text-zinc-700 text-[10px] mt-1.5 text-center">
                Ingeniero senior — Soldadura de alto nivel & estructuras metálicas
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
