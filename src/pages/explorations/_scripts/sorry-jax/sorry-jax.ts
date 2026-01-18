import { Jax } from "./jax";
import { Scorpion } from "./scorpion";
import { Timer } from "./timer";
import { Ui } from "./ui";

const HIT_SFX = new Audio("/explorations/sorry-jax/sounds/hit.mp3");

const ROUND_RESET_DELAY = 1500;
const HIT_DAMAGE = 0.5;
const TOASTY_CHANCE = 0.8;

interface TouchPoint {
  x?: number;
  y?: number;
}

interface TouchState {
  start: TouchPoint;
  current: TouchPoint;
  kneeled: TouchPoint;
}

class Game {
  private readonly settings: { touch: boolean };
  private readonly timer: Timer;
  private readonly jax = new Jax();
  private readonly scorpion = new Scorpion();
  private readonly ui: Ui;

  /* Game state */
  private totalRoundWins = 0;
  public displayedWins = 0;
  public displayedRoundWins = 0;
  private health = 1;
  private finishHimTimer?: number;

  private readonly touch: TouchState = {
    start: {},
    current: {},
    kneeled: {},
  };

  constructor(settings: Partial<{ touch: boolean }> = {}) {
    this.settings = {
      touch: "ontouchstart" in document.documentElement,
      ...settings,
    };

    this.ui = new Ui(() => this.startRound(true));
    this.timer = new Timer(() => this.onTimeLimit());

    this.init();
  }

  /* ------------------------------------------------------------------ */
  /* Init & Events                                                       */
  /* ------------------------------------------------------------------ */

  private init(): void {
    this.resetRound();
    this.bindKeyboardEvents();
    this.bindTouchEvents();
  }

  private bindKeyboardEvents(): void {
    window.addEventListener("keydown", (e) => this.onKeyDown(e));
    window.addEventListener("keyup", (e) => this.onKeyUp(e));
  }

  private bindTouchEvents(): void {
    document.body.addEventListener(
      "touchstart",
      (e) => this.onTouchStart(e),
      true
    );
    document.body.addEventListener(
      "touchmove",
      (e) => this.onTouchMove(e),
      true
    );
    document.body.addEventListener("touchend", () => this.onTouchEnd(), true);
    document.body.addEventListener(
      "touchcancel",
      () => this.onTouchEnd(),
      true
    );
  }

  private resetRound(): void {
    this.health = 1;
    this.ui.updateHealthMeter(this.health);
    this.timer.reset();
    this.jax.setRandomSide();

    if (this.displayedRoundWins === 2) {
      this.displayedRoundWins = 0;
      this.ui.updateRoundTokens();
    }
  }

  private startRound(skipJaxSetup = false): void {
    this.scorpion.reset();

    const startFight = () => this.startFight(skipJaxSetup);

    if (this.displayedRoundWins === 0) {
      this.ui.round1Anim(startFight);
    } else {
      this.ui.round2Anim(startFight);
    }
  }

  private startFight(skipJaxSetup = false): void {
    if (!skipJaxSetup) {
      this.jax.respawn();
    }

    this.timer.start();
    this.scorpion.setPlayable(true);
  }

  private attemptAttack(): void {
    if (!this.scorpion.isPlayable) return;

    this.scorpion.uppercut();

    const hitSuccessful = this.scorpion.isLookingLeft === this.jax.isLeft;

    if (hitSuccessful) this.hitJax();
  }

  private hitJax(): void {
    this.scorpion.setPlayable(false);
    this.health -= HIT_DAMAGE;
    this.ui.updateHealthMeter(this.health);

    if (this.health < 0) {
      // Scorpion win
      HIT_SFX.play();
      clearTimeout(this.finishHimTimer);
      this.jax.damage(() => this.handleRoundWin());
    } else if (this.health === 0) {
      this.triggerFinishHim();
    } else {
      this.triggerRegularHit();
    }
  }

  private triggerRegularHit(): void {
    const isToasty = Math.random() > TOASTY_CHANCE;

    this.jax.damage(() => this.startFight());

    if (isToasty) {
      this.ui.toastyAnim();
    } else {
      HIT_SFX.play();
    }
  }

  private triggerFinishHim(): void {
    HIT_SFX.play();

    this.jax.damage(() => {
      this.ui.finishHimAnim(() => {
        this.finishHimTimer = window.setTimeout(() => this.onTimeLimit(), 4000);
        this.startFight();
      });
    });
  }

  private handleRoundWin(): void {
    this.timer.stop();

    this.totalRoundWins++;
    this.displayedRoundWins = ((this.totalRoundWins - 1) % 2) + 1;
    this.displayedWins = Math.floor(this.totalRoundWins / 2);

    this.ui.updateRoundTokens(this.displayedRoundWins);
    this.ui.updateWinsNumber(this.displayedWins);

    this.ui.winAnim(() => {
      setTimeout(() => {
        this.resetRound();
        this.startRound();
      }, ROUND_RESET_DELAY);
    });

    this.scorpion.win();
  }

  private onTimeLimit(): void {
    this.scorpion.setPlayable(false);
    this.jax.fall(() => this.handleRoundWin());
  }

  // --- Keyboard input ------------------------------
  private onKeyDown(e: KeyboardEvent): void {
    switch (e.code) {
      case "ArrowLeft":
        this.scorpion.setIsLookingLeft(true);
        break;
      case "ArrowRight":
        this.scorpion.setIsLookingLeft(false);
        break;
      case "Space":
        this.scorpion.setIsCrouching(true);
        break;
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    if (e.code === "Space") this.attemptAttack();
  }

  // --- Touch input -----------------------------
  private onTouchStart(e: TouchEvent): void {
    const touch = e.touches[0];
    this.touch.start = { x: touch.clientX, y: touch.clientY };
    this.setTouchDirection(touch.clientX);
  }

  private onTouchMove(e: TouchEvent): void {
    const touch = e.touches[0];
    this.touch.current = { x: touch.clientX, y: touch.clientY };

    this.setTouchDirection(touch.clientX);

    if (
      this.scorpion.isCrouching &&
      touch.clientY < (this.touch.kneeled.y ?? 0) - 50
    ) {
      this.attemptAttack();
    } else if (
      !this.scorpion.isCrouching &&
      touch.clientY > (this.touch.start.y ?? 0) + 50
    ) {
      this.touch.kneeled.y = touch.clientY;
      this.scorpion.setIsCrouching(true);
    }
  }

  private onTouchEnd(): void {
    this.scorpion.setIsCrouching(false);
  }

  private setTouchDirection(x: number): void {
    this.scorpion.setIsLookingLeft(x < window.innerWidth / 2);
  }
}

new Game();
