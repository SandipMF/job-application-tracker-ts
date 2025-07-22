import type { JobApplication } from "./types";

type State = {
  jobApplications: JobApplication[];
  listeners: ((apps: JobApplication[]) => void)[];
};

const state: State = {
  jobApplications: [],
  listeners: [],
};

export const appState = new Proxy(state, {
  set(target, prop, value) {
    (target as any)[prop] = value;

    if (prop === "jobApplications") {
      target.listeners.forEach((fn) => fn(value));
    }

    return true;
  },
});

export function subscribe(fn: (apps: JobApplication[]) => void) {
  appState.listeners.push(fn);
}
