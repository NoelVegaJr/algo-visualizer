import listOfRandomNumbers from "./generateNumbers";

export default function generateBarsData(length: number, maxHeight: number) {
  const heights = listOfRandomNumbers(length, maxHeight);
  const bars = heights.map((height, index) => {
    return {
      id: index,
      height,
      index: index,
      color: "bg-cyan-500",
    };
  });

  return bars;
}
