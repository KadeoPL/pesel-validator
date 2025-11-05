import PeselForm from "./components/PeselForm";
import { useState } from "react";

function App() {
  const [pesel, setPesel] = useState<string[]>([]);

  return (
    <main className="w-svw h-svh bg-indigo-50 flex items-center justify-center px-6">
      <div className="w-1/2 bg-white flex flex-col  justify-center py-6 rounded-2xl drop-shadow-xl">
        <h1 className="text-center text-2xl font-semibold">Validate PESEL</h1>
        <h3 className="text-center text-gray-400 font-medium mb-6">
          Enter 11 digits below and press <span>Check</span>
        </h3>
        <PeselForm onSubmit={setPesel} />
        {pesel && <div>{pesel}</div>}
      </div>
    </main>
  );
}

export default App;
