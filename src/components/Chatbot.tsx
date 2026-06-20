"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Bot, User, Loader2,
  Mic, MicOff, Volume2, VolumeX, Copy, Share2, Maximize2, Minimize2,
  Globe, Users, Briefcase, MessageCircle as WhatsApp, Mail,
} from "lucide-react";
import { findResponse } from "@/lib/knowledge-base";
import { useLang } from "@/lib/language";
import { useTheme } from "@/lib/theme";

interface Message {
  role: "user" | "bot";
  content: string;
}

const SOCIALS = [
  { id: "x", icon: Globe, color: "hover:text-white", url: (t: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}` },
  { id: "facebook", icon: Users, color: "hover:text-[#1877F2]", url: (t: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&quote=${encodeURIComponent(t)}` },
  { id: "linkedin", icon: Briefcase, color: "hover:text-[#0A66C2]", url: (t: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}` },
  { id: "whatsapp", icon: WhatsApp, color: "hover:text-[#25D366]", url: (t: string) => `https://wa.me/?text=${encodeURIComponent(t)}` },
  { id: "email", icon: Mail, color: "hover:text-orange", url: (t: string) => `mailto:?body=${encodeURIComponent(t)}` },
];

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
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [listening, setListening] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState<number | null>(null);
  const [voiceGender, setVoiceGender] = useState<"male" | "female">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("rotelu-voice") as "male" | "female") || "female";
    }
    return "female";
  });
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const prevLoading = useRef(loading);
  const dragControls = useRef({ x: 0, y: 0 });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    const onStorage = () => {
      const v = localStorage.getItem("rotelu-voice") as "male" | "female" | null;
      if (v) setVoiceGender(v);
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      recognitionRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    setMessages([{ role: "bot", content: t("chatbot.greeting") }]);
    setShowSuggestions(true);
  }, [lang]);

  useEffect(() => {
    if (prevLoading.current && !loading) {
      const last = messages[messages.length - 1];
      if (last && last.role === "bot" && last.content) {
        speak(last.content);
      }
    }
    prevLoading.current = loading;
  }, [loading]);

  const handleSend = async (text?: string) => {
    const message = (text || input).trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setShowSuggestions(false);
    setLoading(true);

    const botId = Date.now();
    setMessages((prev) => [...prev, { role: "bot", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
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
      const decoder = new TextDecoder();
      let buffer = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const token = parsed.choices?.[0]?.delta?.content || "";
                if (token) {
                  setMessages((prev) => {
                    const copy = [...prev];
                    const last = copy[copy.length - 1];
                    if (last && last.role === "bot") {
                      last.content += token;
                    }
                    return copy;
                  });
                }
              } catch {}
            }
          }
        }
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m.content !== "" || m.role !== "bot"));
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

  const toggleListening = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [listening]);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = { es: "es-ES", en: "en-US", fr: "fr-FR", de: "de-DE" };
    utterance.lang = langMap[lang] || "en-US";
    utterance.rate = 1;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(
      (v) => v.lang.startsWith(utterance.lang.slice(0, 2)) && v.name.toLowerCase().includes(voiceGender)
    );
    if (match) utterance.voice = match;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    speechSynthRef.current = null;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard not available
    }
  };

  const handleSocialShare = (text: string, url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareContent = (text: string) => {
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
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
            drag={!fullscreen}
            dragMomentum={false}
            dragElastic={0}
            className={`${
              fullscreen
                ? "fixed inset-4 sm:inset-8"
                : "fixed bottom-24 right-6 w-[380px] sm:w-[440px] h-[600px]"
            } ${
              isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
            } border rounded-lg shadow-2xl shadow-black/50 flex flex-col overflow-hidden ${
              fullscreen ? "" : "cursor-grab active:cursor-grabbing"
            }`}
          >
            <div
              className={`flex items-center justify-between px-4 py-3 ${
                isDark
                  ? "bg-gradient-to-r from-zinc-800 to-zinc-900 border-zinc-800"
                  : "bg-gradient-to-r from-zinc-100 to-white border-zinc-200"
              } border-b`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange/20 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-orange" />
                </div>
                <div>
                  <div
                    className={`text-sm font-medium ${
                      isDark ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    ROTELU Engineering Assistant
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        loading
                          ? "bg-yellow-500 animate-pulse"
                          : "bg-green-500"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        loading ? "text-yellow-500/80" : "text-green-500/80"
                      }`}
                    >
                      {loading
                        ? t("chatbot.status.thinking")
                        : t("chatbot.status.online")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {loading && (
                  <Loader2 size={14} className="text-orange animate-spin" />
                )}
                <button
                  onClick={() => setFullscreen(!fullscreen)}
                  className={`transition-colors ${
                    isDark
                      ? "text-zinc-500 hover:text-white"
                      : "text-zinc-400 hover:text-zinc-900"
                  }`}
                  aria-label={fullscreen ? "Minimize" : "Fullscreen"}
                >
                  {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className={`transition-colors ${
                    isDark
                      ? "text-zinc-500 hover:text-white"
                      : "text-zinc-400 hover:text-zinc-900"
                  }`}
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
                      msg.role === "user"
                        ? "bg-orange"
                        : isDark
                        ? "bg-zinc-800"
                        : "bg-zinc-200"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={14} className="text-white" />
                    ) : (
                      <Bot size={14} className="text-orange" />
                    )}
                  </div>
                  <div className="max-w-[85%]">
                    <div
                      className={`px-3.5 py-2.5 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-orange text-white"
                          : isDark
                          ? "bg-zinc-800/80 text-zinc-300"
                          : "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "bot" && (
                      <div
                        className={`flex flex-wrap gap-1.5 mt-1.5 ${
                          isDark ? "text-zinc-500" : "text-zinc-400"
                        }`}
                      >
                        {speaking ? (
                          <button
                            onClick={stopSpeaking}
                            className="hover:text-red-400 transition-colors"
                            aria-label="Stop speaking"
                          >
                            <VolumeX size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={() => speak(msg.content)}
                            className="hover:text-orange transition-colors"
                            aria-label="Read aloud"
                          >
                            <Volume2 size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => copyToClipboard(msg.content)}
                          className="hover:text-orange transition-colors"
                          aria-label="Copy message"
                        >
                          <Copy size={14} />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setShowSharePopup(showSharePopup === i ? null : i)}
                            className="hover:text-orange transition-colors"
                            aria-label="Share message"
                          >
                            <Share2 size={14} />
                          </button>
                          <AnimatePresence>
                            {showSharePopup === i && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`absolute bottom-full left-0 mb-2 flex gap-1.5 p-2 rounded-lg border shadow-xl ${
                                  isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"
                                }`}
                              >
                                {SOCIALS.map((s) => (
                                  <button
                                    key={s.id}
                                    onClick={() => handleSocialShare(msg.content, s.url(msg.content))}
                                    className={`transition-colors ${s.color}`}
                                    aria-label={`Share on ${s.id}`}
                                  >
                                    <s.icon size={16} />
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {showSuggestions && messages.length === 1 && (
                <div className="pt-2">
                  <p
                    className={`text-xs mb-2 ${
                      isDark ? "text-zinc-600" : "text-zinc-400"
                    }`}
                  >
                    Preguntas frecuentes:
                  </p>
                  <div className="space-y-1.5">
                    {[1,2,3,4,5,6].map((n) => (
                      <button
                        key={n}
                        onClick={() => handleSend(t(`chatbot.q${n}`))}
                        disabled={loading}
                        className={`block w-full text-left px-3 py-2 text-xs rounded-sm transition-colors disabled:opacity-50 ${
                          isDark
                            ? "bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                            : "bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700"
                        }`}
                      >
                        {t(`chatbot.q${n}`)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            <div
              className={`p-3 border-t ${
                isDark ? "border-zinc-800" : "border-zinc-200"
              }`}
            >
              <div className="flex gap-2">
                <button
                  onClick={toggleListening}
                  className={`px-2.5 py-2.5 rounded-sm transition-all ${
                    listening
                      ? "bg-red-500 text-white animate-pulse"
                      : isDark
                      ? "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      : "bg-zinc-100 text-zinc-500 hover:text-zinc-700"
                  }`}
                  aria-label={
                    listening ? "Stop recording" : "Start voice input"
                  }
                >
                  {listening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("chatbot.placeholder")}
                  disabled={loading}
                  className={`flex-1 px-3.5 py-2.5 rounded-sm text-sm outline-none transition-colors disabled:opacity-50 focus:border-orange/50 ${
                    isDark
                      ? "bg-black/50 border-zinc-800 text-white placeholder-zinc-600"
                      : "bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400"
                  } border`}
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
              <p
                className={`text-[10px] mt-1.5 text-center ${
                  isDark ? "text-zinc-700" : "text-zinc-400"
                }`}
              >
                {t("chatbot.footer")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
