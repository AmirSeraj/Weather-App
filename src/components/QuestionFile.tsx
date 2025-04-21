import { Button, cn } from "@heroui/react";
import { QuestionFileType } from "../Type";

export default function QuestionFile({
  index,
  questions,
  points,
  totalPoints,
  currentQuestion,
  answer,
  hasAnswered,
  minutes,
  seconds,
  dispatch
}: QuestionFileType) {
  const handleResponse = (index: number) => {
    if (hasAnswered) return;
    dispatch({ type: "newAnswer", payload: index });
  };
  return (
    <div className="flex flex-col gap-1 w-[450px] justify-center">
      <div className="relative w-[450px] h-2 bg-white rounded-md">
        <div
          style={{
            width: `${((index + 1) / questions.length) * 100}%`,
            transition: "width 0.5s ease-in-out"
          }}
          className="absolute left-0 h-full rounded-md bg-blue-600"
        />
      </div>
      <div className="flex items-center justify-between px-1">
        <p className="text-white text-sm">
          Questions {index + 1}/{questions.length}
        </p>
        <p className="text-white text-sm">
          {points}/{totalPoints} points
        </p>
      </div>
      <p className="mt-3 mb-1 text-white">{currentQuestion.question}</p>
      <div className="flex flex-col gap-1 w-full">
        {currentQuestion.options.map((response: string, i: number) => (
          <button
            key={i}
            onClick={() => handleResponse(i)}
            className={cn(
              "w-full hover:ml-5 transition-all duration-400 py-2 px-9 flex justify-self-start rounded-full",
              {
                "ml-5": answer === i,
                "bg-orange-400":
                  hasAnswered && currentQuestion.correctOption !== i,
                "bg-green-600 text-white":
                  hasAnswered && currentQuestion.correctOption === i,
                "bg-orange-300 hover:bg-orange-500": !hasAnswered
              }
            )}
          >
            {response}
          </button>
        ))}
      </div>
      <div className="mt-6 w-full flex justify-between items-center px-5">
        <span className="w-20 h-10 border border-slate-200 flex justify-center items-center rounded-full">
          {minutes}:{seconds}
        </span>
        <Button
          onPress={() => dispatch({ type: "nextQuestion" })}
          disabled={!hasAnswered}
          variant="solid"
          color="default"
          className={cn("", {
            "cursor-not-allowed": !hasAnswered
          })}
          radius="full"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
