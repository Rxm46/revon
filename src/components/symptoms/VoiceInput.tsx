
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoiceInputProps {
  onResult: (text: string) => void;
  isDisabled?: boolean;
}

const VoiceInput = ({ onResult, isDisabled = false }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice recognition. Try using Chrome or Edge.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const startListening = () => {
    if (isDisabled) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast({
        title: "Voice Input Failed",
        description: "Could not initialize speech recognition.",
        variant: "destructive",
      });
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak clearly to enter your symptom.",
        duration: 3000,
      });
    };
    
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      onResult(speechResult);
      
      toast({
        title: "Symptom Detected",
        description: `"${speechResult}"`,
        duration: 3000,
      });
    };
    
    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error !== 'no-speech') {
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}`,
          variant: "destructive",
        });
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };
  
  const stopListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.stop();
      setIsListening(false);
    }
  };
  
  if (!isSupported) {
    return null;
  }
  
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={`rounded-full transition-colors ${isListening ? 'bg-red-100 border-red-400 text-red-500 hover:bg-red-200' : ''}`}
      onClick={isListening ? stopListening : startListening}
      disabled={isDisabled}
      aria-label={isListening ? "Stop voice input" : "Start voice input"}
      title={isListening ? "Stop voice input" : "Speak your symptom"}
    >
      {isListening ? (
        <div className="relative">
          <MicOff className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
};

export default VoiceInput;
