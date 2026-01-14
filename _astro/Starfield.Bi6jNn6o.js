import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r as o}from"./index.C3fby7TX.js";const f=()=>{const[s,l]=o.useState(!1),{stars:i,nebulas:d}=o.useMemo(()=>{const a=(r,e)=>Math.random()*(e-r)+r,c=Array.from({length:150},(r,e)=>{const n=a(.5,2.5);return{id:e,x:a(0,100),y:a(0,100),size:a(1,2)*(n>1.5?1.5:1),opacity:a(.4,.8),duration:a(15,25)/n,delay:a(-25,0)}}),m=Array.from({length:3},(r,e)=>({id:e+500,x:a(10,80),size:a(500,800),duration:a(50,80),delay:a(-80,0),color:e===0?"var(--color-primary)":"var(--color-secondary)"}));return{stars:c,nebulas:m}},[]);return o.useEffect(()=>{l(!0)},[]),s?t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"fixed inset-0 overflow-hidden pointer-events-none z-0",style:{background:"transparent"},children:[d.map(a=>t.jsx("div",{className:"absolute rounded-full animate-nebula-float nebula-element",style:{left:`${a.x}%`,top:"-20%",width:`${a.size}px`,height:`${a.size}px`,animationDuration:`${a.duration}s`,animationDelay:`${a.delay}s`,backgroundColor:`rgb(${a.color})`}},a.id)),i.map(a=>t.jsx("div",{className:"absolute rounded-full animate-star-travel star-element",style:{left:`${a.x}%`,top:"-5%",width:`${a.size}px`,height:`${a.size}px`,opacity:a.opacity,animationDuration:`${a.duration}s`,animationDelay:`${a.delay}s`}},a.id))]}),t.jsx("style",{children:`
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

        .animate-star-travel {
          animation: star-travel linear infinite;
          will-change: transform;
        }

        .animate-nebula-float {
          animation: nebula-float linear infinite;
          will-change: transform;
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
      `})]}):null};export{f as default};
