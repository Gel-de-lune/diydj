class UiController {
  constructor() {
    // Browse input(type:file)
    this.browse = document.getElementById("browse");
    // Filelist select
    this.filelist = document.getElementById("filelist");
    // On change Browse
    this.browse.addEventListener("change", (event) => {
      // Create Audio Context
      this.audioprocess.createAudioContext();

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
    // Cross Fader
    this.crossfader = document.getElementsByTagName("input")[16];
    this.crossfader.addEventListener("change", (event) => { this.audioprocess.onCrossFader(event.target.value); });
    // Master Volume
    this.mastervolume = document.getElementsByTagName("input")[8];
    this.mastervolume.addEventListener("change", (event) => { this.audioprocess.onMasterVolume(event.target.value); });

    // A audio
    this.a_audio = document.getElementsByTagName("audio")[0];
    // Load A button
    this.load_a_btn = document.getElementById("load_a_btn");
    this.load_a_btn.addEventListener("click", (event) =>{ this.onLoadADeck(event); });
    // A gain/trim
    this.a_gain = document.getElementsByTagName("input")[1];
    this.a_gain.addEventListener("change", (event) => { this.audioprocess.onAGain(event.target.value); });
    // Fader A input
    this.fader_a_input = document.getElementsByTagName("input")[6];
    this.fader_a_input.addEventListener("change", (event) => { this.audioprocess.onFaderAInput(event.target.value); });    
    // Equalizer A high
    this.eq_a_hi = document.getElementsByTagName("input")[2];
    this.eq_a_hi.addEventListener("change", (event) => { this.audioprocess.onEqualizerAHigh(event.target.value); });
    // Equalizer A middle
    this.eq_a_mid = document.getElementsByTagName("input")[3];
    this.eq_a_mid.addEventListener("change", (event) => { this.audioprocess.onEqualizerAMiddle(event.target.value); });
    // Equalizer A low
    this.eq_a_lo = document.getElementsByTagName("input")[4];
    this.eq_a_lo.addEventListener("change", (event) => { this.audioprocess.onEqualizerALow(event.target.value); });
    // Play A button
    this.play_a_btn = document.getElementById("play_a_btn");
    this.play_a_btn.addEventListener("click", (event) =>{ this.onClickAPlay(event); });


    // B audio
    this.b_audio = document.getElementsByTagName("audio")[1];
    // Load B button
    this.load_b_btn = document.getElementById("load_b_btn");
    this.load_b_btn.addEventListener("click", (event) =>{ this.onLoadBDeck(event); });
    // B gain/trim
    this.b_gain = document.getElementsByTagName("input")[10];
    this.b_gain.addEventListener("change", (event) => { this.audioprocess.onBGain(event.target.value); });
    // Fader B input
    this.fader_b_input = document.getElementsByTagName("input")[15];
    this.fader_b_input.addEventListener("change", (event) => { this.audioprocess.onFaderBInput(event.target.value); });    
    // Equalizer B high
    this.eq_b_hi = document.getElementsByTagName("input")[11];
    this.eq_b_hi.addEventListener("change", (event) => { this.audioprocess.onEqualizerBHigh(event.target.value); });
    // Equalizer B middle
    this.eq_b_mid = document.getElementsByTagName("input")[12];
    this.eq_b_mid.addEventListener("change", (event) => { this.audioprocess.onEqualizerBMiddle(event.target.value); });
    // Equalizer B low
    this.eq_b_lo = document.getElementsByTagName("input")[13];
    this.eq_b_lo.addEventListener("change", (event) => { this.audioprocess.onEqualizerBLow(event.target.value); });
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