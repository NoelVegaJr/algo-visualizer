import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Bar from "../components/Bar";
import generateBarsData from "../utils/barsData";

interface IBar {
  id: number;
  height: number;
  index: number;
  color: string;
}

const Home: React.FunctionComponent = () => {
  const numOfBars = 25;
  // const [gen, setGen] = useState<any>();
  const [bars, setBars] = useState<IBar[]>(generateBarsData(numOfBars, 750));
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(true);
  const ref1 = useRef<HTMLLIElement>();
  const gen = selectionSort(bars);
  useEffect(() => {
    setBars(() => [...generateBarsData(numOfBars, 750)]);
  }, []);

  useEffect(() => {
    if (start) {
      handleStart();
    }
  }, [start]);

  // async function* selectionSort(bars: IBar[], wait: number) {
  async function* selectionSort(bars: IBar[]) {
    const barsCopy = [...bars];

    for (let x = 0; x < barsCopy.length; x++) {
      let currMinHeightIdx = x;

      yield [
        ...barsCopy.map((bar, index) => {
          if (index === x) {
            bar.color = "bg-purple-500";
          }
          return bar;
        }),
      ];

      for (let i = x + 1; i < barsCopy.length; i++) {
        // new height to test
        yield [
          ...barsCopy.map((bar, index) => {
            if (index === i && index !== x) {
              bar.color = "bg-red-500";
            }
            return bar;
          }),
        ];

        if (barsCopy[i].height < barsCopy[currMinHeightIdx].height) {
          // turn previous min height from green to blue
          yield [
            ...barsCopy.map((bar, index) => {
              if (index === currMinHeightIdx && index !== x) {
                bar.color = "bg-cyan-500";
              }
              return bar;
            }),
          ];

          currMinHeightIdx = i;
          // turn current testing height to green, the new min height
          yield [
            ...barsCopy.map((bar, index) => {
              if (index === currMinHeightIdx && index !== x) {
                bar.color = "bg-green-500";
              }
              return bar;
            }),
          ];
        }

        yield [
          ...barsCopy.map((bar, index) => {
            if (index === i + 1 && index !== currMinHeightIdx) {
              bar.color = "bg-red-500";
            }

            if (index === i && index !== currMinHeightIdx) {
              bar.color = "bg-cyan-500";
            }
            return bar;
          }),
        ];
      }

      swap(barsCopy, currMinHeightIdx, x);

      yield [
        ...barsCopy.map((bar, index) => {
          if (index === x) {
            bar.color = "bg-green-500";
          }
          return bar;
        }),
      ];
    }
  }

  function swap(arr: any, idx1: number, idx2: number) {
    const removedItem = arr.splice(idx1, 1)[0];
    arr.splice(idx2, 0, removedItem);
    setBars(() => [...arr]);
  }

  async function handleStart() {
    while (start) {
      console.log("gen firing", "❤️‍🔥");
      console.log("Start: ", start);

      const { value } = await gen.next();
      if (value) {
        setBars(() => [...value]);
      }
      await new Promise((r) => setTimeout(r, 75));
    }
  }
  console.log(start);
  return (
    <div className="flex h-screen flex-col">
      <div className="h-16 p-2">
        <div className="flex gap-4">
          <button
            onClick={() => {
              if (bars) {
                setStart(true);

                // selectionSort(bars, 10);
              }
            }}
            className="rounded bg-teal-500 py-1 px-4 font-semibold text-white"
          >
            Start
          </button>
          <button
            onClick={() => setStart(false)}
            className="rounded bg-red-500 py-1 px-4 font-semibold text-white"
          >
            Stop
          </button>
          <button
            onClick={() => setBars(generateBarsData(numOfBars, 750))}
            className="rounded bg-gray-500 py-1 px-4 font-semibold text-white"
          >
            Reset
          </button>
        </div>
      </div>
      <ul className="flex h-full grow items-end justify-evenly gap-1 px-1">
        {bars?.map((bar) => {
          return (
            <li className="w-10" key={bar.id}>
              <Bar color={bar.color} height={bar.height} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
