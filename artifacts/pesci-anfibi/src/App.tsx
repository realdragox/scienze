import React, { useState } from 'react';
import { Presentation } from '@/components/Presentation';
import { IntroScreen } from '@/components/IntroScreen';
import { AuthorSignature } from '@/components/AuthorSignature';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  const [started, setStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isConclusion = started && currentSlide === 11;

  return (
    <TooltipProvider>
      <div className="w-screen h-[100dvh] overflow-hidden bg-background text-foreground relative font-sans">
        {!started ? (
          <IntroScreen onStart={() => setStarted(true)} />
        ) : (
          <Presentation onSlideChange={setCurrentSlide} />
        )}
        <AuthorSignature isConclusion={isConclusion} />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
