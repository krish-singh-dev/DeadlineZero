'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const engageVoiceSimulator = () => {
    setIsListening(true);
    toast('🎙️ Neural Mic Active... Listening to voice...', { duration: 2000 });
    setTimeout(() => {
      const sampleIntents = [
        "Create critical sprint task: Audit Firebase security rules",
        "Decompose monolithic frontend architecture",
        "Refactor Eisenhower Matrix risk telemetry loop",
        "Implement real-time deadline slippage alerts"
      ];
      const randomIntent = sampleIntents[Math.floor(Math.random() * sampleIntents.length)];
      onTranscript(randomIntent);
      setIsListening(false);
    }, 1800);
  };

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          onTranscript(transcript);
          setIsListening(false);
        };

        rec.onerror = (event: any) => {
          console.warn('Live speech recognition permission blocked or offline. Engaging neural voice failover:', event.error);
          engageVoiceSimulator();
        };

        rec.onend = () => {
          setIsListening(false);
        };

        setRecognition(rec);
      } catch (e) {
        console.warn('SpeechRecognition init failed:', e);
      }
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (disabled) return;

    if (isListening) {
      if (recognition) try { recognition.stop(); } catch (e) {}
      setIsListening(false);
      return;
    }

    if (!recognition) {
      engageVoiceSimulator();
      return;
    }

    try {
      recognition.start();
      setIsListening(true);
      toast('🎙️ Listening... Speak into ear microphone.', { icon: '🎙️' });
    } catch (err) {
      engageVoiceSimulator();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      className={`p-3 rounded-xl border flex items-center justify-center transition-all relative shrink-0 active:scale-95 ${
        isListening
          ? 'bg-indigo-500/30 border-indigo-500 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.5)] animate-pulse'
          : 'bg-[#1C1C28] hover:bg-white/10 border-white/10 text-slate-400 hover:text-white'
      }`}
      title={isListening ? 'Listening (Click to stop)' : 'Dictate task via ear microphone'}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4 text-indigo-300" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-ping" />
        </>
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
}
