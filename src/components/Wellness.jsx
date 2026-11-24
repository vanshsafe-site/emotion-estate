import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";

export function Journal({ onClose }) {
  const [text, setText] = useState(() => localStorage.getItem("kevin-journal-draft") || "");
  const [saved, setSaved] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const save = () => {
    localStorage.setItem("kevin-journal-draft", text);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal journal-modal" role="dialog" aria-modal="true" aria-labelledby="journal-title">
        <button ref={closeRef} type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Close journal">
          <Icon name="x" />
        </button>
        <p className="modal-kicker">PRIVATE NOTEBOOK</p>
        <h2 id="journal-title" className="modal-title">A little room for your thoughts</h2>
        <textarea
          className="journal-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What is here with you right now?"
          aria-label="Journal entry"
        />
        <div className="modal-foot journal-foot">
          <span className="journal-status">{saved ? "Saved on this device" : "Stored only in this browser"}</span>
          <button type="button" className="btn btn-primary" onClick={save}><Icon name="check" size={16} /> Save entry</button>
        </div>
      </section>
    </div>
  );
}

const groundingSteps = [
  { count: 5, prompt: "Name five things you can see" },
  { count: 4, prompt: "Notice four things you can feel" },
  { count: 3, prompt: "Listen for three sounds" },
  { count: 2, prompt: "Identify two things you can smell" },
  { count: 1, prompt: "Name one thing you can taste" },
];

export function Grounding({ onClose }) {
  const [step, setStep] = useState(0);
  const closeRef = useRef(null);
  const current = groundingSteps[step];

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal grounding-modal" role="dialog" aria-modal="true" aria-labelledby="grounding-title">
        <button ref={closeRef} type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Close grounding exercise">
          <Icon name="x" />
        </button>
        <p className="modal-kicker">GROUNDING · 5–4–3–2–1</p>
        <div className="grounding-count">{current.count}</div>
        <h2 id="grounding-title" className="grounding-prompt">{current.prompt}</h2>
        <div className="grounding-dots" aria-label={`Step ${step + 1} of 5`}>
          {groundingSteps.map((item, index) => <span key={item.count} className={index <= step ? "is-on" : ""} />)}
        </div>
        <div className="modal-foot">
          {step > 0 && <button type="button" className="btn" onClick={() => setStep(step - 1)}>Back</button>}
          <button type="button" className="btn btn-primary" onClick={() => step === 4 ? onClose() : setStep(step + 1)}>
            {step === 4 ? "Finish" : "Next"}
          </button>
        </div>
      </section>
    </div>
  );
}

export function AmbientPlayer({ active, onToggle }) {
  const audioRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    if (!active) {
      if (nodesRef.current) {
        nodesRef.current.master.gain.setTargetAtTime(0, nodesRef.current.context.currentTime, 0.12);
      }
      return;
    }

    if (!nodesRef.current) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const master = context.createGain();
      master.gain.value = 0;
      master.connect(context.destination);

      const softNoise = context.createBufferSource();
      const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * 0.12;
      softNoise.buffer = buffer;
      softNoise.loop = true;

      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 520;
      softNoise.connect(filter).connect(master);
      softNoise.start();

      [130.81, 196, 261.63].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = index === 0 ? "sine" : "triangle";
        oscillator.frequency.value = frequency;
        gain.gain.value = index === 0 ? 0.018 : 0.008;
        oscillator.connect(gain).connect(master);
        oscillator.start();
      });

      nodesRef.current = { context, master };
    }

    nodesRef.current.context.resume();
    nodesRef.current.master.gain.setTargetAtTime(0.28, nodesRef.current.context.currentTime, 0.25);
  }, [active]);

  return (
    <button type="button" className={`ambient-player ${active ? "is-playing" : ""}`} onClick={onToggle} aria-label={active ? "Pause ambient music" : "Play ambient music"}>
      <span className="ambient-bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>{active ? "Lofi is playing" : "Play quiet lofi"}</span>
    </button>
  );
}
