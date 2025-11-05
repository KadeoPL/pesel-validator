import React, {
  useState,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";

interface PeselFormProps {
  onSubmit: Dispatch<SetStateAction<string[]>>;
}

export default function PeselForm({ onSubmit }: PeselFormProps) {
  const [peselDigits, setPeselDigits] = useState<string[]>(Array(11).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const digit = e.currentTarget.value;

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
    onSubmit(peselDigits);
  }

  return (
    <div>
      <div className="flex gap-1 md:gap-2 justify-center items-center px-6">
        {peselDigits.map((digit, index) => (
          <div
            key={index}
            className="w-7 md:w-10 lg:w-16 aspect-square bg-white border-2 border-sky-200"
          >
            <input
              className="w-full h-full text-center text-base md:font-text-lg lg:text-2xl focus:outline-2 focus:outline-offset-2 focus:outline-sky-500"
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
          className="py-4 px-8 bg-indigo-500 text-white rounded-2xl font-light "
          onClick={handleSubmit}
        >
          Check PESEL
        </button>
      </div>
    </div>
  );
}
