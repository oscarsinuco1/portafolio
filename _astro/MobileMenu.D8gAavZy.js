import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.C3fby7TX.js";import{F as b,a as g}from"./fa.BSAAq9qL.js";import v from"./ThemeToggle.CPpXbH39.js";import"./colorTokens.SmgSt678.js";const w=()=>{const[r,l]=t.useState(!1),i=t.useRef(null),u=t.useRef(null),f=t.useRef(null),p=()=>l(!r),o=()=>l(!1);return t.useEffect(()=>{const a=n=>{r&&i.current&&!i.current.contains(n.target)&&o()};return document.addEventListener("mousedown",a),()=>document.removeEventListener("mousedown",a)},[r]),t.useEffect(()=>{const a=n=>{if(r){if(n.key==="Escape")o(),u.current?.focus();else if(n.key==="Tab"){const c=i.current;if(!c)return;const s=c.querySelectorAll("a, button"),d=s[0],m=s[s.length-1];n.shiftKey?document.activeElement===d&&(n.preventDefault(),m.focus()):document.activeElement===m&&(n.preventDefault(),d.focus())}}};return r&&(document.addEventListener("keydown",a),setTimeout(()=>f.current?.focus(),100)),()=>document.removeEventListener("keydown",a)},[r]),t.useEffect(()=>(r?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[r]),e.jsxs("div",{className:"mobile-nav-container",ref:i,children:[e.jsx("button",{onClick:p,className:`menu-trigger ${r?"active":""}`,"aria-label":"Toggle menu",children:r?e.jsx(b,{}):e.jsx(g,{})}),e.jsxs("div",{className:`floating-menu-overlay ${r?"is-visible":""}`,children:[e.jsx("div",{className:"menu-backdrop-clear",onClick:o}),e.jsx("div",{className:"menu-card",children:e.jsxs("nav",{className:"nav-links",children:[e.jsx("a",{href:"#about",onClick:o,className:"nav-item",children:"Sobre mí"}),e.jsx("a",{href:"#experience",onClick:o,className:"nav-item",children:"Experiencia"}),e.jsx("a",{href:"#projects",onClick:o,className:"nav-item",children:"Proyectos"}),e.jsx("a",{href:"#skills",onClick:o,className:"nav-item",children:"Habilidades"}),e.jsx("a",{href:"#contact",onClick:o,className:"nav-item contact-btn",children:"Contacto"}),e.jsx("div",{className:"menu-divider"}),e.jsx("div",{className:"theme-wrapper",children:e.jsx(v,{})})]})})]}),e.jsx("style",{children:`
                .mobile-nav-container { display: block; }
                @media (min-width: 768px) { .mobile-nav-container { display: none; } }

                .menu-trigger {
                    position: fixed;
                    top: 1rem;
                    right: 1rem;
                    z-index: 100;
                    background: rgba(var(--color-bg-surface), 0.95);
                    border: 1px solid rgba(var(--color-primary), 0.2);
                    color: rgb(var(--color-primary));
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .menu-trigger.active {
                    color: rgb(var(--color-secondary));
                    border-color: rgba(var(--color-secondary), 0.3);
                }

                .floating-menu-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 90;
                    visibility: hidden;
                    pointer-events: none;
                }

                .floating-menu-overlay.is-visible {
                    visibility: visible;
                    pointer-events: all;
                }

                /* Fondo transparente para detectar clics fuera, sin blur */
                .menu-backdrop-clear {
                    position: absolute;
                    inset: 0;
                    background: transparent;
                }

                .menu-card {
                    position: absolute;
                    top: 4.5rem;
                    right: 1rem;
                    width: 200px;
                    background: rgb(var(--color-bg-surface));
                    border: 1px solid rgba(var(--color-primary), 0.2);
                    border-radius: 14px;
                    padding: 0.75rem;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                    transform: translateY(-10px) scale(0.95);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    transform-origin: top right;
                }

                .floating-menu-overlay.is-visible .menu-card {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }

                .nav-links { display: flex; flex-direction: column; gap: 2px; }

                .nav-item {
                    display: block;
                    padding: 0.6rem 1rem;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: rgb(var(--color-text-base));
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                }

                .nav-item:hover {
                    background: rgba(var(--color-primary), 0.1);
                    color: rgb(var(--color-primary));
                }

                .contact-btn {
                    background: rgb(var(--color-primary));
                    color: rgb(var(--color-text-inverted)) !important;
                    margin-top: 4px;
                    text-align: center;
                    font-weight: 700;
                }

                .menu-divider {
                    height: 1px;
                    background: rgba(var(--color-text-muted), 0.15);
                    margin: 0.5rem 0;
                }

                .theme-wrapper { display: flex; justify-content: center; }

                /* Modo Claro */
                [data-theme="light"] .menu-card {
                    background: #ffffff;
                    border-color: #e2e8f0;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }
                
                [data-theme="light"] .menu-trigger {
                    background: #ffffff;
                    border-color: #e2e8f0;
                }
            `})]})};export{w as default};
