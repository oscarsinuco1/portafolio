import React from 'react';
import Typewriter from 'typewriter-effect';

const TerminalHero: React.FC = () => {
  return (
    <div className="terminal-window w-full max-w-5xl mx-auto bg-black/75 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-slate-700 font-mono">
      <div className="p-4 bg-slate-800/50 flex items-center gap-2">
        <span className="h-3 w-3 bg-red-500 rounded-full"></span>
        <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
        <span className="h-3 w-3 bg-green-500 rounded-full"></span>
      </div>
      <div className="p-6 text-left font-mono">
        <Typewriter
          options={{
            delay: 50,
            loop: false,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString('<span class="terminal-user">oscar</span><span class="terminal-at">@</span><span class="terminal-host">portfolio</span><span class="terminal-colon">:</span><span class="terminal-path">~</span><span class="terminal-prompt">$</span> <span class="terminal-command">whoami</span><br/>')
              .pauseFor(200)
              .typeString('<span class="terminal-output">oscar</span><br/>')
              .pauseFor(300)
              .typeString('<span class="terminal-user">oscar</span><span class="terminal-at">@</span><span class="terminal-host">portfolio</span><span class="terminal-colon">:</span><span class="terminal-path">~</span><span class="terminal-prompt">$</span> <span class="terminal-command">echo $USER_NAME</span><br/>')
              .pauseFor(200)
              .typeString('<span class="terminal-output">Oscar Esneyder Sinuco Tirado</span><br/>')
              .pauseFor(300)
              .typeString('<span class="terminal-user">oscar</span><span class="terminal-at">@</span><span class="terminal-host">portfolio</span><span class="terminal-colon">:</span><span class="terminal-path">~</span><span class="terminal-prompt">$</span> <span class="terminal-command">echo $ROLE</span><br/>')
              .pauseFor(200)
              .typeString('<span class="terminal-output">Fullstack Developer & GenAI Specialist</span><br/>')
              .pauseFor(300)
              .typeString('<span class="terminal-user">oscar</span><span class="terminal-at">@</span><span class="terminal-host">portfolio</span><span class="terminal-colon">:</span><span class="terminal-path">~</span><span class="terminal-prompt">$</span> <span class="terminal-command">cat skills.txt</span><br/>')
              .pauseFor(200)
              .typeString('<span class="terminal-output-secondary">Angular, React, Node.js, Python, Azure, GenAI...</span><br/>')
              .pauseFor(300)
              .typeString('<span class="terminal-user">oscar</span><span class="terminal-at">@</span><span class="terminal-host">portfolio</span><span class="terminal-colon">:</span><span class="terminal-path">~</span><span class="terminal-prompt">$</span> ')
              .callFunction(() => {
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }, 2500);
              })
              .start();
          }}
        />
      </div>
    </div>
  );
};

export default TerminalHero;
