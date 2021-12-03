class UiController {
  constructor() {
    // Browse input(type:file)
    this.browse = document.getElementById("browse");
    // Filelist select
    this.filelist = document.getElementById("filelist");
    // On change Browse
    this.browse.addEventListener("change", (event) => {
      // Create Audio Context
      if(this.audioprocess.ctx === undefined) {
        this.audioprocess.createAudioContext();
      }

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
    // Input
    this.fader_a_pitch = document.getElementsByTagName("input")[0];
    this.radio_a_pitch_ratio_8 = document.getElementsByTagName("input")[1];
    this.radio_a_pitch_ratio_16 = document.getElementsByTagName("input")[2];
    this.radio_a_pitch_ratio_32 = document.getElementsByTagName("input")[3];
    this.radio_a_pitch_ratio_64 = document.getElementsByTagName("input")[4];
    this.a_gain = document.getElementsByTagName("input")[5];
    this.eq_a_hi = document.getElementsByTagName("input")[6];
    this.eq_a_mid = document.getElementsByTagName("input")[7];
    this.eq_a_lo = document.getElementsByTagName("input")[8];
    this.chkbox_a_monitor = document.getElementsByTagName("input")[9];
    this.fader_a_input = document.getElementsByTagName("input")[10];
    this.file_browse = document.getElementsByTagName("input")[11];
    this.volume_master = document.getElementsByTagName("input")[12];
    this.volume_monitor = document.getElementsByTagName("input")[13];
    this.b_gain = document.getElementsByTagName("input")[14];
    this.eq_b_hi = document.getElementsByTagName("input")[15];
    this.eq_b_mid = document.getElementsByTagName("input")[16];
    this.eq_b_lo = document.getElementsByTagName("input")[17];
    this.chkbox_b_monitor = document.getElementsByTagName("input")[18];
    this.fader_b_input = document.getElementsByTagName("input")[19];
    this.fader_cross = document.getElementsByTagName("input")[20];
    this.fader_b_pitch = document.getElementsByTagName("input")[21];
    this.radio_b_pitch_ratio_8 = document.getElementsByTagName("input")[22];
    this.radio_b_pitch_ratio_16 = document.getElementsByTagName("input")[23];
    this.radio_b_pitch_ratio_32 = document.getElementsByTagName("input")[24];
    this.radio_b_pitch_ratio_64 = document.getElementsByTagName("input")[25];
    // Button
    this.btn_a_reset = document.getElementsByTagName("button")[0];
    this.btn_a_cue = document.getElementsByTagName("button")[1];
    this.btn_a_play = document.getElementsByTagName("button")[2];
    this.btn_a_pad1 = document.getElementsByTagName("button")[3];
    this.btn_a_pad2 = document.getElementsByTagName("button")[4];
    this.btn_a_pad3 = document.getElementsByTagName("button")[5];
    this.btn_a_pad4 = document.getElementsByTagName("button")[6];
    this.btn_a_pad5 = document.getElementsByTagName("button")[7];
    this.btn_a_pad6 = document.getElementsByTagName("button")[8];
    this.btn_a_pad7 = document.getElementsByTagName("button")[9];
    this.btn_a_pad8 = document.getElementsByTagName("button")[10];
    this.btn_a_load = document.getElementsByTagName("button")[11];
    this.btn_file_browse = document.getElementsByTagName("button")[12];
    this.btn_b_load = document.getElementsByTagName("button")[13];
    this.btn_b_reset = document.getElementsByTagName("button")[14];
    this.btn_b_cue = document.getElementsByTagName("button")[15];
    this.btn_b_play = document.getElementsByTagName("button")[16];
    this.btn_b_pad1 = document.getElementsByTagName("button")[17];
    this.btn_b_pad2 = document.getElementsByTagName("button")[18];
    this.btn_b_pad3 = document.getElementsByTagName("button")[19];
    this.btn_b_pad4 = document.getElementsByTagName("button")[20];
    this.btn_b_pad5 = document.getElementsByTagName("button")[21];
    this.btn_b_pad6 = document.getElementsByTagName("button")[22];
    this.btn_b_pad7 = document.getElementsByTagName("button")[23];
    this.btn_b_pad8 = document.getElementsByTagName("button")[24];


    // Cross Fader
    this.fader_cross.addEventListener("change", (event) => { this.audioprocess.onCrossFader(event.target.value); });
    // Master Volume
    this.volume_master.addEventListener("change", (event) => { this.audioprocess.onMasterVolume(event.target.value); });

    // A audio
    this.a_audio = document.getElementsByTagName("audio")[0];
    // Fader A pitch
    this.fader_a_pitch.addEventListener("change", (event) => { this.onFaderAPitch(event.target.value); });
    // Reset A pitch button
    this.btn_a_reset.addEventListener("click", (event) =>{ this.fader_a_pitch.value = 64; this.onFaderAPitch(64);});
    // Load A button
    this.btn_a_load.addEventListener("click", (event) =>{ this.onLoadADeck(event); });
    // A gain/trim
    this.a_gain.addEventListener("change", (event) => { this.audioprocess.onAGain(event.target.value); });
    // Fader A input
    this.fader_a_input.addEventListener("change", (event) => { this.audioprocess.onFaderAInput(event.target.value); });    
    // Equalizer A high
    this.eq_a_hi.addEventListener("change", (event) => { this.audioprocess.onEqualizerAHigh(event.target.value); });
    // Equalizer A middle
    this.eq_a_mid.addEventListener("change", (event) => { this.audioprocess.onEqualizerAMiddle(event.target.value); });
    // Equalizer A low
    this.eq_a_lo.addEventListener("change", (event) => { this.audioprocess.onEqualizerALow(event.target.value); });
    // Play A button
    this.btn_a_play.addEventListener("click", (event) =>{ this.onClickAPlay(event); });

    // B audio
    this.b_audio = document.getElementsByTagName("audio")[1];
    // Fader B pitch
    this.fader_b_pitch.addEventListener("change", (event) => { this.onFaderBPitch(event.target.value); });
    // Reset B pitch button
    this.btn_b_reset.addEventListener("click", (event) =>{ this.fader_b_pitch.value = 64; this.onFaderBPitch(64);})
    // Load B button
    this.btn_b_load.addEventListener("click", (event) =>{ this.onLoadBDeck(event); });
    // B gain/trim
    this.b_gain.addEventListener("change", (event) => { this.audioprocess.onBGain(event.target.value); });
    // Fader B input
    this.fader_b_input.addEventListener("change", (event) => { this.audioprocess.onFaderBInput(event.target.value); });    
    // Equalizer B high
    this.eq_b_hi.addEventListener("change", (event) => { this.audioprocess.onEqualizerBHigh(event.target.value); });
    // Equalizer B middle
    this.eq_b_mid.addEventListener("change", (event) => { this.audioprocess.onEqualizerBMiddle(event.target.value); });
    // Equalizer B low
    this.eq_b_lo.addEventListener("change", (event) => { this.audioprocess.onEqualizerBLow(event.target.value); });
    // Play B button
    this.btn_b_play.addEventListener("click", (event) =>{ this.onClickBPlay(event); });
  }

  audioprocess;
  midicontroller;

  onLoadADeck(event) {
    const reader = new FileReader();
    reader.onload = (event) => {
      // Set selected file to A audio source
      this.a_audio.src = event.target.result;
      // Keep set pitch
      this.onFaderAPitch(this.fader_a_pitch.value);
    }
    reader.readAsDataURL(this.filelist.options[this.filelist.selectedIndex].file);
  }

  onFaderAPitch(value) {
    const ratio = Number(document.querySelector('input[name="pitch_a_ratio"]:checked').value);
    this.a_audio.playbackRate = 1.0 + (value - 64) / (6400 / ratio);
  }

  onLoadBDeck(event) {
    const reader = new FileReader();
    reader.onload = (event) => {
      // Set selected file to B audio source
      this.b_audio.src = event.target.result;
      // Keep set pitch
      this.onFaderBPitch(this.fader_b_pitch.value);
    }
    reader.readAsDataURL(this.filelist.options[this.filelist.selectedIndex].file);
  }

  onFaderBPitch(value) {
    const ratio = Number(document.querySelector('input[name="pitch_b_ratio"]:checked').value);
    this.b_audio.playbackRate = 1.0 + (value - 64) / (6400 / ratio);
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