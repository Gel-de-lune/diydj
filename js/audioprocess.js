class AudioProcess {
  constructor() {
  }

  createAudioContext() {
    this.ctx = new AudioContext();
    // Master volume
    this.master_volume = this.ctx.createGain();
    // Monitor volume
    this.monitor_volume = this.ctx.createGain();

    // A audio
    const a_audio = document.getElementsByTagName("audio")[0];
    // A media element source node
    this.a_mediaElementSourceNode = this.ctx.createMediaElementSource(a_audio);
    // A gain/trim
    this.a_gain = this.ctx.createGain();
    // Equalizer A high 
    this.eq_a_hi = this.ctx.createBiquadFilter();
    this.eq_a_hi.type = "highshelf";
    this.eq_a_hi.frequency.value = 2000;  // 2kHz
    // Equalizer A middle
    this.eq_a_mid = this.ctx.createBiquadFilter();
    this.eq_a_mid.type = "peaking";
    this.eq_a_mid.frequency.value = 1000; // 1kHz
    this.eq_a_mid.Q.value = Math.SQRT1_2;
    // Equalizer A low
    this.eq_a_lo = this.ctx.createBiquadFilter();
    this.eq_a_lo.type = "lowshelf";
    this.eq_a_lo.frequency.value = 500;   // 500Hz
    // Fader A input
    this.fader_a_input = this.ctx.createGain();
    // Fader A cross
    this.fader_a_cross = this.ctx.createGain();
    this.fader_a_cross.gain.value = Math.cos(0.5*0.5*Math.PI);  // Initial value

    // Connect audio route
    this.a_mediaElementSourceNode.connect(this.a_gain)
    .connect(this.fader_a_input)
    .connect(this.eq_a_hi)
    .connect(this.eq_a_mid)
    .connect(this.eq_a_lo)
    .connect(this.monitor_volume);

    this.eq_a_lo.connect(this.fader_a_cross)
    .connect(this.master_volume);

    // B audio
    const b_audio = document.getElementsByTagName("audio")[1];
    // B media element source node
    this.b_mediaElementSourceNode = this.ctx.createMediaElementSource(b_audio);
    // B gain/trim
    this.b_gain = this.ctx.createGain();
    // Fader B input
    this.fader_b_input = this.ctx.createGain();
    // Equalizer B high 
    this.eq_b_hi = this.ctx.createBiquadFilter();
    this.eq_b_hi.type = "highshelf";
    this.eq_b_hi.frequency.value = 2000;  // 2kHz
    // Equalizer B middle
    this.eq_b_mid = this.ctx.createBiquadFilter();
    this.eq_b_mid.type = "peaking";
    this.eq_b_mid.frequency.value = 1000; // 1kHz
    this.eq_b_mid.Q.value = Math.SQRT1_2;
    // Equalizer B low
    this.eq_b_lo = this.ctx.createBiquadFilter();
    this.eq_b_lo.type = "lowshelf";
    this.eq_b_lo.frequency.value = 500;   // 500Hz
    // Fader B cross
    this.fader_b_cross = this.ctx.createGain();
    this.fader_b_cross.gain.value = Math.cos(0.5*0.5*Math.PI);  // Initial value

    // Connect audio route
    this.b_mediaElementSourceNode.connect(this.b_gain)
    .connect(this.fader_b_input)
    .connect(this.eq_b_hi)
    .connect(this.eq_b_mid)
    .connect(this.eq_b_lo)
    .connect(this.monitor_volume);

    this.eq_b_lo.connect(this.fader_b_cross)
    .connect(this.master_volume);

    // connect master to destination
    this.master_volume.connect(this.ctx.destination);
  }

  onCrossFader(value) {
    this.fader_a_cross.gain.value = Math.cos(value/127*0.5*Math.PI);
    this.fader_b_cross.gain.value = Math.cos((1-value/127)*0.5*Math.PI);
  }

  onAGain(value) {
    this.a_gain.gain.value = value * 3.4 / 127;
  }

  onFaderAInput(value) {
    this.fader_a_input.gain.value = Math.cos((1-value/127)*0.5*Math.PI);
  }

  onEqualizerAHigh(value) {
    this.eq_a_hi.gain.value = (value / 64 - 1) * 40;
  }

  onEqualizerAMiddle(value) {
    this.eq_a_mid.gain.value = (value / 64 - 1) * 40;
  }

  onEqualizerALow(value) {
    this.eq_a_lo.gain.value = (value / 64 - 1) * 40;
  }

  onBGain(value) {
    this.b_gain.gain.value = value * 3.4 / 127;
  }

  onFaderBInput(value) {
    this.fader_b_input.gain.value = Math.cos((1-value/127)*0.5*Math.PI);
  }

  onEqualizerBHigh(value) {
    this.eq_b_hi.gain.value = (value / 64 - 1) * 40;
  }

  onEqualizerBMiddle(value) {
    this.eq_b_mid.gain.value = (value / 64 - 1) * 40;
  }

  onEqualizerBLow(value) {
    this.eq_b_lo.gain.value = (value / 64 - 1) * 40;
  }

  onMasterVolume(value) {
    this.master_volume.gain.value = value / 127;
  }
}