type Callback = () => void;

export class Timer {
  private readonly initialDuration = 99;
  private readonly el: HTMLElement;
  private readonly onEnd: Callback;

  private timerId: number | null = null;
  public time: number;

  constructor(onEndCallback: Callback) {
    const element = document.querySelector<HTMLElement>(".timer");
    if (!element) {
      throw new Error("Aucun élément .timer n'a été trouvé");
    }
    this.el = element;

    this.time = this.initialDuration;
    this.onEnd = onEndCallback;
  }

  public reset() {
    this.stop();
    this.time = this.initialDuration;
    this.refresh();
  }

  public stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public start(): void {
    if (this.timerId !== null) return;

    this.timerId = window.setInterval(() => {
      this.tick();
    }, 1000);
  }

  private tick(): void {
    this.time--;
    this.refresh();

    if (this.time <= 0) {
      this.time = 0;
      this.stop();
      this.onEnd();
    }
  }

  // Update DOM
  private refresh(): void {
    this.el.textContent = String(this.time);
  }
}
