import QuestionItem from "./QuestionItem";
import {useState, useEffect} from "react";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((data) => setQuestions(data));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== id));
      });
    }

    function handleAnswerChange(id, correctIndex) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      })
        .then((r) => r.json())
        .then((updatedQuestion) => {
          const updatedQuestions = questions.map((q) => {
            if (q.id === updatedQuestion.id) return updatedQuestion;
            return q;
          });
          setQuestions(updatedQuestions);
        });
    }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {
          questions.map((question) => <QuestionItem question={question} handleDelete={handleDelete} handleAnswerChange={handleAnswerChange} />)
        }
      </ul>
    </section>
  );
}
export default QuestionList;
