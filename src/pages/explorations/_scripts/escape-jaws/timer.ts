export class Timer {
  private dom: { el: HTMLElement };
  private started = false;
  private interval: ReturnType<typeof setInterval> | null = null;
  private seconds = 0;
  private tens = 0;

  constructor(el: HTMLElement) {
    this.dom = { el };
  }

  start(): void {
    if (this.started) return;

    this.started = true;
    this.interval = setInterval(() => this.update(), 10);
  }

  pause(): void {
    this.started = false;

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private update(): void {
    this.tens++;

    if (this.tens > 99) {
      this.seconds++;
      this.tens = 0;
    }

    this.dom.el.innerText = this.format();
  }

  format(): string {
    const secs = this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
    const tens = this.tens < 10 ? `0${this.tens}` : `${this.tens}`;

    return `${secs}:${tens}`;
  }

  reset(): void {
    this.pause();
    this.seconds = 0;
    this.tens = 0;
    this.dom.el.innerText = this.format();
  }
}
