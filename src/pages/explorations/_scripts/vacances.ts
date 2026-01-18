// Language detection (with safe fallbacks)
const lang: string = (
  navigator.languages?.[0] ||
  navigator.language ||
  (navigator as Navigator & { userLanguage?: string }).userLanguage ||
  "en"
).substring(0, 2);

const SEA = new Audio("/explorations/vacances/sea.mp3");

// DOM elements
const wave = document.querySelector<HTMLElement>(".wave");
const button = document.querySelector<HTMLButtonElement>("button");

// Set document language
document.documentElement.setAttribute("lang", lang);

function play(): void {
  const promise: Promise<void> | undefined = SEA.play();

  if (promise) {
    promise
      .then(() => {
        document.body.classList.add("audio-allowed");
      })
      .catch(() => {
        document.body.classList.remove("audio-allowed");
      });
  }

  document.body.classList.add("animate");
}

function randomDelay(): number {
  const sec: number = Math.floor(Math.random() * 3) + 1;
  return sec * 1000;
}

// Event bindings (with null checks)
wave?.addEventListener("animationend", () => {
  document.body.classList.remove("animate");
  setTimeout(play, randomDelay());
});

button?.addEventListener("click", play);

// Initial play
play();
