import PeselForm from "./components/PeselForm";
import { useState } from "react";
import { validatePesel } from "./utils/validatePesel";

function App() {
  const [result, setResult] = useState<string | null>(null);
  const messages = {
    valid: "✅ Valid PESEL",
    invalid: "❌ Invalid PESEL",
  };

  function handlePeselSubmit(digits: string[]) {
    const isValid = validatePesel(digits);
    setResult(isValid ? messages.valid : messages.invalid);
  }

  return (
    <main className="w-svw h-svh bg-indigo-50 flex items-center justify-center px-6">
      <div className="w-full md:w-2/3 bg-white flex flex-col justify-center py-16 rounded-2xl drop-shadow-xl">
        <h1 className="text-center text-2xl font-semibold">Validate PESEL</h1>
        <h3 className="text-center text-gray-400 mb-10">
          Enter 11 digits below and press <span>Check</span>
        </h3>
        <PeselForm onSubmit={handlePeselSubmit} />
        {result && <div className="text-center mt-4">{result}</div>}
      </div>
    </main>
  );
}

export default App;
