let bodyWidth: number = document.body.clientWidth;
let bodyHeight: number = document.body.clientHeight;
let isTouch: boolean = false;

const cartridge = document.querySelector<HTMLElement>(".cartridge");

function isTouchDevice(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function init(): void {
  bodyWidth = document.body.clientWidth;
  bodyHeight = document.body.clientHeight;
  isTouch = isTouchDevice();

  document.body.classList.toggle("touch-device", isTouch);
}

function setAngle(e: MouseEvent): void {
  if (!cartridge) return;

  const ratioX = e.clientX / bodyWidth;
  const angleX = ratioX * 270 - 135;

  const ratioY = e.clientY / bodyHeight;
  const angleY = ratioY * 189 - 90;

  cartridge.style.transform = `
    rotateY(${angleX}deg)
    rotateX(${-angleY}deg)
  `;
}

init();

window.addEventListener("resize", init);
document.body.addEventListener("mousemove", setAngle);
