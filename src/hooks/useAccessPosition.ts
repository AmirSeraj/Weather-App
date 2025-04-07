import { useQuery } from "@tanstack/react-query";

export function useAccessPosition({
  latitude,
  longitude,
  timezone
}: {
  latitude: number;
  longitude: number;
  timezone: string;
}) {
  const fetchPosition = async () => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };
  return useQuery({
    queryKey: ["accessPosition", latitude, longitude, timezone],
    queryFn: fetchPosition,
    enabled: false
  });
}
