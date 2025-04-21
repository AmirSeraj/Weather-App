import { useQuery } from "@tanstack/react-query";

export function useFetchQuestions() {
  const fetchQuestions = async () => {
    const res = await fetch("http://localhost:3001/questions");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };
  return useQuery({
    queryKey: ["fetch-questions"],
    queryFn: fetchQuestions
  });
}
