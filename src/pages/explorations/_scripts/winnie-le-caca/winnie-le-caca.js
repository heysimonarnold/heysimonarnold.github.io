import memesArr from "./memes.json";

class Winnie {
  constructor() {
    this.dom = this.getDomElements();

    this.index = 0;
    this.resolution = "standard";
    this.obj = null;

    this.init();
    this.bindEvents();
  }

  /* ----------------------------- */
  /* Initialization                */
  /* ----------------------------- */

  getDomElements() {
    return {
      resolutionRadios: document.querySelectorAll('input[name="resolution"]'),
      meme: document.querySelector(".meme"),
      url: document.querySelector(".url"),
      random: document.querySelector(".random"),
      text1: document.querySelector(".text.no1"),
      text2: document.querySelector(".text.no2"),
      source: document.querySelector(".source"),
      download: document.querySelector(".download"),
      hrefDownload: document.querySelector(".href-download"),
    };
  }

  init() {
    const hashResolution = window.location.hash.substring(1);
    const slug = window.location.pathname.replace(/\/$/, "").split("/").pop();

    const foundIndex = memesArr.findIndex((obj) => obj.slug === slug);
    this.index = foundIndex ?? 0;
    this.changeResolution(hashResolution || "standard", true);

    this.obj = memesArr[this.index];
    this.updateMeme(this.obj);
  }

  bindEvents() {
    this.dom.resolutionRadios.forEach((radio) => {
      radio.addEventListener("change", (e) =>
        this.changeResolution(e.target.value),
      );
    });

    this.dom.random?.addEventListener("click", () => this.getNextMeme());
    this.dom.download?.addEventListener("click", () => this.downloadMeme());
  }

  /* ----------------------------- */
  /* Meme Logic                    */
  /* ----------------------------- */

  shuffleMemes() {
    for (let i = memesArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [memesArr[i], memesArr[j]] = [memesArr[j], memesArr[i]];
    }
  }

  getNextMeme() {
    this.index = (this.index + 1) % memesArr.length;

    if (this.index === 0) {
      this.shuffleMemes();
    }

    this.obj = memesArr[this.index];
    this.updateMeme(this.obj);
  }

  updateMeme(obj) {
    if (!obj) return;

    this.updateTextBlock(this.dom.text1, obj.no1);
    this.updateTextBlock(this.dom.text2, obj.no2);

    if (obj.source && obj.source.trim() !== "") {
      this.dom.source.style.display = "flex";
      this.dom.url.textContent = obj.source;
      this.dom.url.href = obj.source;
    } else {
      this.dom.source.style.display = "none";
    }

    this.updateURL();
  }

  updateTextBlock(element, data) {
    if (!element || !data) return;

    if (data.text) {
      element.textContent = data.text;
      element.style.backgroundImage = "none";
    } else if (data.img) {
      element.textContent = "";
      element.style.backgroundImage = `url(${data.img})`;
    } else {
      element.textContent = "";
      element.style.backgroundImage = "none";
    }
  }

  /* ----------------------------- */
  /* Resolution & URL              */
  /* ----------------------------- */

  changeResolution(resolution = "standard", updateRadio = false) {
    this.dom.meme.classList.remove("is-standard", "is-hd", "is-4k");
    this.dom.meme.classList.add(`is-${resolution}`);

    this.resolution = resolution;

    if (updateRadio) {
      const radio = document.querySelector(`input[value="${resolution}"]`);
      if (radio) radio.checked = true;
    }

    this.updateURL();
  }

  updateURL() {
    if (!this.obj) return;

    const { pathname } = window.location;
    const delimiter = "winnie-le-caca";
    const index = pathname.indexOf(delimiter);

    if (index === -1) return;

    const baseUrl = pathname.substring(0, index + delimiter.length);

    let url = this.obj.slug ? `${baseUrl}/${this.obj.slug}/` : baseUrl;

    if (this.resolution && this.resolution !== "standard") {
      url += `#${this.resolution}`;
    }

    const title = this.obj.no1?.text
      ? `Winnie le caca - ${this.obj.no1.text}`
      : "Winnie le caca";

    window.history.replaceState({}, title, url);
  }

  /* ----------------------------- */
  /* Download                      */
  /* ----------------------------- */

  async downloadMeme() {
    if (!this.dom.meme) return;

    const canvas = await html2canvas(this.dom.meme, {
      scale: window.devicePixelRatio,
      scrollX: 0,
      scrollY: 0,
    });

    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    this.dom.hrefDownload.href = image;
    this.dom.hrefDownload.download = this.obj?.slug
      ? `winnie-${this.obj?.slug}.png`
      : "winnie.png";
    this.dom.hrefDownload.click();
  }
}

new Winnie();
