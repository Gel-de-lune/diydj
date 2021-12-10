class UiController {
  constructor() {
    // Clock
    this.animationFrameClock();
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
    let index = 0;
    this.fader_a_pitch = document.getElementsByTagName("input")[index++];
    this.radio_a_pitch_ratio_8 = document.getElementsByTagName("input")[index++];
    this.radio_a_pitch_ratio_16 = document.getElementsByTagName("input")[index++];
    this.radio_a_pitch_ratio_32 = document.getElementsByTagName("input")[index++];
    this.radio_a_pitch_ratio_64 = document.getElementsByTagName("input")[index++];
    this.a_gain = document.getElementsByTagName("input")[index++];
    this.eq_a_hi = document.getElementsByTagName("input")[index++];
    this.eq_a_mid = document.getElementsByTagName("input")[index++];
    this.eq_a_lo = document.getElementsByTagName("input")[index++];
    this.chkbox_a_monitor = document.getElementsByTagName("input")[index++];
    this.a_filter = document.getElementsByTagName("input")[index++];
    this.fader_a_input = document.getElementsByTagName("input")[index++];
    this.file_browse = document.getElementsByTagName("input")[index++];
    this.volume_master = document.getElementsByTagName("input")[index++];
    this.volume_monitor = document.getElementsByTagName("input")[index++];
    this.b_gain = document.getElementsByTagName("input")[index++];
    this.eq_b_hi = document.getElementsByTagName("input")[index++];
    this.eq_b_mid = document.getElementsByTagName("input")[index++];
    this.eq_b_lo = document.getElementsByTagName("input")[index++];
    this.chkbox_b_monitor = document.getElementsByTagName("input")[index++];
    this.b_filter = document.getElementsByTagName("input")[index++];
    this.fader_b_input = document.getElementsByTagName("input")[index++];
    this.fader_cross = document.getElementsByTagName("input")[index++];
    this.fader_b_pitch = document.getElementsByTagName("input")[index++];
    this.radio_b_pitch_ratio_8 = document.getElementsByTagName("input")[index++];
    this.radio_b_pitch_ratio_16 = document.getElementsByTagName("input")[index++];
    this.radio_b_pitch_ratio_32 = document.getElementsByTagName("input")[index++];
    this.radio_b_pitch_ratio_64 = document.getElementsByTagName("input")[index++];
    // Button
    index = 0;
    this.btn_a_reset = document.getElementsByTagName("button")[index++];
    this.btn_a_cue = document.getElementsByTagName("button")[index++];
    this.btn_a_play = document.getElementsByTagName("button")[index++];
    this.btn_a_pad1 = document.getElementsByTagName("button")[index++];
    this.btn_a_pad2 = document.getElementsByTagName("button")[index++];
    this.btn_a_pad3 = document.getElementsByTagName("button")[index++];
    this.btn_a_pad4 = document.getElementsByTagName("button")[index++];
    this.btn_a_pad5 = document.getElementsByTagName("button")[index++];
    this.btn_a_pad6 = document.getElementsByTagName("button")[index++];
    this.btn_a_pad7 = document.getElementsByTagName("button")[index++];
    this.btn_a_pad8 = document.getElementsByTagName("button")[index++];
    this.btn_a_load = document.getElementsByTagName("button")[index++];
    this.btn_file_browse = document.getElementsByTagName("button")[index++];
    this.btn_b_load = document.getElementsByTagName("button")[index++];
    this.btn_b_reset = document.getElementsByTagName("button")[index++];
    this.btn_b_cue = document.getElementsByTagName("button")[index++];
    this.btn_b_play = document.getElementsByTagName("button")[index++];
    this.btn_b_pad1 = document.getElementsByTagName("button")[index++];
    this.btn_b_pad2 = document.getElementsByTagName("button")[index++];
    this.btn_b_pad3 = document.getElementsByTagName("button")[index++];
    this.btn_b_pad4 = document.getElementsByTagName("button")[index++];
    this.btn_b_pad5 = document.getElementsByTagName("button")[index++];
    this.btn_b_pad6 = document.getElementsByTagName("button")[index++];
    this.btn_b_pad7 = document.getElementsByTagName("button")[index++];
    this.btn_b_pad8 = document.getElementsByTagName("button")[index++];


    // Cross fader
    this.fader_cross.addEventListener("change", (event) => { this.audioprocess.onCrossFader(event.target.value); });
    // Master volume
    this.volume_master.addEventListener("change", (event) => { this.audioprocess.onMasterVolume(event.target.value); });
    // Monitor volume
    this.volume_monitor.addEventListener("change", (event) => { this.audioprocess.onMonitorVolume(event.target.value); });

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
    // A monitor cue
    this.chkbox_a_monitor.addEventListener("change", (event) => { this.audioprocess.onChangeAMonitorCue(event.target.checked); });
    // A filter
    this.a_filter.addEventListener("change", (event) => { this.onAFilter(event.target.value); });
    // Play A button
    this.btn_a_play.addEventListener("click", (event) =>{ this.onClickAPlay(event); });
    // Mouse down A cue
    this.btn_a_cue.addEventListener("mousedown", (event) =>{ this.onMouseDownACue(event); });
    // Mouse up A cue
    this.btn_a_cue.addEventListener("mouseup", (event) =>{ this.onMouseUpACue(event); });

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
    // B monitor cue
    this.chkbox_b_monitor.addEventListener("change", (event) => { this.audioprocess.onChangeBMonitorCue(event.target.checked); });
    // B filter
    this.b_filter.addEventListener("change", (event) => { this.onBFilter(event.target.value); });
    // Play B button
    this.btn_b_play.addEventListener("click", (event) =>{ this.onClickBPlay(event); });
    // Mouse down B cue
    this.btn_b_cue.addEventListener("mousedown", (event) =>{ this.onMouseDownBCue(event); });
    // Mouse up B cue
    this.btn_b_cue.addEventListener("mouseup", (event) =>{ this.onMouseUpBCue(event); });

  }

  audioprocess;
  midicontroller;

  animationFrameClock() {
    let m = 60;
    let f = () => {
      let d = new Date();
      if(m !== d.getMinutes()) {
        document.getElementById("clock").innerText = d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0');
        m = d.getMinutes();
      }
      window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
  }

  onMoveFileList(value) {
    if(value === 0x01) {
      // Right rotate
      this.filelist.selectedIndex++;
      if(0 > this.filelist.selectedIndex) this.filelist.selectedIndex = 0;
    }
    else if(value === 0x7F) {
      // Left rotate
      this.filelist.selectedIndex--;
      if(0 > this.filelist.selectedIndex) this.filelist.selectedIndex = this.filelist.length - 1;
    }
  }

  onLoadADeck(event) {
    const reader = new FileReader();
    reader.onload = (event) => {
      // Set selected file to A audio source
      this.a_audio.src = event.target.result;
      // Keep set pitch
      this.onFaderAPitch(this.fader_a_pitch.value);
      // Set A cue point to 0
      this.point_a_cue = 0;
    }
    reader.readAsDataURL(this.filelist.options[this.filelist.selectedIndex].file);
  }

  onChangeATempoRange(value) {
    switch(document.querySelector('input[name="pitch_a_ratio"]:checked')) {
      case this.radio_a_pitch_ratio_8:
        this.radio_a_pitch_ratio_16.checked = true;
        break;
      case this.radio_a_pitch_ratio_16:
        this.radio_a_pitch_ratio_32.checked = true;
        break;
      case this.radio_a_pitch_ratio_32:
        this.radio_a_pitch_ratio_64.checked = true;
        break;
      case this.radio_a_pitch_ratio_64:
        this.radio_a_pitch_ratio_8.checked = true;
        break;      
    }
    this.onFaderAPitch(this.fader_a_pitch.value);
  }

  onFaderAPitch(value) {
    const ratio = Number(document.querySelector('input[name="pitch_a_ratio"]:checked').value);
    this.a_audio.playbackRate = 1.0 + (value - 64) / (6400 / ratio);
  }

  onAFilter(value) {
    // In case value is 64, execute lowpass and highpass both
    if(value <= 64) {
      this.audioprocess.onFilterALowpass((64 - value)*2);
    }
    if(64 <= value) {
      this.audioprocess.onFilterAHighpass((value - 64)*2);
    }
  }

  onLoadBDeck(event) {
    const reader = new FileReader();
    reader.onload = (event) => {
      // Set selected file to B audio source
      this.b_audio.src = event.target.result;
      // Keep set pitch
      this.onFaderBPitch(this.fader_b_pitch.value);
      // Set B cue point to 0
      this.point_b_cue = 0;
    }
    reader.readAsDataURL(this.filelist.options[this.filelist.selectedIndex].file);
  }

  onChangeBTempoRange(value) {
    switch(document.querySelector('input[name="pitch_b_ratio"]:checked')) {
      case this.radio_b_pitch_ratio_8:
        this.radio_b_pitch_ratio_16.checked = true;
        break;
      case this.radio_b_pitch_ratio_16:
        this.radio_b_pitch_ratio_32.checked = true;
        break;
      case this.radio_b_pitch_ratio_32:
        this.radio_b_pitch_ratio_64.checked = true;
        break;
      case this.radio_b_pitch_ratio_64:
        this.radio_b_pitch_ratio_8.checked = true;
        break;      
    }
    this.onFaderBPitch(this.fader_b_pitch.value);
  }

  onFaderBPitch(value) {
    const ratio = Number(document.querySelector('input[name="pitch_b_ratio"]:checked').value);
    this.b_audio.playbackRate = 1.0 + (value - 64) / (6400 / ratio);
  }

  onBFilter(value) {
    // In case value is 64, execute lowpass and highpass both
    if(value <= 64) {
      this.audioprocess.onFilterBLowpass((64 - value)*2);
    }
    if(64 <= value) {
      this.audioprocess.onFilterBHighpass((value - 64)*2);
    }
  }

  onClickAPlay() {
    // Toggle play and pause
    if(this.a_audio.paused) {
      this.a_audio.play();
    } else if(this.a_audio.played) {
      this.a_audio.pause();
    }
  }

  onMouseDownACue() {
    if(this.a_audio.paused) {
      // Set A cue point to current time
      this.point_a_cue = this.a_audio.currentTime;
      // Play the audio
      this.a_audio.play();
    } else if(this.a_audio.played) {
      // Back to the cue point
      this.a_audio.currentTime = this.point_a_cue;
    }
  }

  onMouseUpACue() {
    if(this.a_audio.played) {
      // Pause the audio
      this.a_audio.pause();
      // Back to the cue point
      this.a_audio.currentTime = this.point_a_cue;
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

  onMouseDownBCue() {
    if(this.b_audio.paused) {
      // Set B cue point to current time
      this.point_b_cue = this.b_audio.currentTime;
      // Play the audio
      this.b_audio.play();
    } else if(this.b_audio.played) {
      // Back to the cue point
      this.b_audio.currentTime = this.point_b_cue;
    }
  }

  onMouseUpBCue() {
    if(this.b_audio.played) {
      // Pause the audio
      this.b_audio.pause();
      // Back to the cue point
      this.b_audio.currentTime = this.point_b_cue;
    }
  }
}