import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const timeline = [
  {
    type: "work",
    title: "Senior Full Stack Developer",
    org: "TechCorp Inc.",
    period: "2023 – Present",
    description: "Leading a team of 5 developers building microservices architecture. Reduced API response time by 40%.",
  },
  {
    type: "work",
    title: "Full Stack Developer",
    org: "StartupXYZ",
    period: "2021 – 2023",
    description: "Built the entire frontend from scratch using React and TypeScript. Implemented CI/CD pipelines with GitHub Actions.",
  },
  {
    type: "education",
    title: "B.Tech in Computer Science",
    org: "Indian Institute of Technology",
    period: "2017 – 2021",
    description: "CGPA: 8.7/10. Specialized in algorithms and distributed systems. Led the coding club for 2 years.",
  },
  {
    type: "work",
    title: "Software Engineering Intern",
    org: "Google Summer of Code",
    period: "Summer 2020",
    description: "Contributed to open-source project with 5k+ GitHub stars. Implemented new API endpoints and wrote comprehensive tests.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-primary tracking-widest uppercase">
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Experience & <span className="text-gradient-primary">Education</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`relative flex items-start mb-12 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-primary z-10 mt-6" />

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="glass glass-hover rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {item.type === "work" ? (
                      <Briefcase size={16} className="text-primary" />
                    ) : (
                      <GraduationCap size={16} className="text-accent" />
                    )}
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-primary font-mono text-sm mb-3">{item.org}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
