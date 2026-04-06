import React from 'react';

interface AuthorSignatureProps {
  isConclusion?: boolean;
}

export function AuthorSignature({ isConclusion = false }: AuthorSignatureProps) {
  if (isConclusion) {
    return (
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[9999]">
        <div 
          className="text-center mt-48 animate-in fade-in zoom-in duration-1000 delay-500 fill-mode-both"
          style={{
            color: 'rgba(100,220,255,1)',
            textShadow: '0 0 30px cyan',
            fontSize: '24px',
            letterSpacing: '0.1em',
            textTransform: 'lowercase'
          }}
        >
          scripted by jakub
        </div>
        <div 
          className="fixed bottom-5 right-5 pointer-events-auto"
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(100,200,255,0.3)',
            borderRadius: '8px',
            padding: '8px 14px',
            color: 'rgba(150,220,255,0.8)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'lowercase',
            zIndex: 9999
          }}
        >
          scripted by jakub
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-5 right-5 pointer-events-auto transition-opacity duration-500"
      style={{
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(100,200,255,0.3)',
        borderRadius: '8px',
        padding: '8px 14px',
        color: 'rgba(150,220,255,0.8)',
        fontSize: '12px',
        letterSpacing: '0.1em',
        textTransform: 'lowercase',
        zIndex: 9999
      }}
    >
      scripted by jakub
    </div>
  );
}
