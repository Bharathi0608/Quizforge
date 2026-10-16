import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { quizzes } from "@/data/quizzes";
import { ArrowLeft, Search } from "lucide-react";

const categories = ["All", ...new Set(quizzes.map((q) => q.category))];
const difficulties = ["All", "Easy", "Medium", "Hard"];

const difficultyColor: Record<string, string> = {
  Easy: "text-accent",
  Medium: "text-primary",
  Hard: "text-destructive",
};

const QuizList = () => {
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = quizzes.filter((q) => {
    if (category !== "All" && q.category !== category) return false;
    if (difficulty !== "All" && q.difficulty !== difficulty) return false;
    if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8">
          All <span className="text-gradient">Quizzes</span>
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl glass border-none outline-none focus:ring-2 ring-primary/30 bg-card text-foreground"
            />
          </div>

          {/* Category */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform
                ${
                  category === c
                    ? "bg-primary text-primary-foreground scale-105 shadow-lg shadow-primary/40"
                    : "glass glass-hover hover:scale-105 hover:shadow-md hover:shadow-primary/20 active:scale-95"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform
                ${
                  difficulty === d
                    ? "bg-primary text-primary-foreground scale-105 shadow-lg shadow-primary/40"
                    : "glass glass-hover hover:scale-105 hover:shadow-md hover:shadow-primary/20 active:scale-95"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

        </div>

        {/* Quiz Grid with POP animation */}
        <motion.div
          key={category + difficulty + search}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((quiz) => (
            <div key={quiz.id}>
              <Link
                to={`/quiz/${quiz.id}`}
                className="block rounded-xl p-6 h-full group relative overflow-hidden 
                bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] 
                border border-white/10 
                transition-all duration-300 
                hover:scale-[1.04] hover:-translate-y-1 
                hover:shadow-xl hover:shadow-yellow-400/20"
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 blur-xl"></div>

                {/* Content */}
                <div className="relative z-10">

                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl transition-transform duration-300 group-hover:scale-125">
                      {quiz.icon}
                    </span>

                    <span className={`text-xs font-mono font-semibold ${difficultyColor[quiz.difficulty]}`}>
                      {quiz.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {quiz.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{quiz.category}</span>
                    <span>
                      {quiz.questions.length} Qs • {quiz.timePerQuestion}s each
                    </span>
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </motion.div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No quizzes found matching your filters.
          </div>
        )}

      </div>
    </div>
  );
};

export default QuizList;