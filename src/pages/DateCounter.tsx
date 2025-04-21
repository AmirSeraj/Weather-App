import { Button, Input, Slider } from "@heroui/react";
import { ChangeEvent, useReducer } from "react";

type StateType = {
  count: number;
  step: number;
};

const initialState: StateType = { count: 0, step: 1 };

type ActionType =
  | {
      type: "inc";
      payload: number;
    }
  | {
      type: "dec";
      payload: number;
    }
  | {
      type: "setCount";
      payload: number;
    }
  | {
      type: "setStep";
      payload: number;
    }
  | {
      type: "reset";
    };

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + action.payload };
    case "dec":
      return { ...state, count: state.count - action.payload };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action!");
  }
}

export default function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const date = new Date();
  date.setDate(date.getDate() + state.count);
  const handleDecrease = () => {
    dispatch({ type: "dec", payload: state.step });
  };
  const handleIncrease = () => {
    dispatch({ type: "inc", payload: state.step });
  };
  const handleSetCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };
  const handleSetStep = (value: number | number[]) => {
    const step = Array.isArray(value) ? value[0] : value;
    dispatch({ type: "setStep", payload: step });
  };
  const handleReset = () => {
    dispatch({ type: "reset" });
  };
  return (
    <div className="flex flex-col gap-10 justify-center items-center bg-pink-300 h-[calc(100vh-80px)]">
      <Slider
        className="max-w-md"
        defaultValue={2}
        label="Step"
        maxValue={10}
        minValue={0}
        step={1}
        size="md"
        showOutline
        value={state.step}
        onChange={handleSetStep}
      />
      <div className="flex items-center">
        <Button onPress={handleDecrease}>-</Button>
        <Input
          value={state.count.toString()}
          onChange={handleSetCount}
          placeholder="step..."
        />
        <Button onPress={handleIncrease}>+</Button>
      </div>
      <p className="text-center">{date.toDateString()}</p>
      <Button onPress={handleReset}>Reset</Button>
    </div>
  );
}
