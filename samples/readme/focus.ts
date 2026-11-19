// Less noise, clearer code.
interface Session {
  readonly id: string;
  title: string;
  minutes: number;
  complete: boolean;
}

const FOCUS_MINUTES = 25;

export function startSession(title: string): Session {
  return {
    id: crypto.randomUUID(),
    title: title.trim() || "One thing at a time",
    minutes: FOCUS_MINUTES,
    complete: false,
  };
}

export function summarize(sessions: readonly Session[]) {
  const completed = sessions.filter(session => session.complete);
  const minutes = completed.reduce((total, { minutes }) => total + minutes, 0);

  return {
    count: completed.length,
    minutes,
    message: `You made space for ${minutes} minutes of focus.`,
  };
}
