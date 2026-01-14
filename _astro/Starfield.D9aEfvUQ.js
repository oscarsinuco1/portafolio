import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.C3fby7TX.js";const h=()=>{const[i,l]=o.useState(!1),{stars:s,distantStars:d,nebulas:m}=o.useMemo(()=>{const a=(r,e)=>Math.random()*(e-r)+r,c=Array.from({length:150},(r,e)=>{const n=a(.5,2.5);return{id:e,x:a(0,100),y:a(0,100),size:a(1,2)*(n>1.5?1.5:1),opacity:a(.4,.8),duration:a(15,25)/n,delay:a(-25,0)}}),u=Array.from({length:300},(r,e)=>({id:e+1e3,x:a(0,100),y:a(0,100),size:a(.5,1.5),opacity:a(.1,.4),twinkleDuration:a(3,8),twinkleDelay:a(0,8)})),p=Array.from({length:3},(r,e)=>({id:e+500,x:a(10,80),size:a(500,800),duration:a(50,80),delay:a(-80,0),color:e===0?"var(--color-primary)":"var(--color-secondary)"}));return{stars:c,distantStars:u,nebulas:p}},[]);return o.useEffect(()=>{l(!0)},[]),i?t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"fixed inset-0 overflow-hidden pointer-events-none z-0",style:{background:"transparent"},children:[m.map(a=>t.jsx("div",{className:"absolute rounded-full animate-nebula-float nebula-element",style:{left:`${a.x}%`,top:"-20%",width:`${a.size}px`,height:`${a.size}px`,animationDuration:`${a.duration}s`,animationDelay:`${a.delay}s`,backgroundColor:`rgb(${a.color})`}},a.id)),d.map(a=>t.jsx("div",{className:"absolute rounded-full animate-twinkle distant-star-element",style:{left:`${a.x}%`,top:`${a.y}%`,width:`${a.size}px`,height:`${a.size}px`,opacity:a.opacity,animationDuration:`${a.twinkleDuration}s`,animationDelay:`${a.twinkleDelay}s`}},a.id)),s.map(a=>t.jsx("div",{className:"absolute rounded-full animate-star-travel star-element",style:{left:`${a.x}%`,top:"-5%",width:`${a.size}px`,height:`${a.size}px`,opacity:a.opacity,animationDuration:`${a.duration}s`,animationDelay:`${a.delay}s`}},a.id))]}),t.jsx("style",{children:`
        @keyframes star-travel {
          0% { transform: translateY(0vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }

        @keyframes nebula-float {
          0% { transform: translateY(0vh) scale(1); opacity: 0; }
          20% { opacity: 0.15; }
          80% { opacity: 0.15; }
          100% { transform: translateY(120vh) scale(1.3); opacity: 0; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }

        .animate-star-travel {
          animation: star-travel linear infinite;
          will-change: transform;
        }

        .animate-nebula-float {
          animation: nebula-float linear infinite;
          will-change: transform;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
          will-change: opacity, transform;
        }

        /* --- MODO DARK (Espacio de Neon) --- */
        [data-theme="dark"] .nebula-element {
          mix-blend-mode: screen;
          filter: blur(120px);
          opacity: 0.12;
        }

        [data-theme="dark"] .star-element {
          background-color: rgb(var(--color-text-base));
          box-shadow: 0 0 5px rgb(var(--color-text-base));
        }

        [data-theme="dark"] .distant-star-element {
          background-color: rgb(var(--color-text-base));
        }

        /* --- MODO LIGHT (Nubes Grises / Bruma) --- */
        [data-theme="light"] .nebula-element {
          /* Sobreescribimos el color a un gris suave */
          background-color: #d1d5db !important; /* Gris suave (Gray 300) */
          filter: blur(140px); /* Desenfoque mayor para efecto nube gaseosa */
          opacity: 0.25; /* Un poco más opaca porque el gris es sutil */
          mix-blend-mode: normal;
        }

        [data-theme="light"] .star-element {
          background-color: rgb(var(--color-text-muted));
          box-shadow: none;
        }

        [data-theme="light"] .distant-star-element {
          background-color: rgb(var(--color-text-muted));
        }
      `})]}):null};export{h as default};
