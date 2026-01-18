type Callback = () => void;

const START_SFX = new Audio("/explorations/sorry-jax/sounds/start.mp3");
const ROUND1_SFX = new Audio("/explorations/sorry-jax/sounds/round-one.mp3");
const ROUND2_SFX = new Audio("/explorations/sorry-jax/sounds/round-two.mp3");
const FIGHT_SFX = new Audio("/explorations/sorry-jax/sounds/fight.mp3");
const FINISH_HIM_SFX = new Audio(
  "/explorations/sorry-jax/sounds/finish-him.mp3"
);
const TOASTY_SFX = new Audio("/explorations/sorry-jax/sounds/toasty.mp3");
const WIN_SFX = new Audio("/explorations/sorry-jax/sounds/scorpion-wins.mp3");

export class Ui {
  private elInstructions: HTMLElement;
  private elMsg: HTMLElement;
  private elToasty: HTMLElement;
  private elHealthMeter: HTMLElement;
  private elWins: HTMLElement;

  constructor(startGameCallback: Callback) {
    this.elInstructions = this.qs(".instructions");
    this.elMsg = this.qs(".msg");
    this.elToasty = this.qs(".dan-forden");
    this.elHealthMeter = this.qs(".no2 .meter__progress");
    this.elWins = this.qs(".wins");

    // handlers
    this.elInstructions.addEventListener(
      "click",
      () => this.hideInstructions(startGameCallback),
      { once: true }
    );
  }

  /* --- Instructions ------------------------------------------- */
  hideInstructions(callback?: Callback): void {
    START_SFX.play();
    this.elInstructions.classList.add("instructions--hidden");
    this.onTransitionEnd(this.elInstructions, () =>
      setTimeout(() => callback?.(), 750)
    );
  }

  /* --- Rounds ------------------------------------------------- */
  round1Anim(callback?: Callback): void {
    ROUND1_SFX.play();
    document.body.classList.add("show-msg", "show-round-1");

    this.onAnimationEnd(this.elMsg, () => {
      document.body.classList.remove("show-msg", "show-round-1");
      /* Léger délais pour éviter des conflits de classes
       avec les anim de round qui précède toujorus celle-ci */
      setTimeout(() => this.fightAnim(callback), 0);
    });
  }

  round2Anim(callback?: Callback): void {
    ROUND2_SFX.play();
    document.body.classList.add("show-msg", "show-round-2");

    this.onAnimationEnd(this.elMsg, () => {
      document.body.classList.remove("show-msg", "show-round-2");
      /* Léger délais pour éviter des conflits de classes
       avec les anim de round qui précède toujorus celle-ci */
      setTimeout(() => this.fightAnim(callback), 0);
    });
  }

  /* --- Fight ------------------------------------------------- */
  fightAnim(callback?: Callback): void {
    FIGHT_SFX.play();
    document.body.classList.add("show-msg", "show-fight");

    this.onAnimationEnd(this.elMsg, () => {
      document.body.classList.remove("show-msg", "show-fight");
      callback?.();
    });
  }

  /* --- Finish Him ----------------------------------------------- */
  finishHimAnim(callback?: Callback): void {
    FINISH_HIM_SFX.play();
    document.body.classList.add("show-msg", "show-finish-him");

    this.onAnimationEnd(this.elMsg, () => {
      document.body.classList.remove("show-msg", "show-finish-him");
      callback?.();
    });
  }

  /* --- Scorpion win ------------------------------------------- */
  winAnim(callback?: Callback): void {
    WIN_SFX.play();
    document.body.classList.add("show-msg", "scorpion-wins");

    this.onAnimationEnd(this.elMsg, () => {
      document.body.classList.remove("show-msg", "scorpion-wins");
      callback?.();
    });
  }

  /* --- Toasty ------------------------------------------------ */
  toastyAnim(): void {
    TOASTY_SFX.play();
    document.body.classList.add("toasty");

    this.onAnimationEnd(this.elToasty, () =>
      document.body.classList.remove("toasty")
    );
  }

  /* --- Health meter ------------------------------------------- */
  updateHealthMeter(value: number): void {
    this.elHealthMeter.style.transform = `scaleX(${Math.max(0, value)})`;
  }

  /* --- Round tokens ------------------------------------------- */
  updateRoundTokens(value?: number): void {
    document.body.classList.remove("round-wons-1", "round-wons-2");
    if (value) {
      document.body.classList.add(`round-wons-${value}`);
    }
  }

  updateWinsNumber(value: number): void {
    this.elWins.textContent = this.pad2(value);
  }

  /* --- Utilitaires ------------------------------------------- */
  private qs<T extends HTMLElement = HTMLElement>(selector: string): T {
    const el = document.querySelector<T>(selector);
    if (!el) throw new Error(`Missing DOM element: ${selector}`);
    return el;
  }

  private pad2(n: number): string {
    return n.toString().padStart(2, "0");
  }

  private onTransitionEnd(el: HTMLElement, callback?: Callback): void {
    if (!callback) return;
    el.addEventListener("transitionend", callback, { once: true });
  }

  private onAnimationEnd(el: HTMLElement, callback?: Callback): void {
    if (!callback) return;
    el.addEventListener("animationend", callback, { once: true });
  }
}
