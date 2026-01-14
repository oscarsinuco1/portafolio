
export interface Project {
    id: string;
    title: string;
    category: 'GenAI' | 'Personal' | 'Other';
    description: string;
    tags: string[];
    github: string;
    image?: string; // Optional for now, will use placeholders or colors if missing
}

export const projects: Project[] = [
    {
        id: 'semantic-reviewer',
        title: 'AI Semantic Code Reviewer',
        category: 'GenAI',
        description: "Agente inteligente que audita Pull Requests buscando integridad arquitectónica y buenas prácticas. Detecta anti-patrones complejos y riesgos de mantenimiento que herramientas estáticas omiten.",
        tags: ["Python", "LLM APIs (Gemini/OpenAI)", "Git Webhooks", "CI/CD"],
        github: "https://github.com/",
    },
    {
        id: 'auto-remediation',
        title: 'Auto-Remediation Agent',
        category: 'GenAI',
        description: "Bot proactivo que arregla deuda técnica y mejora la cobertura de tests de forma autónoma. Genera unit tests faltantes y refactoriza el código para cumplir con los quality gates.",
        tags: ["GenKit", "TypeScript", "AST Parsing", "Azure DevOps"],
        github: "https://github.com/",
    },
    {
        id: 'pingo',
        title: 'Pingo App',
        category: 'Personal',
        description: "App de intercomunicador móvil multiplataforma que usa WebRTC sobre Wi-Fi y Bluetooth para comunicación P2P de audio sin necesidad de datos móviles.",
        tags: ["Flutter", "WebRTC", "Sockets"],
        github: "https://github.com/",
    },
    {
        id: 'theft-predictor',
        title: 'Theft Predictor',
        category: 'Personal',
        description: "Plataforma web de analítica predictiva que estimaba el riesgo de robo en Bucaramanga usando datos geoespaciales históricos. Procesó más de 12,000 incidentes.",
        tags: ["Python", "Django", "TensorFlow", "VanillaJS"],
        github: "https://github.com/",
    },
    {
        id: 'pdf-reporter',
        title: 'PDF Reporter',
        category: 'Personal',
        description: "Microservicio en NodeJS para generar PDFs desde plantillas HTML precompiladas. Renderiza reportes dinámicos usando Puppeteer y Handlebars.",
        tags: ["Node.js", "Puppeteer", "Handlebars"],
        github: "https://github.com/",
    }
];
