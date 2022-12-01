function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function listOfRandomNumbers(length: number, maxHeight: number) {
  const numbers: number[] = [];

  for (let i = 1; i <= length; i++) {
    numbers.push(randomIntFromInterval(15, maxHeight));
  }

  return numbers;
}
