import React, { useState, useRef } from "react";

interface PeselFormProps {
  onSubmit: (digits: string[]) => void;
}

export default function PeselForm({ onSubmit }: PeselFormProps) {
  const [peselDigits, setPeselDigits] = useState<string[]>(Array(11).fill(""));
  const [erorr, setError] = useState<string | null>("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const digit = e.currentTarget.value;
    setError(null);

    if (digit !== "" && !/^\d$/.test(digit)) return;

    setPeselDigits((prevDigits) => {
      const newDigits = [...prevDigits];
      newDigits[index] = digit;
      return newDigits;
    });

    if (e.target.value && index < peselDigits.length - 1) {
      focusInput(index + 1);
    }
  }

  function handleSubmit() {
    if (peselDigits.every((d) => d.trim() !== "")) {
      onSubmit(peselDigits);
    } else {
      setError(`Please fill in all fields`);
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {peselDigits.map((digit, index) => (
          <div key={index}>
            <input
              className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-indigo-300 rounded-md md:font-text-lg lg:text-2xl focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center mt-10">
        <button
          className="py-4 px-8 bg-indigo-500 text-white rounded-2xl font-light cursor-pointer hover:bg-indigo-600 active:bg-indigo-950 active:scale-95"
          onClick={handleSubmit}
        >
          Check PESEL
        </button>
      </div>
      {erorr && <p className="text-center text-red-400 mt-4">{erorr}</p>}
    </div>
  );
}
