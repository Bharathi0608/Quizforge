import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { quizzes } from "@/data/quizzes";
import { ArrowRight, Brain, Trophy, Timer, Zap } from "lucide-react";

const difficultyColor = {
  Easy: "text-accent",
  Medium: "text-primary",
  Hard: "text-destructive",
};

const Home = () => {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">
                Placement-Ready Assessments
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Master Your
              <span className="text-gradient block mt-2">Tech Interview</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Timed quizzes on JavaScript, React, DSA, System Design & more.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 flex-wrap">

              <Link
                to="/quizzes"
                className="relative group inline-flex items-center justify-center px-8 py-4 rounded-xl 
                bg-yellow-400 text-black font-semibold text-lg 
                transition-all duration-300 
                hover:scale-105 hover:-translate-y-1 
                hover:shadow-xl hover:shadow-yellow-400/40 active:scale-95 overflow-hidden"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-yellow-400/20 blur-xl"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Start a Quiz <ArrowRight className="w-5 h-5" />
                </span>
              </Link>

              <Link
                to="/leaderboard"
                className="relative group inline-flex items-center justify-center px-8 py-4 rounded-xl 
                border border-yellow-400 text-yellow-400 font-semibold text-lg 
                transition-all duration-300 
                hover:scale-105 hover:-translate-y-1 
                hover:bg-yellow-400 hover:text-black 
                hover:shadow-xl hover:shadow-yellow-400/40 active:scale-95 overflow-hidden"
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-yellow-400/10 blur-xl"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Trophy className="w-5 h-5" /> Leaderboard
                </span>
              </Link>

            </div>

          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">

          {[
            { label: "Quizzes", value: quizzes.length, icon: Brain },
            { label: "Questions", value: quizzes.reduce((a, q) => a + q.questions.length, 0), icon: Zap },
            { label: "Categories", value: [...new Set(quizzes.map(q => q.category))].length, icon: Trophy },
            { label: "Timed", value: "Yes", icon: Timer },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="relative group overflow-hidden rounded-xl p-5 text-center 
              bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] 
              border border-white/10 
              transition-all duration-300 
              hover:scale-[1.05] hover:-translate-y-1 
              hover:shadow-xl hover:shadow-yellow-400/20"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-yellow-400/10 blur-xl"></div>

              <div className="relative z-10">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-125 transition-transform" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* 🔥 FEATURED QUIZZES (ADDED BACK) */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured <span className="text-gradient">Quizzes</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quizzes.map((quiz, i) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link
                  to={`/quiz/${quiz.id}`}
                  className="relative group block rounded-xl p-6 h-full 
                  bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] 
                  border border-white/10 
                  transition-all duration-300 
                  hover:scale-[1.05] hover:-translate-y-1 
                  hover:shadow-xl hover:shadow-yellow-400/20 overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-yellow-400/10 blur-xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{quiz.icon}</span>
                      <span className={`text-xs font-mono font-semibold ${difficultyColor[quiz.difficulty]}`}>
                        {quiz.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {quiz.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {quiz.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{quiz.questions.length} Qs</span>
                      <span>{quiz.timePerQuestion}s</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<footer className="mt-12 border-t border-white/10 bg-[#0a0a0a] px-6 py-8">

  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

    {/* LEFT */}
    <div>
      <h2 className="text-lg font-semibold text-yellow-400 mb-2">QuizForge</h2>
      <p className="text-sm text-muted-foreground mb-3">
        Practice • Improve • Crack Interviews 🚀
      </p>

      <div className="flex gap-4 text-sm">
        <span className="hover:text-yellow-400 cursor-pointer">🌐</span>
        <span className="hover:text-yellow-400 cursor-pointer">💻</span>
        <span className="hover:text-yellow-400 cursor-pointer">📧</span>
      </div>
    </div>

    {/* CENTER */}
    <div className="text-sm text-muted-foreground">
      <h3 className="text-white font-semibold mb-2">Quick Links</h3>
      <div className="flex flex-col gap-2">
        <a href="/" className="hover:text-yellow-400 transition">Home</a>
        <a href="/quizzes" className="hover:text-yellow-400 transition">Quizzes</a>
        <a href="/leaderboard" className="hover:text-yellow-400 transition">Leaderboard</a>
      </div>
    </div>

    {/* RIGHT */}
    <div className="text-sm text-muted-foreground">
      <h3 className="text-white font-semibold mb-2">About</h3>
      <p className="mb-2">
        Built for developers to master interviews with real-world quizzes.
      </p>
      <p className="text-xs">© 2026 QuizForge</p>
    </div>

  </div>

</footer>


    </div>

            

  );
};

export default Home;