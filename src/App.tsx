import { Link, Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import DateCounter from "./pages/DateCounter";
import ReducerPractice from "./pages/ReducerPractice";
import { cn } from "@heroui/react";

export default function App() {
  const { pathname } = useLocation();
  const isActive = pathname.split("/")[1];
  console.log("pathname", isActive);
  return (
    <div className="w-full min-h-screen">
      <header className="sticky top-0 h-[80px] md:px-8 sm:px-4 px-2 flex items-center gap-3 shadow-lg bg-pink-200">
        <Link
          className={cn("", { "text-blue-600 font-bold": isActive === "" })}
          to={"/"}
        >
          Home
        </Link>
        <Link
          className={cn("", { "text-blue-600 font-bold": isActive === "quiz" })}
          to={"/quiz"}
        >
          Quiz
        </Link>
        <Link
          className={cn("", {
            "text-blue-600 font-bold": isActive === "date-counter"
          })}
          to={"/date-counter"}
        >
          DateCounter
        </Link>
        <Link
          className={cn("", {
            "text-blue-600 font-bold": isActive === "reducer-practice"
          })}
          to={"/reducer-practice"}
        >
          UseReducer practice
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/date-counter" element={<DateCounter />} />
        <Route path="/reducer-practice" element={<ReducerPractice />} />
      </Routes>
    </div>
  );
}
