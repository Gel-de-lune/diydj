class HidController {
  constructor() {
    // interval
    this.a_unit_interval_f = 0;
    this.a_unit_interval_b = 0;
    this.b_unit_interval_f = 0;
    this.b_unit_interval_b = 0;
  
    // Div
    this.div_a = document.getElementsByTagName("div")[1];
    this.div_a_pitch = document.getElementsByTagName("div")[5];
    this.div_a_gain = document.getElementsByTagName("div")[24];
    this.div_a_hi = document.getElementsByTagName("div")[26];
    this.div_a_mid = document.getElementsByTagName("div")[27];
    this.div_a_low = document.getElementsByTagName("div")[28];
    this.div_a_lpfhpf = document.getElementsByTagName("div")[30];
    this.div_a_input = document.getElementsByTagName("div")[31];
    this.div_master = document.getElementsByTagName("div")[36];
    this.div_monitor = document.getElementsByTagName("div")[37];
    this.div_b_gain = document.getElementsByTagName("div")[40];
    this.div_b_hi = document.getElementsByTagName("div")[42];
    this.div_b_mid = document.getElementsByTagName("div")[43];
    this.div_b_low = document.getElementsByTagName("div")[44];
    this.div_b_lpfhpf = document.getElementsByTagName("div")[46];
    this.div_b_input = document.getElementsByTagName("div")[47];
    this.div_cross = document.getElementsByTagName("div")[48];
    this.div_b = document.getElementsByTagName("div")[50];
    this.div_b_pitch = document.getElementsByTagName("div")[54];

    // Cross fader
    this.div_cross.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onCrossFader(value); }); });
    // Master volume
    this.div_master.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onMasterVolume(value); }); });
    // Monitor volume
    this.div_monitor.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onMonitorVolume(value); }); });

    // A
    this.div_a.addEventListener("wheel", (event) => { this.onWheelASearch(event); }); // deltaY slow:200/3 fast:400/3
    // Fader A pitch
    this.div_a_pitch.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.uicontroller.onFaderAPitch(value); }); });
    // A gain/trim
    this.div_a_gain.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onAGain(value); }); });
    // Equalizer A high
    this.div_a_hi.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onEqualizerAHigh(value); }); });
    // Equalizer A middle
    this.div_a_mid.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onEqualizerAMiddle(value); }); });
    // Equalizer A low
    this.div_a_low.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onEqualizerALow(value); }); });
    // A filter
    this.div_a_lpfhpf.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.uicontroller.onAFilter(value); }); });
    // Fader A input
    this.div_a_input.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onFaderAInput(value); }); });

    // B
    this.div_b.addEventListener("wheel", (event) => { this.onWheelBSearch(event); });
    // Fader B pitch
    this.div_b_pitch.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.uicontroller.onFaderBPitch(value); }); });
    // B gain/trim
    this.div_b_gain.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onBGain(value); }); });
    // Equalizer B high
    this.div_b_hi.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onEqualizerBHigh(value); }); });
    // Equalizer B middle
    this.div_b_mid.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onEqualizerBMiddle(value); }); });
    // Equalizer B low
    this.div_b_low.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onEqualizerBLow(value); }); });
    // B filter
    this.div_b_lpfhpf.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.uicontroller.onBFilter(value); }); });
    // Fader B input
    this.div_b_input.addEventListener("wheel", (event) => { this.onMoveInputRange(event, (value) => { this.audioprocess.onFaderBInput(value); }); });

    // Document
    document.addEventListener("keydown", (event) => { this.onDocumentKeyDown(event); });
    document.addEventListener("keyup", (event) => { this.onDocumentKeyUp(event); });

    // Idea of making json easy
    // for(let item in this.json) {
    //   if(this.json[item] === "browse") this.json[item] = { downfunction:(event) => { this.uicontroller.onClickBrowseButton(); }, upfunction:(event) => {  } };
    // }
  }

  audioprocess;
  uicontroller;
  midicontroller;

  key_buffer = {};
  json = {
    KeyA:     { downfunction:(event) => { this.uicontroller.onMouseDownACue(); }, upfunction:(event) => { this.uicontroller.onMouseUpACue(); } }, // A Cue
    KeyB:     { downfunction:(event) => { event.target.value=7;this.uicontroller.onClickAPad(event); }, upfunction:(event) => {  } }, // PAD A8
    KeyC:     { downfunction:(event) => { event.target.value=5;this.uicontroller.onClickAPad(event); }, upfunction:(event) => {  } }, // PAD A6
    KeyD:     { downfunction:(event) => { event.target.value=1;this.uicontroller.onClickAPad(event); }, upfunction:(event) => {  } }, // PAD A2
    KeyF:     { downfunction:(event) => { event.target.value=2;this.uicontroller.onClickAPad(event); }, upfunction:(event) => {  } }, // PAD A3
    KeyG:     { downfunction:(event) => { event.target.value=3;this.uicontroller.onClickAPad(event); }, upfunction:(event) => {  } }, // PAD A4
    KeyH:     { downfunction:(event) => { this.uicontroller.onMouseDownBCue(); }, upfunction:(event) => { this.uicontroller.onMouseUpBCue(); } }, // B Cue
    KeyJ:     { downfunction:(event) => { event.target.value=0;this.uicontroller.onClickBPad(event); }, upfunction:(event) => {  } }, // PAD B1
    KeyK:     { downfunction:(event) => { event.target.value=1;this.uicontroller.onClickBPad(event); }, upfunction:(event) => {  } }, // PAD B2
    KeyL:     { downfunction:(event) => { event.target.value=2;this.uicontroller.onClickBPad(event); }, upfunction:(event) => {  } }, // PAD B3
    KeyM:     { downfunction:(event) => { event.target.value=4;this.uicontroller.onClickBPad(event); }, upfunction:(event) => {  } }, // PAD B5
    KeyN:     { downfunction:(event) => { this.uicontroller.onClickBPlay(); }, upfunction:(event) => {  } }, // B Play
    KeyR:     { downfunction:(event) => { this.onChangeAMonitorCue(event); }, upfunction:(event) => {  } }, // A Monitor cue
    KeyS:     { downfunction:(event) => { event.target.value=0;this.uicontroller.onClickAPad(event); }, upfunction:(event) => {  } }, // PAD A1
    KeyT:     { downfunction:(event) => { this.uicontroller.onLoadADeck(); }, upfunction:(event) => {  } }, // A Load
    KeyU:     { downfunction:(event) => { this.onChangeBMonitorCue(event); }, upfunction:(event) => {  } }, // B Monitor cue
    KeyV:     { downfunction:(event) => { event.target.value=6;this.uicontroller.onClickAPad(event); }, upfunction:(event) => {  } }, // PAD A7
    KeyW:     { downfunction:(event) => { this.uicontroller.onClickBrowseButton(); }, upfunction:(event) => {  } }, // Browse
    KeyX:     { downfunction:(event) => { event.target.value=4;this.uicontroller.onClickAPad(event); }, upfunction:(event) => {  } }, // PAD A5
    KeyY:     { downfunction:(event) => { this.uicontroller.onLoadBDeck(); }, upfunction:(event) => {  } }, // B Load
    KeyZ:     { downfunction:(event) => { this.uicontroller.onClickAPlay(); }, upfunction:(event) => {  } }, // A Play
    Semicolon:{ downfunction:(event) => { event.target.value=3;this.uicontroller.onClickBPad(event); }, upfunction:(event) => {  } }, // PAD B4
    Comma:    { downfunction:(event) => { event.target.value=5;this.uicontroller.onClickBPad(event); }, upfunction:(event) => {  } }, // PAD B6
    Period:   { downfunction:(event) => { event.target.value=6;this.uicontroller.onClickBPad(event); }, upfunction:(event) => {  } }, // PAD B7
    Slash:    { downfunction:(event) => { event.target.value=7;this.uicontroller.onClickBPad(event); }, upfunction:(event) => {  } }, // PAD B8
  };

  onMoveInputRange(event, fn) {
    let input;
    // Wheel on input
    if(event.target.tagName == "INPUT") input = event.target;
    // Wheel on div
    else if(event.target.tagName == "DIV") input = event.target.getElementsByTagName("input")[0];
    else return;
    // For pitch fader (Because they are on the A/B deck)
    event.stopPropagation();
    // Move range fader
    event.deltaY>0?input.value++:input.value--;
    // Execute audio process
    fn(input.value);
  }

  onChangeAMonitorCue(event) {
    // Input chkbox A monitor cue
    let input = document.getElementsByTagName("input")[11];
    // Alternate
    input.checked=!input.checked;
    // Execute audio process
    this.audioprocess.onChangeAMonitorCue(input.checked);
  }

  onChangeBMonitorCue(event) {
    // Input chkbox B monitor cue
    let input = document.getElementsByTagName("input")[20];
    // Alternate
    input.checked=!input.checked;
    // Execute audio process
    this.audioprocess.onChangeBMonitorCue(input.checked);
  }

  onDocumentKeyDown(event) {
    // Execute on the time when key state change
    if(this.key_buffer[event.code] !== true) {
      // save key state
      this.key_buffer[event.code] = true;
      // Execute target down function
      if(event.code in this.json) this.json[event.code].downfunction(event);
    }
  };

  onDocumentKeyUp(event) {
    // Execute on the time when key state change
    if(this.key_buffer[event.code] !== false) {
      // save key state
      this.key_buffer[event.code] = false;
      // Execute target up function
      if(event.code in this.json) this.json[event.code].upfunction(event);
    }
  }

  onWheelASearch(event) {
    let a_audio = event.target.getElementsByTagName("audio")[0];
    let value = event.deltaY>0?0x41:0x3F;
    if(0x01<=value && value<=0x20) {
      // 01->20
      a_audio.currentTime+=((value - 0x00)/3);
    } else if(0x7F>=value && value>=0x61) {
      // 7F->61
      a_audio.currentTime-=((0x80 - value)/3);
    } else if(0x41<=value && value<=0x60) {
      // 41->60
      // Save performance.now
      if(this.a_unit_interval_f === 0) this.a_unit_interval_f = performance.now();
      else {
        // Calculate interval time
        let interval = performance.now() - this.a_unit_interval_f;
        // Max playback rate is 2.0 min playback rate is 0.5
        interval = Math.max(Math.min(interval, 200), 50);
        // Reference value is 100ms
        let playbackRate = 100/interval;
        // Play search sound
        this.audioprocess.onSearchAForward(a_audio.currentTime, 100, playbackRate);
        // Save performance.now
        this.a_unit_interval_f = performance.now();
        // Advance current time 100ms
        a_audio.currentTime+=100/1000;
      }
    } else if(0x3F>=value && value>=0x21) {
      // 3F->21
      // Save performance.now
      if(this.a_unit_interval_b === 0) this.a_unit_interval_b = performance.now();
      else {
        // Calculate interval time
        let interval = performance.now() - this.a_unit_interval_b;
        // Max playback rate is 2.0 min playback rate is 0.5
        interval = Math.max(Math.min(interval, 200), 50);
        // Reference value is 100ms
        let playbackRate = 100/interval;
        // Play search sound
        this.audioprocess.onSearchABackward(a_audio.currentTime, 100, playbackRate);
        // Save performance.now
        this.a_unit_interval_b = performance.now();
        // Regress current time 100ms
        a_audio.currentTime-=100/1000;
      }
    }
  }

  onWheelBSearch(event) {
    let b_audio = event.target.getElementsByTagName("audio")[0];
    let value = event.deltaY>0?0x41:0x3F;
    if(0x01<=value && value<=0x20) {
      // 01->20
      b_audio.currentTime+=((value - 0x00)/3);
    } else if(0x7F>=value && value>=0x61) {
      // 7F->61
      b_audio.currentTime-=((0x80 - value)/3);
    } else if(0x41<=value && value<=0x60) {
      // 41->60
      // Save performance.now
      if(this.b_unit_interval_f === 0) this.b_unit_interval_f = performance.now();
      else {
        // Calculate interval time
        let interval = performance.now() - this.b_unit_interval_f;
        // Max playback rate is 2.0 min playback rate is 0.5
        interval = Math.max(Math.min(interval, 200), 50);
        // Reference value is 100ms
        let playbackRate = 100/interval;
        // Play search sound
        this.audioprocess.onSearchBForward(b_audio.currentTime, 100, playbackRate);
        // Save performance.now
        this.b_unit_interval_f = performance.now();
        // Advance current time 100ms
        b_audio.currentTime+=100/1000;
      }
    } else if(0x3F>=value && value>=0x21) {
      // 3F->21
      // Save performance.now
      if(this.b_unit_interval_b === 0) this.b_unit_interval_b = performance.now();
      else {
        // Calculate interval time
        let interval = performance.now() - this.b_unit_interval_b;
        // Max playback rate is 2.0 min playback rate is 0.5
        interval = Math.max(Math.min(interval, 200), 50);
        // Reference value is 100ms
        let playbackRate = 100/interval;
        // Play search sound
        this.audioprocess.onSearchBBackward(b_audio.currentTime, 100, playbackRate);
        // Save performance.now
        this.b_unit_interval_b = performance.now();
        // Regress current time 100ms
        b_audio.currentTime-=100/1000;
      }
    }
  }
}