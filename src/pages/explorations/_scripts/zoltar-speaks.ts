const wrapper = document.getElementById("wrapper") as HTMLElement | null;
const switchBtn = document.getElementById("switch") as HTMLElement | null;
const switchInput = document.getElementById("switch-input") as HTMLInputElement;
const wheel1 = document.getElementById("wheel1") as HTMLElement | null;
const wheel2 = document.getElementById("wheel2") as HTMLElement | null;

let wheel1Rotation = 0;
let wheel2Rotation = 0;
let isDisabled = false;

const MAGIC = new Audio("/explorations/zoltar-speaks/sounds/magic.mp3");
const SWITCH_ON = new Audio("/explorations/zoltar-speaks/sounds/switch-on.mp3");
const SWITCH_OFF = new Audio(
  "/explorations/zoltar-speaks/sounds/switch-off.mp3",
);

wrapper?.addEventListener("click", spinWheel);

switchBtn?.addEventListener("click", () => {
  const isXrayActive = switchInput.checked;
  if (isXrayActive) {
    document.body.classList.add("x-ray");
    SWITCH_ON.currentTime = 0;
    SWITCH_ON.play();
  } else {
    document.body.classList.remove("x-ray");
    SWITCH_OFF.currentTime = 0;
    SWITCH_OFF.play();
  }
});

function spinWheel(): void {
  if (isDisabled) return;

  isDisabled = true;
  if (!wrapper || !wheel1 || !wheel2) return;

  MAGIC.currentTime = 0;
  MAGIC.play();
  wrapper.classList.add("spinning");

  const onTransitionEnd = () => {
    wrapper.classList.remove("spinning");
    isDisabled = false;
    wheel1.removeEventListener("transitionend", onTransitionEnd);
  };

  wheel1.addEventListener("transitionend", onTransitionEnd);

  wheel1Rotation += getRotation() * 30;
  wheel1.style.transform = `rotate(${wheel1Rotation}deg)`;

  wheel2Rotation += getRotation() * -30;
  wheel2.style.transform = `rotate(${wheel2Rotation}deg)`;
}

const getRotation = (): number => {
  const res = Math.floor(Math.random() * 12);

  return 24 + res;
};
