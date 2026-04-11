const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function App() {
  return (
    <main className="container">
      <h1>TUBES RPLL</h1>
      <p>React + Vite frontend is ready.</p>
      <p>
        Backend target: <code>{apiBaseUrl}</code>
      </p>
    </main>
  );
}