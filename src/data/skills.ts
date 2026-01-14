
import {
  FaJava,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaLinux,
  FaDatabase
} from "react-icons/fa";
import {
  SiTypescript,
  SiAngular,
  SiRedux,
  SiNestjs,
  SiExpress,
  SiGoogle,
  SiOpenai,
  SiFlutter,
  SiIonic,
  SiGitlab,
  SiPostgresql,
  SiMongodb,
  SiFirebase
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

export interface Skill {
  name: string;
  icon: React.ElementType;
}

export const skills: Skill[] = [
  { name: "Java", icon: FaJava },
  { name: "JavaScript", icon: FaJs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "HTML", icon: FaHtml5 },
  { name: "CSS", icon: FaCss3Alt },
  { name: "Angular (Expert)", icon: SiAngular },
  { name: "React", icon: FaReact },
  { name: "Redux", icon: SiRedux },
  { name: "NestJS", icon: SiNestjs },
  { name: "Express", icon: SiExpress },
  { name: "Node.js", icon: FaNodeJs },
  { name: "GenKit", icon: SiGoogle },
  { name: "Gemini API", icon: SiGoogle },
  { name: "Azure OpenAI", icon: SiOpenai },
  { name: "Flutter", icon: SiFlutter },
  { name: "Ionic", icon: SiIonic },
  { name: "Azure", icon: VscAzure },
  { name: "GitLab CI/CD", icon: SiGitlab },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "SQL Server", icon: FaDatabase },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Firebase", icon: SiFirebase },
  { name: "Linux", icon: FaLinux },
];
