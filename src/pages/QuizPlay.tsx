import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getQuizById } from "@/data/quizzes";
// ❌ removed supabase
// ❌ removed useAuth
import { ArrowLeft, Clock, CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";

type Phase = "intro" | "playing" | "results";

const QuizPlay = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quiz = getQuizById(id || "");

  // ✅ NEW: use token instead of user
  const token = localStorage.getItem("token");
  console.log("🔐 TOKEN:", token);

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number; correct: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(quiz?.questions || []);


useEffect(() => {
  if (phase !== "playing") return;

  if (timeLeft === 0) {
    nextQuestion(); // 🔥 auto move
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [timeLeft, phase]);



  const question = shuffledQuestions[currentQ];

  const shuffleArray = <T,>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = () => {
    if (!quiz) return;

    // ✅ FIXED AUTH CHECK
    if (!token) {
      navigate("/auth");
      return;
    }

    setShuffledQuestions(shuffleArray(quiz.questions));
    setPhase("playing");
    setCurrentQ(0);
    setAnswers([]);
    setTotalTime(0);
    // setTimeLeft(quiz.timePerQuestion);
    setTimeLeft(25);
  };

  // const handleAnswer = useCallback((idx: number) => {
  //   // if (!quiz || !question || showExplanation) return;

  //   if (!quiz || !question) return;
  //   setSelected(idx);
  //   setShowExplanation(true);
  //   const timeTaken = quiz.timePerQuestion - timeLeft;
  //   setTotalTime((t) => t + timeTaken);
  //   const correct = idx === question.correctIndex;
  //   setAnswers((prev) => [...prev, { questionId: question.id, selectedIndex: idx, correct }]);
  // }, [quiz, question, showExplanation, timeLeft]);


  const handleAnswer = useCallback((idx: number) => {
  if (!quiz || !question) return;

  setSelected(idx);
  setShowExplanation(true);

  const timeTaken = quiz.timePerQuestion - timeLeft;
  setTotalTime((t) => t + timeTaken);

  const correct = idx === question.correctIndex;

  // ✅ FIX: update existing answer instead of duplicating
  setAnswers((prev) => {
    const existingIndex = prev.findIndex(
      (a) => a.questionId === question.id
    );

    if (existingIndex !== -1) {
      const updated = [...prev];
      updated[existingIndex] = {
        questionId: question.id,
        selectedIndex: idx,
        correct,
      };
      return updated;
    }

    return [
      ...prev,
      {
        questionId: question.id,
        selectedIndex: idx,
        correct,
      },
    ];
  });

}, [quiz, question, timeLeft]);

  const nextQuestion = async () => {


    
    if (!quiz) return;
    // ✅ ADD THIS BLOCK (DON'T TOUCH OTHER CODE)
if (selected === null && question) {
  setAnswers((prev) => {
    const exists = prev.find(a => a.questionId === question.id);
    if (exists) return prev;

    return [
      ...prev,
      {
        questionId: question.id,
        selectedIndex: -1, // ❌ Not answered
        correct: false,
      },
    ];
  });
}
    setShowExplanation(false);
    setSelected(null);

    if (currentQ + 1 >= quiz.questions.length) {
      const score = [...answers].filter((a) => a.correct).length;


      if (token) {
  try {
    console.log("🚀 Sending score...");

    const res = await fetch("https://quizforge-7c83.onrender.com/api/score/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
  score,
  quizTitle: quiz.title,
  totalQuestions: quiz.questions.length,
  answers // ✅ ADD THIS
})

      // body: JSON.stringify({
      //   score,
      //   quizTitle: quiz.title,
      //   totalQuestions: quiz.questions.length
      // })
    });

    const data = await res.json();

    console.log("✅ Score API Response:", data);

  } catch (error) {
    console.log("❌ Error saving score:", error);
  }
}
      // // ✅ SAVE TO MONGODB
      // if (token) {
      //   // await fetch("http://localhost:5000/api/score", {
      //   fetch("http://localhost:5000/api/score/add", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`
      //     },
      //     body: JSON.stringify({
      //       score,
      //       quizTitle: quiz.title,
      //       totalQuestions: quiz.questions.length
      //     })
      //   });
      // }

      setPhase("results");
    } else {
      setCurrentQ((c) => c + 1);
      // setTimeLeft(quiz.timePerQuestion);
      setTimeLeft(25);
    }
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
          <Link to="/quizzes" className="text-primary hover:underline">Browse all quizzes</Link>
        </div>
      </div>
    );
  }

  const score = answers.filter((a) => a.correct).length;
  const percentage = Math.round((score / quiz.questions.length) * 100);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {phase === "intro" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <Link to="/quizzes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Quizzes
            </Link>
            <div className="text-5xl mb-6">{quiz.icon}</div>
            <h1 className="text-4xl font-bold mb-3">{quiz.title}</h1>
            <p className="text-muted-foreground mb-2">{quiz.description}</p>
            <div className="flex justify-center gap-4 text-sm font-mono text-muted-foreground mb-8">
              <span>{quiz.questions.length} questions</span>
              <span>•</span>
              <span>{quiz.timePerQuestion}s per question</span>
              <span>•</span>
              <span>{quiz.difficulty}</span>
            </div>

            {!token && (
              <p className="text-sm text-muted-foreground mb-4">
                <Link to="/auth" className="text-primary hover:underline">Sign in</Link> to save your results
              </p>
            )}

            <button
              onClick={startQuiz}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity glow"
            >
              {token ? "Start Quiz" : "Sign In to Start"}
            </button>
          </motion.div>
        )}

        {phase === "playing" && question && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-mono text-muted-foreground">
                {currentQ + 1} / {quiz.questions.length}
              </span>
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${timeLeft <= 5 ? "text-destructive" : "text-muted-foreground"}`} />
                <span className={`font-mono font-bold ${timeLeft <= 5 ? "text-destructive" : "text-foreground"}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            <div className="w-full h-2 rounded-full bg-secondary mb-8">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={false}
                animate={{ width: `${((currentQ + (showExplanation ? 1 : 0)) / quiz.questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {!showExplanation && (
              <div className="w-full h-1 rounded-full bg-secondary mb-8 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${timeLeft <= 5 ? "bg-destructive" : "bg-primary/50"}`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: timeLeft, ease: "linear" }}
                  key={currentQ}
                />
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl md:text-2xl font-bold mb-8">{question.question}</h2>

                <div className="grid gap-3">
                  {question.options.map((option, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = idx === question.correctIndex;
                    const showResult = showExplanation;

                    let optionClass = "glass glass-hover";


if (isSelected) {
  optionClass = "border-primary border bg-primary/20";
}
                    // if (showResult && isCorrect) optionClass = "bg-accent/20 border-accent border";
                    // else if (showResult && isSelected && !isCorrect) optionClass = "bg-destructive/20 border-destructive border";
                    else if (isSelected) optionClass = "border-primary border bg-primary/10";

                    return (
                      <button
                        key={idx}

                        onClick={() => handleAnswer(idx)}
                        // onClick={() => !showExplanation && handleAnswer(idx)}
                        // disabled={showExplanation}
                        className={`w-full text-left px-5 py-4 rounded-xl transition-all flex items-center gap-3 ${optionClass}`}
                      >
                        <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-mono font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {/* {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-accent shrink-0" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive shrink-0" />} */}
                      </button>
                    );
                  })}
                </div>

{/* ✅ ADD BUTTONS HERE */}
{/* <div className="mt-6 flex justify-between items-center"> */}

  {/* PREVIOUS BUTTON
  <button
    onClick={() => {
      if (currentQ > 0) {
        setCurrentQ((c) => c - 1);
        setSelected(null);
        setShowExplanation(false);
      }
    }}
    disabled={currentQ === 0}
    className="px-4 py-2 rounded-lg bg-secondary text-white disabled:opacity-50"
  >
    ← Previous
  </button> */}

  {/* NEXT BUTTON */}
  <div className="mt-6 flex justify-end">
  <button
    onClick={nextQuestion}
    className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:opacity-90 transition"
  >
    {currentQ + 1 >= quiz.questions.length ? "Finish" : "Next →"}
  </button>

</div>

{/* 
                {showExplanation && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 rounded-xl glass">
                    <p className="text-sm font-semibold text-primary mb-1">Explanation</p>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    <button
                      onClick={nextQuestion}
                      className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                      {currentQ + 1 >= quiz.questions.length ? "See Results" : "Next Question"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )} */}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {phase === "results" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="text-6xl mb-6">{percentage >= 80 ? "🏆" : percentage >= 50 ? "👍" : "📚"}</div>
            <h1 className="text-4xl font-bold mb-2">
              {percentage >= 80 ? "Excellent!" : percentage >= 50 ? "Good Job!" : "Keep Practicing!"}
            </h1>
            <p className="text-muted-foreground mb-8">
              You scored <span className="text-primary font-bold">{score}/{quiz.questions.length}</span> ({percentage}%) in {totalTime}s
            </p>

          <div className="mt-8 text-left">
  <h2 className="text-xl font-bold mb-4">Review Answers</h2>

  {answers.map((ans, index) => {
    const q = quiz.questions.find(q => q.id === ans.questionId);

    return (
      <div key={index} className="mb-4 p-4 rounded-lg bg-secondary">
        {/* <p className="font-semibold mb-2">{q?.question}</p> */}
        <p className="font-semibold mb-2">
  Q{index + 1}. {q?.question}
</p>

        <p className="text-sm">
          {/* Your Answer: {q?.options[ans.selectedIndex]} */}
          <p className="text-sm">
  Your Answer:{" "}
  {ans.selectedIndex === -1
    ? "Not Answered ❌"
    : q?.options[ans.selectedIndex]}
</p>
        </p>

        <p className={`text-sm ${ans.correct ? "text-green-400" : "text-red-400"}`}>
          {ans.correct ? "✅ Correct" : "❌ Wrong"}
        </p>

        {!ans.correct && (
          <p className="text-sm text-green-400">
            Correct Answer: {q?.options[q.correctIndex]}
          </p>
        )}
      </div>
    );
  })}
</div>



            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => { setPhase("intro"); setCurrentQ(0); setAnswers([]); setSelected(null); setShowExplanation(false); setTotalTime(0); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glass-hover font-semibold"
              >
                <RotateCcw className="w-4 h-4" /> Retry
              </button>

              <Link to="/leaderboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                View Leaderboard
              </Link>

              <Link to="/quizzes" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glass-hover font-semibold">
                More Quizzes
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizPlay;
