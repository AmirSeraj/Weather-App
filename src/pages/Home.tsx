import { Button, Input, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { useLatLng } from "../hooks/useLatLng";
import { useAccessPosition } from "../hooks/useAccessPosition";

const WeekDay = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export default function Home() {
  const [location, setLocation] = useState<string>("");
  const { data, isLoading: isLoadingData, refetch } = useLatLng({ location });
  const { latitude, longitude, timezone } = data?.results?.[0] || {};
  const {
    data: dataPosition,
    isLoading: isLoadingPosition,
    refetch: refetchPosition
  } = useAccessPosition({
    latitude,
    longitude,
    timezone
  });
  const handleSearch = async () => {
    await refetch();
  };
  useEffect(() => {
    if (latitude && longitude && timezone) {
      refetchPosition();
    }
  }, [latitude, longitude, timezone]);
  return (
    <div className="flex w-full justify-center items-center p-8">
      <div className="border-1 border-slate-500 w-full h-96 p-3">
        <div className="border-1 border-slate-500 w-full h-96 flex flex-col gap-3 justify-center items-center">
          <h1 className="text-3xl mb-3">Classy Weather</h1>
          <Input
            className="max-w-xs"
            placeholder="search from location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            isClearable
            onClear={() => setLocation("")}
          />
          <Button onPress={handleSearch} variant="shadow">
            Get weather
          </Button>
          {isLoadingData || isLoadingPosition ? (
            <div className="w-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full flex gap-1 flex-wrap justify-center items-center">
              {dataPosition?.daily?.time?.map((date: string, index: number) => (
                <div
                  key={index}
                  className="p-1 flex flex-col gap-0.5 bg-slate-200 shadow-lg border border-slate-400 rounded-lg"
                >
                  <p className="text-xs text-center">{WeekDay(date)}</p>
                  <p className="text-[0.65rem] text-center">
                    {dataPosition?.daily?.temperature_2m_min[index]}&deg; ~
                    &nbsp;
                    {dataPosition?.daily?.temperature_2m_max[index]}&deg;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
