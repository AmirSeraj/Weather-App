import { Button, cn } from "@heroui/react";
import { useReducer } from "react";
import { BtnArrayType, initialStatePracticeType } from "../Type";

const initialState = {
  balance: 0,
  loan: 0,
  isOpen: false
};

function reducer(
  state: initialStatePracticeType,
  action: any
): initialStatePracticeType {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isOpen: true
      };
    case "closeAccount":
      return {
        ...state,
        isOpen: false,
        balance: 0,
        loan: 0
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload
      };
    case "loan":
      return {
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload
      };
    case "payLoan":
      if (state.loan === 0) return state;
      return {
        ...state,
        loan: 0,
        balance: state.balance - action.payload
      };
    default:
      throw new Error("Action Unknown!");
  }
}

export default function ReducerPractice() {
  const [{ isOpen, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const handleOpen = () => {
    dispatch({ type: "openAccount" });
  };
  const handleClose = () => {
    dispatch({ type: "closeAccount" });
  };
  const handleDeposit = () => {
    if (!isOpen) return;
    dispatch({ type: "deposit", payload: 150 });
  };
  const handleWithdraw = () => {
    if (balance < 50 || !isOpen) return;
    dispatch({ type: "withdraw", payload: 50 });
  };
  const handleLoan = () => {
    if (!isOpen || loan > 0) return;
    dispatch({ type: "loan", payload: 5000 });
  };
  const handlePayLoan = () => {
    if (balance < 5000 || !isOpen) return;
    dispatch({ type: "payLoan", payload: 5000 });
  };

  const BtnArray: BtnArrayType[] = [
    {
      className: cn("", { "cursor-not-allowed": isOpen }),
      color: isOpen ? "default" : "primary",
      onPress: handleOpen,
      title: "Open account"
    },
    {
      className: cn("", { "cursor-not-allowed": !isOpen }),
      color: isOpen ? "primary" : "default",
      onPress: handleDeposit,
      title: "Deposit 150"
    },
    {
      className: cn("", { "cursor-not-allowed": !isOpen || balance < 50 }),
      color: isOpen && balance >= 50 ? "primary" : "default",
      onPress: handleWithdraw,
      title: "Withdraw 50"
    },
    {
      className: cn("", { "cursor-not-allowed": !isOpen }),
      color: isOpen ? "primary" : "default",
      onPress: handleLoan,
      title: "Request a loan of 5000"
    },
    {
      className: cn("", { "cursor-not-allowed": !isOpen }),
      color: isOpen ? "primary" : "default",
      onPress: handlePayLoan,
      title: "Pay loan"
    },
    {
      className: cn("", { "cursor-not-allowed": !isOpen }),
      color: isOpen ? "primary" : "default",
      onPress: handleClose,
      title: "Close account"
    }
  ];

  return (
    <div className="flex flex-col gap-2 justify-center items-center mt-8">
      <h1 className="font-bold text-center text-5xl">
        useReducer Bank Account
      </h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      {BtnArray?.map((btn, index) => (
        <Button
          key={index}
          className={btn.className}
          color={btn.color}
          onPress={btn.onPress}
        >
          {btn.title}
        </Button>
      ))}
    </div>
  );
}
