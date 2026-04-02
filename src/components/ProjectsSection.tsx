// import { motion } from "framer-motion";
// import { ExternalLink, Github, Star } from "lucide-react";
// import { useState } from "react";

// const projects = [
//   {
//     title: "CloudSync Dashboard",
//     description: "Real-time cloud infrastructure monitoring dashboard with WebSocket integration, interactive charts, and alert management.",
//     tech: ["React", "TypeScript", "Node.js", "WebSocket", "D3.js"],
//     category: "fullstack",
//     stars: 128,
//     image: "📊",
//   },
//   {
//     title: "AI Code Reviewer",
//     description: "Automated code review tool using OpenAI API that analyzes PRs, suggests improvements, and enforces coding standards.",
//     tech: ["Python", "FastAPI", "React", "OpenAI", "PostgreSQL"],
//     category: "ai",
//     stars: 256,
//     image: "🤖",
//   },
//   {
//     title: "DevConnect Social",
//     description: "Developer networking platform with real-time chat, project collaboration, and skill-based matching algorithm.",
//     tech: ["Next.js", "Prisma", "PostgreSQL", "Socket.io", "Redis"],
//     category: "fullstack",
//     stars: 89,
//     image: "🌐",
//   },
//   {
//     title: "PackageViz",
//     description: "Interactive npm dependency visualizer that maps package relationships, detects vulnerabilities, and suggests optimizations.",
//     tech: ["React", "D3.js", "Node.js", "Express"],
//     category: "tools",
//     stars: 342,
//     image: "📦",
//   },
//   {
//     title: "TaskFlow Engine",
//     description: "Workflow automation engine with drag-and-drop builder, custom triggers, and integration with popular APIs.",
//     tech: ["React", "TypeScript", "Go", "RabbitMQ", "MongoDB"],
//     category: "fullstack",
//     stars: 175,
//     image: "⚡",
//   },
//   {
//     title: "GitMetrics",
//     description: "GitHub analytics dashboard tracking contribution patterns, code quality metrics, and team productivity insights.",
//     tech: ["Vue.js", "Python", "GitHub API", "Chart.js"],
//     category: "tools",
//     stars: 203,
//     image: "📈",
//   },
// ];

// const filters = ["all", "fullstack", "ai", "tools"];

// const ProjectsSection = () => {
//   const [activeFilter, setActiveFilter] = useState("all");

//   const filtered = activeFilter === "all"
//     ? projects
//     : projects.filter((p) => p.category === activeFilter);

//   return (
//     <section id="projects" className="py-24 px-6">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <span className="font-mono text-sm text-primary tracking-widest uppercase">
//             Portfolio
//           </span>
//           <h2 className="text-4xl md:text-5xl font-bold mt-3">
//             Featured <span className="text-gradient-primary">Projects</span>
//           </h2>
//         </motion.div>

//         <div className="flex justify-center gap-3 mb-12 flex-wrap">
//           {filters.map((f) => (
//             <button
//               key={f}
//               onClick={() => setActiveFilter(f)}
//               className={`font-mono text-sm px-4 py-2 rounded-lg transition-all duration-300 capitalize ${
//                 activeFilter === f
//                   ? "bg-primary text-primary-foreground glow-primary"
//                   : "glass glass-hover text-muted-foreground"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((project) => (
//             <motion.div
//               key={project.title}
//               layout
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               whileHover={{ y: -8 }}
//               className="glass glass-hover rounded-xl overflow-hidden group cursor-pointer"
//             >
//               <div className="h-40 flex items-center justify-center text-6xl bg-secondary/30 group-hover:bg-secondary/50 transition-colors">
//                 {project.image}
//               </div>
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="font-semibold text-lg">{project.title}</h3>
//                   <div className="flex items-center gap-1 text-muted-foreground text-sm">
//                     <Star size={14} className="text-primary" />
//                     {project.stars}
//                   </div>
//                 </div>
//                 <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
//                   {project.description}
//                 </p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.tech.map((t) => (
//                     <span
//                       key={t}
//                       className="font-mono text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
//                     >
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex gap-3">
//                   <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
//                     <Github size={14} /> Code
//                   </a>
//                   <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
//                     <ExternalLink size={14} /> Demo
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;

import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "CloudSync Dashboard",
    description: "Real-time cloud infrastructure monitoring dashboard with WebSocket integration, interactive charts, and alert management.",
    tech: ["React", "TypeScript", "Node.js", "WebSocket", "D3.js"],
    category: "fullstack",
    stars: 128,
    image: "📊",
  },
  {
    title: "AI Code Reviewer",
    description: "Automated code review tool using OpenAI API that analyzes PRs, suggests improvements, and enforces coding standards.",
    tech: ["Python", "FastAPI", "React", "OpenAI", "PostgreSQL"],
    category: "ai",
    stars: 256,
    image: "🤖",
  },
  {
    title: "DevConnect Social",
    description: "Developer networking platform with real-time chat, project collaboration, and skill-based matching algorithm.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Socket.io", "Redis"],
    category: "fullstack",
    stars: 89,
    image: "🌐",
  },
  {
    title: "PackageViz",
    description: "Interactive npm dependency visualizer that maps package relationships, detects vulnerabilities, and suggests optimizations.",
    tech: ["React", "D3.js", "Node.js", "Express"],
    category: "tools",
    stars: 342,
    image: "📦",
  },
  {
    title: "TaskFlow Engine",
    description: "Workflow automation engine with drag-and-drop builder, custom triggers, and integration with popular APIs.",
    tech: ["React", "TypeScript", "Go", "RabbitMQ", "MongoDB"],
    category: "fullstack",
    stars: 175,
    image: "⚡",
  },
  {
    title: "GitMetrics",
    description: "GitHub analytics dashboard tracking contribution patterns, code quality metrics, and team productivity insights.",
    tech: ["Vue.js", "Python", "GitHub API", "Chart.js"],
    category: "tools",
    stars: 203,
    image: "📈",
  },
];

const filters = ["all", "fullstack", "ai", "tools"];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
        </motion.div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-mono text-sm px-4 py-2 rounded-lg transition-all duration-300 capitalize ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "glass glass-hover text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -8 }}
              className="glass glass-hover rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="h-40 flex items-center justify-center text-6xl bg-secondary/30 group-hover:bg-secondary/50 transition-colors">
                {project.image}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Star size={14} className="text-primary" />
                    {project.stars}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                    <Github size={14} /> Code
                  </a>
                  <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                    <ExternalLink size={14} /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

