import { MOODS } from "../config.js";
import { greeting } from "../lib/format.js";
import KevinAvatar from "./KevinAvatar.jsx";
import ModelGate from "./ModelGate.jsx";
import Icon from "./Icon.jsx";

export default function Welcome({ kevin, onPickMood, onBreathe, onJournal, onGrounding, onImmediateHelp, onToolkit, ambientActive, onAmbient, onStart }) {
  return (
    <section className="sanctuary">
      <h1 className="sr-only">Emotion Estate wellbeing sanctuary</h1>

      <div className="sanctuary-hero">
        <div className="sanctuary-copy">
          <p className="eyebrow">{greeting()}</p>
          <h2>Come as you are.</h2>
          <p className="sanctuary-lede">Nothing to solve right now. Choose what feels kindest for this moment.</p>
        </div>
        <button type="button" className="avatar-button" onClick={onBreathe} aria-label="Open Kevin's breathing exercise">
          <KevinAvatar size={116} breathing />
          <span className="avatar-presence"><i /> Kevin is here</span>
        </button>
      </div>

      <ModelGate kevin={kevin} onStart={onStart} />

      <div className="mood-check">
        <p>How are you arriving?</p>
        <div className="moods-list">
          {MOODS.slice(0, 5).map((m) => (
            <button key={m.key} type="button" className="mood-chip" onClick={() => onPickMood(m.text)}>{m.label}</button>
          ))}
        </div>
      </div>

      <div className="wellness-actions">
        <button type="button" className="immediate-help-button" onClick={onImmediateHelp}>
          <Icon name="phone" size={18} /> Immediate help & crisis lines
        </button>
        <button type="button" className="toolkit-button" onClick={onToolkit}>
          <Icon name="spark" size={18} /> Explore coping tools
        </button>
      </div>

      <div className="tool-grid">
        <button type="button" className="tool-card tool-card-featured" onClick={onJournal}>
          <span className="tool-icon"><Icon name="notebook" size={21} /></span>
          <span className="tool-copy"><strong>Write freely</strong><small>Private personal journal</small></span>
          <Icon name="arrow" size={18} />
        </button>
        <button type="button" className="tool-card" onClick={onBreathe}>
          <span className="tool-icon"><Icon name="breath" size={21} /></span>
          <span className="tool-copy"><strong>Take a breath</strong><small>Box breathing</small></span>
          <Icon name="arrow" size={18} />
        </button>
        <button type="button" className="tool-card" onClick={onGrounding}>
          <span className="tool-icon"><Icon name="ground" size={21} /></span>
          <span className="tool-copy"><strong>Find the moment</strong><small>5–4–3–2–1 grounding</small></span>
          <Icon name="arrow" size={18} />
        </button>
        <button type="button" className="tool-card" onClick={onAmbient}>
          <span className="tool-icon"><Icon name="music" size={21} /></span>
          <span className="tool-copy"><strong>{ambientActive ? "Quiet the room" : "Settle with sound"}</strong><small>{ambientActive ? "Lofi is playing" : "Soft lofi ambience"}</small></span>
          <Icon name={ambientActive ? "pause" : "play"} size={18} />
        </button>
      </div>

      <p className="wellness-note">A small pause is progress. Kevin is a companion, not a clinician or emergency service.</p>
    </section>
  );
}
