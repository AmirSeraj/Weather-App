import { Button } from "@heroui/react";

export default function StarterFile({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col items-center w-full">
      <h4 className="capitalize text-3xl text-white font-bold text-center">
        Welcome to the react quiz!
      </h4>
      <p className="text-white text-center mt-2 text-lg">
        15 questions to test your React mastery
      </p>
      <Button onPress={onClick} variant="shadow" className="mt-8">
        Let's start!
      </Button>
    </div>
  );
}
