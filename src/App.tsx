import PeselForm from "./components/PeselForm";
import { useState } from "react";

function App() {
  const [pesel, setPesel] = useState<string[]>([]);
  return (
    <main className="w-svw h-svh bg-sky-100 content-center px-6">
      <PeselForm onSubmit={setPesel} />
      {pesel && <div>{pesel}</div>}
    </main>
  );
}

export default App;
