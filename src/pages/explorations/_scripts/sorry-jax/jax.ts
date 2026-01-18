type Callback = () => void;

export class Jax {
  public health = 1;
  public isLeft = false;

  private readonly el: HTMLElement;

  constructor() {
    const element = document.querySelector<HTMLElement>(".jax");
    if (!element) {
      throw new Error("Aucun élément .jax n'a été trouvé");
    }
    this.el = element;

    const meter = document.querySelector<HTMLElement>(".no2 .meter__progress");
    if (!meter) {
      throw new Error("Aucun élément .no2 .meter__progress n'a été trouvé");
    }
  }

  private onAnimationEnd(callback?: Callback): void {
    if (!callback) return;
    this.el.addEventListener("animationend", callback, { once: true });
  }

  private onTransitionEnd(callback?: Callback): void {
    if (!callback) return;
    this.el.addEventListener("transitionend", callback, { once: true });
  }

  reset(): void {
    this.el.classList.remove("jax--hit", "jax--fall");
  }

  setRandomSide(): void {
    this.isLeft = Math.random() > 0.5;
    this.el.classList.toggle("jax--left", this.isLeft);
  }

  setVisible(visible: boolean, callback?: Callback): void {
    this.el.classList.toggle("jax--fade-out", !visible);
    this.onTransitionEnd(callback);
  }

  respawn(): void {
    this.reset();
    this.setRandomSide();
    this.setVisible(true);
  }

  damage(callback?: Callback): void {
    navigator.vibrate?.(200);

    this.el.classList.add("jax--hit");

    this.onAnimationEnd(() => {
      setTimeout(() => this.setVisible(false), 500);
      setTimeout(() => callback?.(), 1000);
    });
  }

  fall(callback?: Callback): void {
    this.el.classList.add("jax--fall");

    this.onAnimationEnd(() => {
      setTimeout(() => this.setVisible(false), 500);
      setTimeout(() => callback?.(), 1000);
    });
  }
}
