class UiController {
  constructor() {
    // Browse input(type:file)
    this.browse = document.getElementById("browse");
    // Filelist select
    this.filelist = document.getElementById("filelist");
    // On change Browse
    this.browse.addEventListener("change", (event) => {
      // Append files into Filelist
      for(let f of event.target.files) {
        let op = document.createElement("option");
        op.innerText = f.name;
        op.file = f;
        this.filelist.appendChild(op);
      }
      // Select the first file
      this.filelist.value = event.target.files[0].name;
    });

    // A audio
    this.a_audio = document.getElementsByTagName("audio")[0];
    // Load A button
    this.load_a_btn = document.getElementById("load_a_btn");
    this.load_a_btn.addEventListener("click", (event) =>{ this.onLoadADeck(event); });
    // Play A button
    this.play_a_btn = document.getElementById("play_a_btn");
    this.play_a_btn.addEventListener("click", (event) =>{ this.onClickAPlay(event); });

    // B audio
    this.b_audio = document.getElementsByTagName("audio")[1];
    // Load B button
    this.load_b_btn = document.getElementById("load_b_btn");
    this.load_b_btn.addEventListener("click", (event) =>{ this.onLoadBDeck(event); });
    // Play B button
    this.play_b_btn = document.getElementById("play_b_btn");
    this.play_b_btn.addEventListener("click", (event) =>{ this.onClickBPlay(event); });
  }

  audioprocess;
  midicontroller;

  onLoadADeck(event) {
    const reader = new FileReader();
    reader.onload = (event) => {
      // Set selected file to A audio source
      this.a_audio.src = event.target.result;
    }
    reader.readAsDataURL(this.filelist.options[this.filelist.selectedIndex].file);
  }

  onLoadBDeck(event) {
    const reader = new FileReader();
    reader.onload = (event) => {
      // Set selected file to B audio source
      this.b_audio.src = event.target.result;
    }
    reader.readAsDataURL(this.filelist.options[this.filelist.selectedIndex].file);
  }

  onClickAPlay() {
    // Toggle play and pause
    if(this.a_audio.paused) {
      this.a_audio.play();
    } else if(this.a_audio.played) {
      this.a_audio.pause();
    }
  }

  onClickBPlay() {
    // Toggle play and pause
    if(this.b_audio.paused) {
      this.b_audio.play();
    } else if(this.b_audio.played) {
      this.b_audio.pause();
    }
  }
}