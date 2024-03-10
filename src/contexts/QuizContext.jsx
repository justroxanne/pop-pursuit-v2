import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [askedQuestionIds, setAskedQuestionIds] = useState([]);
  const [pickedAnswer, setPickedAnswer] = useState(null);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isGameEnded, setIsGameEnded] = useState(false);

  return (
    <QuizContext.Provider
      value={{
        askedQuestionIds,
        setAskedQuestionIds,
        pickedAnswer,
        setPickedAnswer,
        score,
        setScore,
        questions,
        setQuestions,
        answers,
        setAnswers,
        answersHistory,
        setAnswersHistory,
        isGameEnded,
        setIsGameEnded,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
