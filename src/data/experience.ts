
export interface ExperienceItem {
    date: string;
    title: string;
    company: string;
    location: string;
    description: string[];
    icon?: string; // Optional: specific icon name if we want to map it dynamically later
}

export const experienceData: ExperienceItem[] = [
    {
        date: "May 2023 - Actualidad",
        title: "Fullstack Developer",
        company: "Global MVM",
        location: "Remoto",
        description: [
            "Desarrollo y mantenimiento de aplicaciones en Angular (v8-v19) bajo una arquitectura de microfrontends en Azure.",
            "Migración de múltiples aplicaciones web de Azure App Services a Blob Storage, optimizando costos.",
            "Soporte a equipos de backend con integraciones .NET y configuración de pipelines CI/CD en Azure DevOps.",
            "Colaboración en equipos Agile/Scrum, proveyendo soporte técnico en retos de frontend y pipelines."
        ]
    },
    {
        date: "Abr 2021 - Dic 2025",
        title: "Frontend Development Lead",
        company: "Universidad Industrial de Santander (DTIC)",
        location: "Híbrido",
        description: [
            "Liderazgo en la arquitectura de aplicaciones Angular escalables y modulares.",
            "Mantenimiento y extensión de librerías de componentes UI personalizados.",
            "Impulso de la migración hacia una arquitectura de microfrontends con single-spa.",
            "Diseño y mantenimiento de pipelines CI/CD con GitLab CI para testing, linting, y despliegues multi-entorno."
        ]
    },
    {
        date: "Ago 2020 - Feb 2021",
        title: "Fullstack Developer",
        company: "C.R.A.S Development S.A.S",
        location: "Remoto",
        description: [
            "Liderazgo en el desarrollo end-to-end (frontend, backend, DB) de las aplicaciones web SmartSnacks y RubiWealth.",
            "Implementación de interfaces con Angular y desarrollo de APIs con Node.js.",
            "Gestión de hosting, despliegue y configuración de dominios."
        ]
    }
];
