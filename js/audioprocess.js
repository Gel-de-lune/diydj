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
    // A sample array
    this.sample_a = [];
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
    // Highpass filter
    this.a_hpf = this.ctx.createBiquadFilter();
    this.a_hpf.type = "highpass";
    this.a_hpf.frequency.value = 0;
    // Lowpass filter
    this.a_lpf = this.ctx.createBiquadFilter();
    this.a_lpf.type = "lowpass";
    this.a_lpf.frequency.value = this.ctx.sampleRate / 2; // Nyquist frequency
    // Fader A input
    this.fader_a_input = this.ctx.createGain();
    // Fader A cross
    this.fader_a_cross = this.ctx.createGain();
    this.fader_a_cross.gain.value = Math.cos(0.5*0.5*Math.PI);  // Initial value

    // Connect audio route
    this.a_mediaElementSourceNode.connect(this.a_gain)
    .connect(this.eq_a_hi)
    .connect(this.eq_a_mid)
    .connect(this.eq_a_lo)
    // .connect(this.monitor_volume);

    this.eq_a_lo.connect(this.a_hpf)
    .connect(this.a_lpf)
    .connect(this.fader_a_input)
    .connect(this.fader_a_cross)
    .connect(this.master_volume);

    // B audio
    const b_audio = document.getElementsByTagName("audio")[1];
    // B media element source node
    this.b_mediaElementSourceNode = this.ctx.createMediaElementSource(b_audio);
    // B sample array
    this.sample_b = [];
    // B gain/trim
    this.b_gain = this.ctx.createGain();
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
    // Highpass filter
    this.b_hpf = this.ctx.createBiquadFilter();
    this.b_hpf.type = "highpass";
    this.b_hpf.frequency.value = 0;
    // Lowpass filter
    this.b_lpf = this.ctx.createBiquadFilter();
    this.b_lpf.type = "lowpass";
    this.b_lpf.frequency.value = this.ctx.sampleRate / 2; // Nyquist frequency
    // Fader B input
    this.fader_b_input = this.ctx.createGain();
    // Fader B cross
    this.fader_b_cross = this.ctx.createGain();
    this.fader_b_cross.gain.value = Math.cos(0.5*0.5*Math.PI);  // Initial value

    // Connect audio route
    this.b_mediaElementSourceNode.connect(this.b_gain)
    .connect(this.eq_b_hi)
    .connect(this.eq_b_mid)
    .connect(this.eq_b_lo)
    // .connect(this.monitor_volume);

    this.eq_b_lo.connect(this.b_hpf)
    .connect(this.b_lpf)
    .connect(this.fader_b_input)
    .connect(this.fader_b_cross)
    .connect(this.master_volume);

    // Master and monitor audio routing
    this.splitter_monitor = this.ctx.createChannelSplitter(2);
    this.splitter_master = this.ctx.createChannelSplitter(2);
    if(this.ctx.destination.maxChannelCount === 2) {
      // In case 2ch
      const monitor_merger = this.ctx.createChannelMerger(2);
      // Connect A audio to left ch
      const splitter_a = this.ctx.createChannelSplitter(2);
      this.eq_a_lo.connect(splitter_a);
      splitter_a.connect(monitor_merger, 0, 0);
      // Connect B audio to right ch
      const splitter_b = this.ctx.createChannelSplitter(2);
      this.eq_b_lo.connect(splitter_b);
      splitter_b.connect(monitor_merger, 1, 1);
      // Connect monitor merger to monitor
      monitor_merger.connect(this.monitor_volume);

      this.merger = this.ctx.createChannelMerger(2);
      // Don't connect monitor to stereo(0,1) ch until monitor cue checkbox is checked
      this.monitor_volume.connect(this.splitter_monitor);
      // Connect master to stereo(0,1) ch
      this.master_volume.connect(this.splitter_master);
      this.splitter_master.connect(this.merger, 0, 0);
      this.splitter_master.connect(this.merger, 1, 1);
    } else if(this.ctx.destination.maxChannelCount === 4) {
      // In case 4ch
      this.ctx.destination.channelCount = 4;

      this.merger = this.ctx.createChannelMerger(4);
      // Connect master to front(0,1) ch
      this.master_volume.connect(this.splitter_master);
      this.splitter_master.connect(this.merger, 0, 0);
      this.splitter_master.connect(this.merger, 1, 1);
      // Connect monitor to rear(2,3) ch
      this.monitor_volume.connect(this.splitter_monitor);
      this.splitter_monitor.connect(this.merger, 0, 2);
      this.splitter_monitor.connect(this.merger, 1, 3);
    }
    this.merger.connect(this.ctx.destination);
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

  onFilterAHighpass(value) {
    // 0 to Nyquist freq increase by 19/20 base exponent
    this.a_hpf.frequency.value = (value === 0 ? 0 : (19/20) ** (127 - value)) * (this.ctx.sampleRate / 2);
  }

  onFilterALowpass(value) {
    // Nyquist freq to 0 decrease by 19/20 base exponent
    this.a_lpf.frequency.value = ((19/20) ** value) * (this.ctx.sampleRate / 2);
  }

  onChangeAMonitorCue(checked) {
    if(this.ctx.destination.maxChannelCount === 2) {
      // In case 2ch
      if(checked) {
        // Disconnect master left ch from stereo left ch
        this.splitter_master.disconnect(this.merger, 0, 0);
        // Connect monitor left ch to stereo left ch
        this.splitter_monitor.connect(this.merger, 0, 0);
      } else {
        // Disconnect monitor left ch from stereo left ch
        this.splitter_monitor.disconnect(this.merger, 0, 0);
        // Connect master left ch to stereo left ch
        this.splitter_master.connect(this.merger, 0, 0);
      }
    } else if(this.ctx.destination.maxChannelCount === 4) {
      // In case 4ch
      if(checked) {
        // Connect A audio to monitor
        this.eq_a_lo.connect(this.monitor_volume);
      } else {
        // Disconnect A audio from monitor
        this.eq_a_lo.disconnect(this.monitor_volume);
      }
    }
  }

  onOneShotAPadSample(index) {
    // Playback target index sample in sample_a array
    let source_node = this.ctx.createBufferSource();
    source_node.buffer = this.sample_a[index];
    source_node.connect(this.ctx.destination);
    source_node.start(0);
  }

  onRegisterAPadSample(arrayBuffer, index) {
    // Register target index sample to sample_a array
    this.ctx.decodeAudioData(arrayBuffer)
    .then((buffer) => { this.sample_a[index] = buffer; })
    .catch((message) => { console.log(message); });
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

  onFilterBHighpass(value) {
    // 0 to Nyquist freq increase by 19/20 base exponent
    this.b_hpf.frequency.value = (value === 0 ? 0 :(19/20) ** (127 - value)) * (this.ctx.sampleRate / 2);
  }

  onFilterBLowpass(value) {
    // Nyquist freq to 0 decrease by 19/20 base exponent
    this.b_lpf.frequency.value = ((19/20) ** value) * (this.ctx.sampleRate / 2);
  }

  onChangeBMonitorCue(checked) {
    if(this.ctx.destination.maxChannelCount === 2) {
      // In case 2ch
      if(checked) {
        // Disconnect master right ch from stereo right ch
        this.splitter_master.disconnect(this.merger, 1, 1);
        // Connect monitor right ch to stereo right ch
        this.splitter_monitor.connect(this.merger, 1, 1);
      } else {
        // Disconnect monitor right ch from stereo right ch
        this.splitter_monitor.disconnect(this.merger, 1, 1);
        // Connect master right ch to stereo right ch
        this.splitter_master.connect(this.merger, 1, 1);
      }
    } else if(this.ctx.destination.maxChannelCount === 4) {
      // In case 4ch
      if(checked) {
        // Connect B audio to monitor
        this.eq_b_lo.connect(this.monitor_volume);
      } else {
        // Disconnect B audio from monitor
        this.eq_b_lo.disconnect(this.monitor_volume);
      }
    }
  }

  onOneShotBPadSample(index) {
    // Playback target index sample in sample_b array
    let source_node = this.ctx.createBufferSource();
    source_node.buffer = this.sample_b[index];
    source_node.connect(this.ctx.destination);
    source_node.start(0);
  }

  onRegisterBPadSample(arrayBuffer, index) {
    // Register target index sample to sample_b array
    this.ctx.decodeAudioData(arrayBuffer)
    .then((buffer) => { this.sample_b[index] = buffer; })
    .catch((message) => { console.log(message); });
  }

  onMasterVolume(value) {
    this.master_volume.gain.value = value / 127;
  }

  onMonitorVolume(value) {
    this.monitor_volume.gain.value = value / 127;
  }
}