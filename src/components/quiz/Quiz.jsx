import { useContext, useEffect } from "react";
import { QuizContext } from "../../contexts/QuizContext";
import History from "../history/History";
import Question from "../questions/Question";
import data from "../../assets/data.json";
import "./quiz.css";

const Quiz = () => {
  const { setQuestions, setAnswers } = useContext(QuizContext);

  useEffect(() => {
    setQuestions(data.questions.sort(() => Math.random() - 0.5));
    setAnswers(data.answers);
  }, []);

  return (
    <div className="quiz-container">
      <History />
      <Question />
    </div>
  );
};

export default Quiz;
