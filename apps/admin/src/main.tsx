import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: 24 }}>
      <h1>Learneum Admin</h1>
      <p>Manage content, quests, reward rules, and level thresholds.</p>

      <section>
        <h2>Product copy</h2>
        <p>Find your path. Build real skills. Get rewarded for learning.</p>
        <p>Watch. Learn. Earn.</p>
      </section>

      <section>
        <h2>Compliance notice</h2>
        <p>Learneum Credits are incentives, not guaranteed income.</p>
      </section>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
