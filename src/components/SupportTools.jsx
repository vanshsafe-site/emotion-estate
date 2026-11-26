import { useEffect, useRef, useState } from "react";
import { CRISIS_RESOURCES } from "../config.js";
import Icon from "./Icon.jsx";

function ModalShell({ children, onClose, title, className = "" }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`modal support-modal ${className}`} role="dialog" aria-modal="true" aria-labelledby="support-modal-title">
        <button ref={closeRef} type="button" className="icon-btn modal-close" onClick={onClose} aria-label="Close">
          <Icon name="x" />
        </button>
        <h2 id="support-modal-title" className="sr-only">{title}</h2>
        {children}
      </section>
    </div>
  );
}

const EMERGENCY_SERVICES = [
  { region: "India", number: "112", href: "tel:112" },
  { region: "United States", number: "911", href: "tel:911" },
  { region: "UK & Ireland", number: "999 or 112", href: "tel:999" },
  { region: "European Union", number: "112", href: "tel:112" },
];

export function ImmediateHelp({ onClose }) {
  return (
    <ModalShell onClose={onClose} title="Immediate help" className="help-modal">
      <p className="modal-kicker">YOU DESERVE SUPPORT</p>
      <h2 className="modal-title">Immediate help</h2>
      <p className="modal-note">If you or someone else is in immediate danger, call your local emergency number now. If possible, move to a safer place and ask someone you trust to stay with you.</p>

      <section className="help-section" aria-labelledby="emergency-title">
        <h3 id="emergency-title">Emergency services</h3>
        <ul className="help-list">
          {EMERGENCY_SERVICES.map((item) => (
            <li key={item.region}>
              <span>{item.region}</span>
              <a className="help-call" href={item.href} aria-label={`Call ${item.number} in ${item.region}`}>
                <Icon name="phone" size={16} /> {item.number}
              </a>
            </li>
          ))}
        </ul>
        <p className="help-caveat">Numbers and availability vary by location. If your region is not listed, use the emergency number where you are.</p>
      </section>

      <section className="help-section" aria-labelledby="crisis-title">
        <h3 id="crisis-title">Talk to a crisis support service</h3>
        <ul className="help-list">
          {CRISIS_RESOURCES.map((resource) => (
            <li key={resource.name}>
              <span><small>{resource.region}</small><strong>{resource.name}</strong></span>
              {resource.href ? (
                <a className="help-call" href={resource.href} target="_blank" rel="noreferrer noopener">{resource.contact}</a>
              ) : resource.region === "United States" ? (
                <span className="help-contact-actions"><a className="help-call" href="tel:988">Call 988</a><a className="help-call" href="sms:988">Text 988</a></span>
              ) : resource.region === "India" ? (
                <span className="help-contact-actions"><a className="help-call" href="tel:14416">14416</a><a className="help-call" href="tel:18008914416">1-800-891-4416</a></span>
              ) : (
                <a className="help-call" href="tel:116123">116 123</a>
              )}
            </li>
          ))}
        </ul>
      </section>
      <p className="help-footer">Emotion Estate is not an emergency service. If calling feels hard, consider asking someone nearby to call with you.</p>
    </ModalShell>
  );
}

const PRACTICES = [
  {
    key: "pmr",
    title: "Progressive muscle relaxation",
    audience: "For tension or anxiety",
    intro: "Gently tense one muscle group for about five seconds, then release for ten. Skip any area that hurts, and keep every movement comfortable.",
    steps: ["Settle into a supported position and let your shoulders drop.", "Gently curl your toes; notice the tension, then release and notice the difference.", "Tighten your calves very lightly, then let them soften. Skip this if it is uncomfortable.", "Make a soft fist, hold briefly, then open your hands and release.", "Lift your shoulders slightly toward your ears, then let them fall. Keep your jaw loose.", "Take one easy breath and notice any small change. You can stop or skip any step at any time."],
  },
  {
    key: "grounding",
    title: "Ground in the present",
    audience: "For worry or feeling overwhelmed",
    intro: "Take this at your own pace. You do not need to find a perfect answer; simply notice what is around you.",
    steps: ["Name five things you can see.", "Notice four things you can feel, like your feet on the floor.", "Listen for three sounds.", "Notice two things you can smell, or two scents you like.", "Name one thing you can taste or one small thing you appreciate right now."],
  },
  {
    key: "reset",
    title: "A small stress reset",
    audience: "For a busy or overloaded moment",
    intro: "Pause, make the next few minutes smaller, and choose one manageable action.",
    steps: ["Place both feet somewhere comfortable and let your hands rest.", "Take a slow, comfortable breath. No need to hold it or force it.", "Name what feels most pressing in one sentence.", "Choose one next step that takes five minutes or less—or choose to ask someone for help."],
  },
  {
    key: "sleep",
    title: "Wind down for rest",
    audience: "For a busy mind at bedtime",
    intro: "This is a gentle routine, not a way to force sleep. Adapt it to what feels comfortable for you.",
    steps: ["Dim a light or put one screen aside if that is available to you.", "Let your body rest in a comfortable position and soften your shoulders.", "Write down one thought for tomorrow, so you do not have to solve it tonight.", "Try an easy, unhurried exhale. If sleep does not come, resting still counts."],
  },
  {
    key: "kindness",
    title: "A kinder inner voice",
    audience: "For self-criticism or a low moment",
    intro: "You do not have to feel positive. Try speaking to yourself with the patience you might offer someone you care about.",
    steps: ["Notice the difficult thought without arguing with it.", "Name what you are feeling in a few words.", "Ask: what would I say to a friend in this situation?", "Choose one kind, realistic sentence to offer yourself now."],
  },
];

export function WellnessToolkit({ onClose }) {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0);
  const practice = PRACTICES.find((item) => item.key === selected);

  return (
    <ModalShell onClose={onClose} title="Wellbeing tools" className="toolkit-modal">
      <p className="modal-kicker">A TOOL FOR THIS MOMENT</p>
      {practice ? (
        <>
          <button type="button" className="toolkit-back" onClick={() => { setSelected(null); setStep(0); }}>← All tools</button>
          <h2 className="modal-title">{practice.title}</h2>
          <p className="modal-note">{practice.intro}</p>
          <div className="practice-step" aria-live="polite" aria-atomic="true">
            <span className="practice-count">Step {step + 1} of {practice.steps.length}</span>
            <p>{practice.steps[step]}</p>
          </div>
          <div className="grounding-dots" aria-label={`Step ${step + 1} of ${practice.steps.length}`}>
            {practice.steps.map((item, index) => <span key={item} className={index <= step ? "is-on" : ""} />)}
          </div>
          <div className="modal-foot">
            {step > 0 && <button type="button" className="btn" onClick={() => setStep(step - 1)}>Back</button>}
            <button type="button" className="btn btn-primary" onClick={() => step === practice.steps.length - 1 ? (setSelected(null), setStep(0)) : setStep(step + 1)}>
              {step === practice.steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
          <p className="help-caveat">Stop or skip any exercise if it feels uncomfortable. These self-care ideas are not a substitute for professional care.</p>
        </>
      ) : (
        <>
          <h2 className="modal-title">What might help right now?</h2>
          <p className="modal-note">Choose a short, gentle practice. You can stop whenever you like.</p>
          <div className="practice-list">
            {PRACTICES.map((item) => (
              <button key={item.key} type="button" className="practice-option" onClick={() => { setSelected(item.key); setStep(0); }}>
                <span><strong>{item.title}</strong><small>{item.audience}</small></span>
                <Icon name="arrow" size={18} />
              </button>
            ))}
          </div>
          <p className="help-caveat">These are general wellbeing exercises, not diagnosis or treatment. Choose what feels safe and comfortable for you.</p>
        </>
      )}
    </ModalShell>
  );
}
