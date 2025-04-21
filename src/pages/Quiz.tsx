import { Button, Image, Spinner } from "@heroui/react";
import { useCallback, useEffect, useReducer } from "react";
import StarterFile from "../components/StarterFile";
import QuestionFile from "../components/QuestionFile";
import { initialStateType } from "../Type";
// import { useFetchQuestions } from "../hooks/useFetchQuestions";

const initialState: initialStateType = {
  questions: [],
  status: "ready",
  index: 0,
  secondsRemaining: 15 * 60,
  answer: null,
  hasAnswered: false,
  points: 0
};

function reducer(state: initialStateType, action: any): initialStateType {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading"
      };
    case "ready":
      return {
        ...state,
        status: "ready"
      };
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "active",
        index: 0,
        secondsRemaining: 15 * 60
      };
    case "dataFailed":
      return {
        ...state,
        status: "error"
      };
    case "newAnswer":
      const question = state.questions[state.index];
      const isCorrect = question.correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        hasAnswered: true,
        points: isCorrect ? state.points + question.points : state.points
      };
    case "nextQuestion":
      const isLastQuestion = state.index === state.questions.length - 1;
      return {
        ...state,
        index: isLastQuestion ? state.index : state.index + 1,
        answer: action.payload,
        hasAnswered: false,
        status: isLastQuestion ? "finished" : state.status
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1
      };
    case "finished":
      return {
        ...state,
        status: "finished"
      };
    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "active"
      };
    default:
      throw new Error("Action unknown!");
  }
}

export default function Quiz() {
  // const { data, isLoading, error } = useFetchQuestions();
  const [
    { questions, status, index, secondsRemaining, hasAnswered, points, answer },
    dispatch
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (status !== "active") return;
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status !== "active") return;
    if (secondsRemaining <= 0) {
      dispatch({ type: "finished" });
    }
  }, [status, secondsRemaining]);

  const minutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

  const handleClick = useCallback(() => {
    dispatch({ type: "loading" });

    setTimeout(() => {
      fetch("http://localhost:3001/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataRecieved", payload: data }))
        .catch(() => dispatch({ type: "dataFailed" }));
    }, 1000);
  }, []);

  const currentQuestion = questions[index];
  const totalPoints = questions.reduce((total, q) => total + q.points, 0);

  return (
    <div className="w-full flex flex-col items-center gap-3 md:px-10 sm:px-5 px-3 h-[calc(100vh-80px)] bg-slate-500">
      <div className="flex mt-3 gap-3 items-center w-full justify-center">
        <Image src="/react.png" width={130} height={130} />
        <p className="uppercase text-5xl text-white underline decoration-dotted">
          the react quiz
        </p>
      </div>
      {status === "error" && (
        <p className="font-bold text-red-600 text-2xl">Something went wrong!</p>
      )}
      {status === "ready" && <StarterFile onClick={handleClick} />}
      {status === "loading" && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner size="lg" />
        </div>
      )}
      {status === "active" && (
        <QuestionFile
          index={index}
          answer={answer}
          currentQuestion={currentQuestion}
          dispatch={dispatch}
          hasAnswered={hasAnswered}
          minutes={minutes}
          points={points}
          questions={questions}
          seconds={seconds}
          totalPoints={totalPoints}
        />
      )}
      {status === "finished" && (
        <div className="flex flex-col items-center w-full">
          <h4 className="capitalize text-3xl text-white font-bold text-center">
            Thanks for participating in quiz!
          </h4>
          <div className="flex justify-around mt-7 items-center w-[510px]">
            <p>
              Your Score: {points}/{totalPoints}
            </p>
            <Button
              onPress={() => dispatch({ type: "restartQuiz" })}
              variant="solid"
              color="default"
              radius="full"
            >
              Restart Quiz!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
