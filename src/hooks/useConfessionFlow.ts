import { useState } from 'react';
import { analyzeSin, SinAnalysis } from '@/services/confession';
import { useToast } from "@/components/ui/use-toast";

export interface QuizAnswers {
  sinType: string;
  severity: string;
  frequency: string;
  regret: string;
}

export const useConfessionFlow = () => {
  const { toast } = useToast();
  const [showDisclaimerScreen, setShowDisclaimerScreen] = useState(true);
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    sinType: '',
    severity: '',
    frequency: '',
    regret: ''
  });
  const [customDescription, setCustomDescription] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const [showKeepPraying, setShowKeepPraying] = useState(false);
  const [analysis, setAnalysis] = useState<SinAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startConfession = () => {
    setShowDisclaimerScreen(false);
  };

  const handleQuizAnswer = (answer: string) => {
    const currentQuestion = quizQuestions[currentQuizStep];
    setQuizAnswers(prev => ({
      ...prev,
      [currentQuestion.key]: answer
    }));
    
    if (currentQuizStep < quizQuestions.length - 1) {
      setCurrentQuizStep(prev => prev + 1);
    } else {
      setCurrentQuizStep(quizQuestions.length);
    }
  };

  const handleSubmitSin = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeSin(customDescription);
      setAnalysis(result);
      console.log('Analysis result:', result);

      // Always show the cross animation first
      setShowCross(true);
      setTimeout(() => {
        setShowCross(false);
        // If user indicated no regret, show keep praying screen regardless of AI analysis
        if (quizAnswers.regret === 'Not sure' || quizAnswers.regret === 'No') {
          setShowKeepPraying(true);
        } else if (result.forgiveness_status === 'NEEDS_REFLECTION') {
          setShowKeepPraying(true);
        } else {
          setShowSuccess(true);
        }
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze your confession. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetFlow = () => {
    setShowSuccess(false);
    setShowKeepPraying(false);
    setShowDisclaimerScreen(true);
    setCurrentQuizStep(0);
    setQuizAnswers({
      sinType: '',
      severity: '',
      frequency: '',
      regret: ''
    });
    setCustomDescription('');
    setAnalysis(null);
  };

  const quizQuestions = [
    {
      question: "What area of sin are you seeking forgiveness for?",
      options: ["Pride", "Greed", "Envy", "Wrath", "Lust", "Gluttony", "Sloth"],
      key: "sinType"
    },
    {
      question: "How severe do you consider this sin?",
      options: ["Minor transgression", "Moderate sin", "Serious violation", "Grave sin"],
      key: "severity"
    },
    {
      question: "How often does this sin occur?",
      options: ["Once", "Occasionally", "Frequently", "Constantly"],
      key: "frequency"
    },
    {
      question: "Do you truly regret this sin?",
      options: ["Yes, deeply", "Somewhat", "Not sure", "No"],
      key: "regret"
    }
  ];

  return {
    currentQuizStep,
    showDisclaimerScreen,
    quizAnswers,
    customDescription,
    showSuccess,
    showCross,
    showKeepPraying,
    analysis,
    isAnalyzing,
    quizQuestions,
    handleQuizAnswer,
    handleSubmitSin,
    setCustomDescription,
    resetFlow,
    setShowKeepPraying,
    startConfession
  };
};
