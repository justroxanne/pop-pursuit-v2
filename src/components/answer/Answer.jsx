import "./answer.css";

const Answer = ({ possibleAnswers, setPickedAnswer }) => {
  return (
    <div>
      <ul>
        {possibleAnswers.map((answer) => (
          <li key={answer.id}>
            <input
              type="radio"
              name="answer"
              id={answer.id}
              value={answer.text}
              onChange={(e) =>
                setPickedAnswer({
                  isCorrect: answer.is_good_answer,
                  text: e.target.value,
                  id: parseInt(e.target.id),
                })
              }
            />
            <label htmlFor={answer.id}>{answer.text}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Answer;
