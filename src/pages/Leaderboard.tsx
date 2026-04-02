import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/score");
        const data = await res.json();

        const formatted = data.map((item) => ({
          id: item._id,
          quiz_title: item.quizTitle,
          score: item.score,
          total_questions: item.totalQuestions,
          display_name: item.userName || "User" // ✅ FIXED
        }));

        formatted.sort((a, b) => {
          const pctA = (a.score / a.total_questions) * 100;
          const pctB = (b.score / b.total_questions) * 100;
          return pctB - pctA;
        });

        setEntries(formatted);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (i) => {
    if (i === 0) return <Trophy className="w-5 h-5 text-primary" />;
    if (i === 1) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (i === 2) return <Award className="w-5 h-5 text-primary" />;
    return <span>{i + 1}</span>;
  };

  return (
    <div className="min-h-screen px-4 py-8">
  <div className="max-w-3xl mx-auto">
    
    <Link to="/" className="mb-6 inline-block text-muted-foreground hover:text-white">
      ← Home
    </Link>

    <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
      Leaderboard
    </h1>

    {/* FILTER BUTTONS */}
    <div className="flex gap-3 mb-6 flex-wrap">
      {["All", ...new Set(entries.map(e => e.quiz_title))].map((cat) => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`px-4 py-2 rounded-full text-sm ${
            filter === cat
              ? "bg-yellow-400 text-black font-semibold"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* LIST */}
    <div className="space-y-4">
      {entries
        .filter(e => filter === "All" || e.quiz_title === filter)
        .map((entry, i) => {
          const pct = Math.round((entry.score / entry.total_questions) * 100);

          return (
            <motion.div
              key={entry.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl border transition ${
                i === 0
                  ? "bg-gradient-to-r from-yellow-400/10 to-green-400/10 border-yellow-400 shadow-lg"
                  : "bg-secondary border-muted"
              }`}
            >
              <div className="flex justify-between items-center">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div>
                    {i === 0 && "🏆"}
                    {i === 1 && "🥈"}
                    {i === 2 && "🥉"}
                    {i > 2 && <span>{i + 1}</span>}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      {entry.display_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.quiz_title}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className={`font-bold ${pct >= 80 ? "text-green-400" : "text-red-400"}`}>
                    {pct}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {entry.score}/{entry.total_questions}
                  </p>
                </div>

              </div>
            </motion.div>
          );
        })}
    </div>

  </div>
</div>


  );
};

export default Leaderboard;