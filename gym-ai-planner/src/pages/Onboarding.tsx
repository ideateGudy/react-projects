import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import { useState, useEffect } from "react";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { ArrowRight, Loader2 } from "lucide-react";
import type { UserProfile } from "../types";
import { useNavigate } from "react-router-dom";

const goalOptions = [
  { value: "bulk", label: "Build Muscle (Bulk)" },
  { value: "cut", label: "Lose Fat (Cut)" },
  { value: "recomp", label: "Body Recomposition" },
  { value: "strength", label: "Build Strength" },
  { value: "endurance", label: "Improve Endurance" },
];

const experienceOptions = [
  { value: "beginner", label: "Beginner (0-1 Year)" },
  { value: "intermediate", label: "Intermediate (1-3 Years)" },
  { value: "advanced", label: "Advanced (3+ Years)" },
];

const daysPerWeekOptions = [
  { value: "2", label: "2 days per week" },
  { value: "3", label: "3 days per week" },
  { value: "4", label: "4 days per week" },
  { value: "5", label: "5 days per week" },
  { value: "6", label: "6 days per week" },
];

const sessionLengthOptions = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
];

const equipmentOptions = [
  {
    value: "home",
    label: "Basic Home Equipment (Dumbbells, Resistance Bands)",
  },
  { value: "full_gym", label: "Full Gym Access" },
  { value: "dumbbells", label: "Dumbbells Only" },
];

const splitOptions = [
  { value: "full_body", label: "Full Body" },
  { value: "upper_lower", label: "Upper/Lower Split" },
  { value: "pushpulllegs", label: "Push/Pull/Legs Split" },
  { value: "custom", label: "Let AI Decide" },
];

const Onboarding = () => {
  const { user, plan, isLoading, saveProfile, generatePlan } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    goal: "bulk",
    experience: "intermediate",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    preferredSplit: "upper_lower",
    injuries: "",
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isLoading && plan) {
      navigate("/profile");
    }
  }, [isLoading, plan, navigate]);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionaire = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const profile: Omit<UserProfile, "userId" | "updatedAt"> = {
      goal: formData.goal as UserProfile["goal"],
      experience: formData.experience as UserProfile["experience"],
      daysPerWeek: parseInt(formData.daysPerWeek),
      sessionLength: parseInt(formData.sessionLength),
      equipment: formData.equipment as UserProfile["equipment"],
      injuries: formData.injuries || undefined,
      preferredSplit: formData.preferredSplit as UserProfile["preferredSplit"],
    };

    try {
      await saveProfile(profile);
      setIsGenerating(true);
      await generatePlan();
      navigate("/profile");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save profile",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (!user) {
    return <RedirectToSignIn />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SignedIn>
      <div className="min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-xl mx-auto">
          {/* Progress Indicator */}

          {/* Step 1: Questionnaire */}
          {!isGenerating ? (
            <Card variant="bordered">
              <h1 className="text-2xl font-bold mb-2">
                Tell Us About Yourself
              </h1>
              <p className="text-muted mb-6">
                Help us create the perfect plan for you.
              </p>
              <form onSubmit={handleQuestionaire} className="space-y-5">
                {/* Goal */}
                <Select
                  id="goal"
                  label="What's your primary goal?"
                  options={goalOptions}
                  value={formData.goal}
                  onChange={(e) => updateFormData("goal", e.target.value)}
                />
                {/* Experience */}
                <Select
                  id="experience"
                  label="What's your experience level?"
                  options={experienceOptions}
                  value={formData.experience}
                  onChange={(e) => updateFormData("experience", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  {/* Days Per Week */}
                  <Select
                    id="daysPerWeek"
                    label="How many days per week can you train?"
                    options={daysPerWeekOptions}
                    value={formData.daysPerWeek}
                    onChange={(e) =>
                      updateFormData("daysPerWeek", e.target.value)
                    }
                  />
                  {/* Session Length */}
                  <Select
                    id="sessionLength"
                    label="How long is each training session?"
                    options={sessionLengthOptions}
                    value={formData.sessionLength}
                    onChange={(e) =>
                      updateFormData("sessionLength", e.target.value)
                    }
                  />
                </div>

                {/* Equipment */}
                <Select
                  id="equipment"
                  label="What equipment do you have access to?"
                  options={equipmentOptions}
                  value={formData.equipment}
                  onChange={(e) => updateFormData("equipment", e.target.value)}
                />
                {/* Preferred Split */}
                <Select
                  id="preferredSplit"
                  label="What's your preferred training split?"
                  options={splitOptions}
                  value={formData.preferredSplit}
                  onChange={(e) =>
                    updateFormData("preferredSplit", e.target.value)
                  }
                />
                {/* Injuries */}
                <Textarea
                  id="injuries"
                  label="Any injuries or limitations? (optional)"
                  placeholder="E.g., lower back issues, shoulder impingement"
                  rows={3}
                  value={formData.injuries}
                  onChange={(e) => updateFormData("injuries", e.target.value)}
                />

                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="flex-1 gap-2">
                    Generate My Plan <ArrowRight className="w-4 h-4" />
                  </Button>
                  {/* <Button variant="ghost" >
                  Skip for Now
                </Button> */}
                </div>
              </form>
            </Card>
          ) : (
            <Card variant="bordered" className="text-center py-16">
              <Loader2 className="animate-spin mx-auto mb-4 w-12 h-12 text-accent" />
              <h1 className="text-2xl font-bold text-center">
                Creating Your Plan
              </h1>
              <p className="text-center text-muted">
                Our AI is building your personalized training program.
              </p>
              {error && (
                <p className="text-center text-red-500 mt-2">{error}</p>
              )}
            </Card>
          )}
          {/* Step 2: Generating Plan */}
        </div>
      </div>
    </SignedIn>
  );
};

export default Onboarding;
