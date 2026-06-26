'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check browser Web Speech API support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
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
        console.error('Speech recognition exception:', event.error);
        toast.error('Voice capture failed: ' + event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognition) {
      toast.error('Voice input is not supported in this browser environment.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      toast('Listening... Speak your sprint intent.', { icon: '🎙️' });
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      className={`p-3 rounded-xl border flex items-center justify-center transition-all relative shrink-0 ${
        isListening
          ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse'
          : 'bg-[#1C1C28] hover:bg-white/10 border-white/10 text-slate-400 hover:text-white'
      }`}
      title={isListening ? 'Stop recording' : 'Dictate task via voice'}
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4 text-red-400" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
        </>
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
}
