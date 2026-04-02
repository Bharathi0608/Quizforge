import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, Save, Trophy, Brain, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [recentResults, setRecentResults] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name);
      setBio(profile.bio || "");
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      supabase
        .from("quiz_results")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10)
        .then(({ data }) => setRecentResults(data || []));
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim(), bio: bio.trim() })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      await refreshProfile();
      toast({ title: "Profile updated!" });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  const accuracy = profile && profile.total_questions_attempted > 0
    ? Math.round((profile.total_correct_answers / profile.total_questions_attempted) * 100)
    : 0;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-8">
            Your <span className="text-gradient">Profile</span>
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-xl p-5 text-center">
              <Brain className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile?.total_quizzes_taken || 0}</div>
              <div className="text-xs text-muted-foreground">Quizzes Taken</div>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <Target className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="glass rounded-xl p-5 text-center">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile?.total_correct_answers || 0}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="glass rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Edit Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={30}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground outline-none focus:ring-2 ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={200}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground outline-none focus:ring-2 ring-primary/30 resize-none"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Recent Results */}
          {recentResults.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Recent Results</h2>
              <div className="space-y-3">
                {recentResults.map((r) => {
                  const pct = Math.round((r.score / r.total_questions) * 100);
                  return (
                    <div key={r.id} className="glass rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm">{r.quiz_title}</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {new Date(r.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold font-mono ${pct >= 80 ? "text-accent" : pct >= 50 ? "text-primary" : "text-destructive"}`}>
                          {pct}%
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {r.score}/{r.total_questions} • {r.time_taken}s
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
