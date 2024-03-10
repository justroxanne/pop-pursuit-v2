/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { QuizContext } from "../../contexts/QuizContext";
import EndGame from "../endGame/EndGame";
import Answer from "../answer/Answer";
import "./question.css";

const Question = () => {
  const {
    askedQuestionIds,
    setAskedQuestionIds,
    pickedAnswer,
    setPickedAnswer,
    score,
    setScore,
    questions,
    answers,
    answersHistory,
    setAnswersHistory,
    isGameEnded,
    setIsGameEnded,
  } = useContext(QuizContext);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [alert, setAlert] = useState(false);
  const [index, setIndex] = useState(0);

  const startQuiz = () => {
    setCurrentQuestion(questions[index]);
    setAskedQuestionIds([...askedQuestionIds, questions[index].id]);
    setIndex(index + 1);
  };

  const possibleAnswers = (question) => {
    return answers.filter((answer) => answer.question_id === question.id);
  };

  const sendResponseAndPassToNext = () => {
    if (!pickedAnswer) {
      setAlert(true);
      return;
    }

    const isCorrect = pickedAnswer.isCorrect;
    const responseObj = {
      id: pickedAnswer.id,
      question_id: currentQuestion.id,
      text: pickedAnswer.text,
      isCorrect: isCorrect,
    };

    if (askedQuestionIds.length === questions.length) {
      if (pickedAnswer && isCorrect) {
        setScore(score + 1);
      }
      setAnswersHistory([...answersHistory, responseObj]);
      setIsGameEnded(true);
      return;
    }
    if (pickedAnswer && currentQuestion) {
      if (!pickedAnswer) {
        setAlert(true);
        return;
      }
      if (isCorrect) {
        setScore(score + 1);
      }

      if (askedQuestionIds.includes(questions.id)) {
        sendResponseAndPassToNext();
        return;
      }
      setIndex(index + 1);
      setCurrentQuestion(questions[index]);
      setAskedQuestionIds([...askedQuestionIds, currentQuestion.id]);
      setAnswersHistory([...answersHistory, responseObj]);
      setPickedAnswer(null);
      setAlert(false);
    } else {
      setAlert(true);
    }
  };

  return (
    <div className="questions">
      {isGameEnded && <EndGame />}
      {currentQuestion ? (
        <div className="question-container">
          <h4>{currentQuestion.text}</h4>

          <Answer
            possibleAnswers={possibleAnswers(currentQuestion)}
            setPickedAnswer={setPickedAnswer}
          />
        </div>
      ) : (
        <h2
          style={{
            fontSize: "3em",
            alignSelf: "center",
            height: "30%",
            marginTop: "2em",
          }}
        >
          Prêt ?
        </h2>
      )}
      {alert && <div className="alert">Choisis une réponse !</div>}
      <button
        className="next-step-btn"
        onClick={currentQuestion ? sendResponseAndPassToNext : startQuiz}
      >
        {currentQuestion ? "Question suivante" : "Démarrer le quiz"}
      </button>
      <h3 className="score">
        Score : {score}/{questions.length}
      </h3>
    </div>
  );
};

export default Question;
