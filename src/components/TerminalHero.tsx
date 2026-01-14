import React, { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { FaTerminal, FaCircle } from 'react-icons/fa';

const TerminalHero: React.FC = () => {
  const [introDone, setIntroDone] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output'; content: React.ReactNode }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const focusInput = () => {
    if (introDone) {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, introDone]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = '';

    // Estilos inline que consumen las variables CSS definidas abajo
    const highlightStyle = { color: 'var(--term-highlight)', fontWeight: 'bold' };
    const linkActionStyle = { color: 'var(--term-link)' };

    switch (cleanCmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ color: 'var(--term-text-muted)' }}>
            <div>
              <div className="font-bold mb-2 uppercase border-b inline-block" 
                   style={{ color: 'var(--term-link)', borderColor: 'var(--term-border)' }}>
                Navegación
              </div>
              <ul className="space-y-1">
                {['about', 'experience', 'projects', 'skills', 'contact'].map(cmd => (
                  <li key={cmd}>
                    <span style={{ color: 'var(--term-accent)', fontWeight: 'bold' }}>{cmd}</span>
                    <span className="opacity-50 mx-2">::</span>
                    <span>{cmd.charAt(0).toUpperCase() + cmd.slice(1)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2 uppercase border-b inline-block" 
                   style={{ color: 'var(--term-highlight)', borderColor: 'var(--term-border)' }}>
                Sistema
              </div>
              <ul className="space-y-1">
                {['whoami', 'neofetch', 'me', 'clear'].map(cmd => (
                  <li key={cmd}>
                    <span style={{ color: 'var(--term-accent)', fontWeight: 'bold' }}>{cmd}</span>
                    <span className="opacity-50 mx-2">::</span>
                    <span>Sistema</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'whoami':
        output = <span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>oscar</span>;
        break;
      case 'about':
        output = <span style={linkActionStyle}>Accediendo a: <span className="underline" style={highlightStyle}>Sobre Mí</span>...</span>;
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'experience':
        output = <span style={linkActionStyle}>Cargando módulo: <span className="underline" style={highlightStyle}>Experiencia</span>...</span>;
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'skills':
        output = <span style={linkActionStyle}>Listando binarios: <span className="underline" style={highlightStyle}>Habilidades</span>...</span>;
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'projects':
        output = <span style={linkActionStyle}>Accediendo al directorio: <span className="underline" style={highlightStyle}>Proyectos</span>...</span>;
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        output = <span style={linkActionStyle}>Abriendo socket: <span className="underline" style={highlightStyle}>Contacto</span>...</span>;
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'neofetch':
        output = (
          <div className="flex gap-4 mt-2 mb-2 text-sm font-mono">
             <div className="flex flex-col justify-center" style={{ color: 'var(--term-text-main)' }}>
              <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>oscar</span>@<span style={{ color: 'var(--term-highlight)', fontWeight: 'bold' }}>portafolio</span></div>
              <div className="opacity-50">----------------</div>
              <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>SO</span>: <span className="opacity-80">Linux (Astro Arch)</span></div>
              <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Host</span>: <span className="opacity-80">Portafolio v1.0</span></div>
              <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Kernel</span>: <span className="opacity-80">GenAI 2.0</span></div>
              <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Actividad</span>: <span className="opacity-80">∞</span></div>
              <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Paquetes</span>: <span className="opacity-80">Angular, React, Node...</span></div>
              <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Terminal</span>: <span className="opacity-80">zsh 5.9</span></div>
            </div>
          </div>
        );
        break;
      case 'me':
        output = (
          <div className="mt-2 mb-2">
            <img
              src="yo.jpeg"
              alt="Oscar Sinuco"
              className="w-32 h-32 rounded md:w-40 md:h-40 border-2 shadow-lg"
              style={{ 
                  borderColor: 'var(--term-link)',
                  boxShadow: '0 0 15px rgba(var(--color-primary), 0.3)'
              }}
            />
          </div>
        );
        break;
      case '':
        output = '';
        break;
      default:
        output = (
           <span style={{ color: 'var(--term-accent)' }}>
            zsh: command not found: {cleanCmd}. Escribe <span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>help</span>.
           </span>
        );
    }

    setHistory(prev => [
      ...prev,
      { type: 'command', content: cleanCmd },
      { type: 'output', content: output }
    ]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  // Prompt (Sin flecha)
  const PromptSymbol = () => (
    <div className="flex items-center whitespace-nowrap mr-2 select-none">
      <span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>oscar</span>
      <span style={{ color: 'var(--term-text-muted)' }} className="mx-px">@</span>
      <span style={{ color: 'var(--term-highlight)', fontWeight: 'bold' }}>portafolio</span>
      <span style={{ color: 'var(--term-text-muted)' }} className="mx-1">:</span>
      <span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>~</span>
      <span style={{ color: 'var(--term-accent)' }} className="ml-1 font-bold">$</span>
    </div>
  );

  return (
    <>
      <div
        className="terminal-window w-full max-w-5xl mx-auto rounded-lg shadow-2xl overflow-hidden border font-mono flex flex-col h-[350px] sm:h-[450px] cursor-text relative group transition-colors duration-300"
        onClick={focusInput}
        style={{
             backgroundColor: 'var(--term-bg-body)',
             borderColor: 'var(--term-border)',
             color: 'var(--term-text-main)'
        }}
      >
        {/* Barra superior */}
        <div 
            className="p-3 flex items-center justify-between border-b shrink-0 transition-colors duration-300"
            style={{ 
                backgroundColor: 'var(--term-bg-header)',
                borderColor: 'var(--term-border)'
            }}
        >
          <div className="flex gap-2">
            <FaCircle className="text-red-500 text-[10px]" />
            <FaCircle className="text-yellow-500 text-[10px]" />
            <FaCircle className="text-green-500 text-[10px]" />
          </div>
          <div className="text-xs font-mono flex items-center gap-2 opacity-60" style={{ color: 'var(--term-text-muted)' }}>
            <FaTerminal className="text-sm" />
            <span>oscar@portafolio:~ — zsh</span>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Cuerpo del Terminal */}
        <div 
          className="p-4 md:p-6 text-left font-mono overflow-y-auto flex-grow text-sm md:text-base zsh-scrollbar" 
          ref={scrollRef}
        >
          {!introDone ? (
            <Typewriter
              options={{
                delay: 25,
                cursor: '█',
                wrapperClassName: 'typewriter-wrapper'
              }}
              onInit={(typewriter) => {
                // HTML Strings con clases mapeadas a nuestras nuevas variables
                const neofetchOutput = `
                <div class="flex gap-4 mt-2 mb-2 font-mono text-sm">
                    <div class="flex flex-col justify-center">
                    <div><span class="term-link">oscar</span>@<span class="term-highlight">portafolio</span></div>
                    <div class="term-muted">----------------</div>
                    <div><span class="term-link">SO</span>: <span class="term-muted">Linux (Astro Arch)</span></div>
                    <div><span class="term-link">Host</span>: <span class="term-muted">Portafolio v1.0</span></div>
                    <div><span class="term-link">Kernel</span>: <span class="term-muted">GenAI 2.0</span></div>
                    <div><span class="term-link">Actividad</span>: <span class="term-muted">∞</span></div>
                    <div><span class="term-link">Paquetes</span>: <span class="term-muted">Angular, React, Node...</span></div>
                    <div><span class="term-link">Terminal</span>: <span class="term-muted">zsh 5.9</span></div>
                    </div>
                </div>
                `;

                typewriter
                  // 1. whoami
                  .typeString('<span class="term-link">oscar</span><span class="term-muted">@</span><span class="term-highlight">portafolio</span><span class="term-muted">:</span><span class="term-path">~</span><span class="term-symbol">$</span> whoami<br/>')
                  .pauseFor(50)
                  .typeString('<span class="term-link">oscar</span><br/>')
                  .pauseFor(50)
                  
                  // 2. neofetch
                  .typeString('<span class="term-link">oscar</span><span class="term-muted">@</span><span class="term-highlight">portafolio</span><span class="term-muted">:</span><span class="term-path">~</span><span class="term-symbol">$</span> neofetch<br/>')
                  .pauseFor(50)
                  .typeString(neofetchOutput)
                  .pauseFor(50)
                  
                  // 3. cat mision.txt
                  .typeString('<span class="term-link">oscar</span><span class="term-muted">@</span><span class="term-highlight">portafolio</span><span class="term-muted">:</span><span class="term-path">~</span><span class="term-symbol">$</span> cat mision.txt<br/>')
                  .pauseFor(50)
                  .typeString('<span class="term-text">Construyendo el futuro con IA y Tecnologías Web.</span><br/>')
                  .pauseFor(50)
                  
                  .callFunction(() => {
                    setIntroDone(true);
                  })
                  .start();
              }}
            />
          ) : (
            <>
              {/* Contenido estático post-animación */}
              <div className="mb-4">
                {/* 1. whoami */}
                <div className="flex items-center flex-wrap gap-0">
                   <PromptSymbol /> <span className="ml-2">whoami</span>
                </div>
                <div className="mb-2" style={{ color: 'var(--term-link)' }}>oscar</div>

                {/* 2. neofetch */}
                <div className="flex items-center flex-wrap gap-0">
                   <PromptSymbol /> <span className="ml-2">neofetch</span>
                </div>
                <div className="flex gap-4 mt-2 mb-2 text-sm font-mono">
                    <div className="flex flex-col justify-center" style={{ color: 'var(--term-text-main)' }}>
                    <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>oscar</span>@<span style={{ color: 'var(--term-highlight)', fontWeight: 'bold' }}>portafolio</span></div>
                    <div className="opacity-50">----------------</div>
                    <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>SO</span>: <span className="opacity-80">Linux (Astro Arch)</span></div>
                    <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Host</span>: <span className="opacity-80">Portafolio v1.0</span></div>
                    <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Kernel</span>: <span className="opacity-80">GenAI 2.0</span></div>
                    <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Actividad</span>: <span className="opacity-80">∞</span></div>
                    <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Paquetes</span>: <span className="opacity-80">Angular, React, Node...</span></div>
                    <div><span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>Terminal</span>: <span className="opacity-80">zsh 5.9</span></div>
                    </div>
                </div>

                {/* 3. cat mision.txt */}
                <div className="flex items-center flex-wrap gap-0 mt-2">
                   <PromptSymbol /> <span className="ml-2">cat mision.txt</span>
                </div>
                <div className="mb-6 opacity-90" style={{color: 'var(--term-text-main)'}}>Construyendo el futuro con IA y Tecnologías Web.</div>

                <div className="italic mb-4 border-l-2 pl-3" style={{ borderColor: 'var(--term-border)', color: 'var(--term-text-muted)' }}>
                  -- Sesión interactiva iniciada. Escribe <span style={{ color: 'var(--term-link)', fontWeight: 'bold' }}>help</span>. --
                </div>
              </div>

              {/* Historial interactivo */}
              {history.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.type === 'command' ? (
                    <div className="flex items-center gap-0 flex-wrap">
                      <PromptSymbol />
                      <span className="ml-2" style={{ color: 'var(--term-text-main)' }}>{item.content}</span>
                    </div>
                  ) : (
                    <div className="ml-0 md:ml-2 mb-2 fade-in">{item.content}</div>
                  )}
                </div>
              ))}

              {/* Input en linea */}
              <form onSubmit={onSubmit} className="flex items-center flex-wrap">
                <PromptSymbol />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-grow font-mono min-w-[50px] ml-2"
                  style={{ 
                      color: 'var(--term-text-main)', 
                      caretColor: 'var(--term-accent)' 
                  }}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TerminalHero;