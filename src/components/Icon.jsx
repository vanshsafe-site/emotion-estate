const PATHS = {
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  notebook: <><path d="M6 3.5h11a2 2 0 0 1 2 2v15H8a3 3 0 0 1-3-3V4.5A1 1 0 0 1 6 3.5Z" /><path d="M8 17.5h11M8 3.5v14" /></>,
  arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  ground: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
  spark: <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />,
  music: <><path d="M9 18V7l10-2v11" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" /></>,
  play: <path d="m9 7 8 5-8 5Z" fill="currentColor" stroke="none" />,
  pause: <><path d="M9 7v10M15 7v10" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  sliders: (
    <>
      <path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0" />
      <circle cx="15" cy="6" r="2.2" />
      <circle cx="9" cy="12" r="2.2" />
      <circle cx="17" cy="18" r="2.2" />
    </>
  ),
  download: <path d="M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5.5 15H5a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 5 3.5h8.5A1.5 1.5 0 0 1 15 5v.5" />
    </>
  ),
  refresh: <path d="M19.5 11a7.5 7.5 0 1 0-2.2 5.3M19.5 5v6h-6" />,
  stop: <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" />,
  send: <path d="M12 19V5M6 11l6-6 6 6" />,
  trash: <path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l.8 12.5h9.4L17.5 7" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  down: <path d="M12 5v14M6 13l6 6 6-6" />,
  breath: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  chat: <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4 3.5V15h-.5A2.5 2.5 0 0 1 4 12.5" />,
  phone: <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 13l4 1.5v3A2.5 2.5 0 0 1 17.5 20 13.5 13.5 0 0 1 4 6.5 2.5 2.5 0 0 1 6.5 4Z" />,
  right: <path d="m9 5 7 7-7 7" />,
  journal: <><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" /><path d="M8 20V8h11M9 11h7M9 14h5" /></>,
  ground: <><circle cx="12" cy="12" r="8" /><path d="M12 8v8M8 12h8" /></>,
};

export default function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
