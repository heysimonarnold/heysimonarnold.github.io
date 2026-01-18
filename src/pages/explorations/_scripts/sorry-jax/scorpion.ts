type Callback = () => void;

export class Scorpion {
  public isCrouching = false;
  public isLookingLeft = false;
  public isPlayable = false;

  private readonly el: HTMLElement;

  constructor() {
    const element = document.querySelector<HTMLElement>(".scorpion");
    if (!element) {
      throw new Error("Aucun élément .scorpion n'a été trouvé");
    }
    this.el = element;
  }

  private onAnimationEnd(callback?: Callback): void {
    if (!callback) return;
    this.el.addEventListener("animationend", callback, { once: true });
  }

  public reset() {
    this.setIsCrouching(false);
    this.el.classList.remove("scorpion--win");
  }

  public setPlayable(isPlayable: boolean): void {
    this.isPlayable = isPlayable;
    if (!isPlayable) this.reset();
  }

  public uppercut(callback?: () => void): void {
    if (!this.isPlayable) return;

    this.setIsCrouching(false);
    this.el.classList.add("scorpion--uppercut");

    this.onAnimationEnd(() => {
      this.el.classList.remove("scorpion--uppercut");
      callback?.();
    });
  }

  public setIsCrouching(state: boolean): void {
    if (!this.isPlayable) return;
    this.isCrouching = state;
    this.el.classList.toggle("scorpion--crouch", state);
  }

  public setIsLookingLeft(state: boolean) {
    if (!this.isPlayable) return;
    this.isLookingLeft = state;
    this.el.classList.toggle("scorpion--left", this.isLookingLeft);
  }

  public win() {
    this.isPlayable = false;
    this.el.classList.add("scorpion--win");
  }
}
