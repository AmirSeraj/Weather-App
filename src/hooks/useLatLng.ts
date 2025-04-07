import { useQuery } from "@tanstack/react-query";

export function useLatLng({ location }: { location: string }) {
  const fetchPosition = async () => {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };
  return useQuery({
    queryKey: ["latlng", location],
    queryFn: fetchPosition,
    enabled: false
  });
}
