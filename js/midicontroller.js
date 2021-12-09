class MidiController {
  constructor() {
    // Request MIDI access
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
      .then((access) => { this.onAccessSuccess(access); })
      .catch((message) => { console.log(message); });
    }

    for(let feature of this.feature_list) {
      if(!(feature in this.json)) {
        this.json[feature] = { status: null, data1: null };
      }
      if(!(feature in this.json2)) {
        this.json2[feature] = { status: null, data1: null };
      }
      if(!(feature in this.json3)) {
        this.json3[feature] = { status: null, data1: null };
      }
    }
  
  }

  feature_list = [
    "master",
    "monitor",
    "browse",
    "cross",
    "a_load",
    "a_monitorcue",
    "a_play",
    "a_cue",
    "a_inputfader",
    "a_pitch",
    "a_gain",
    "a_hi",
    "a_mid",
    "a_lo",
    "a_touchwheel",
    "b_load",
    "b_monitorcue",
    "b_play",
    "b_cue",
    "b_inputfader",
    "b_pitch",
    "b_gain",
    "b_hi",
    "b_mid",
    "b_lo",
    "b_touchwheel"
  ];

  json = {
    manufacturer: "KORG, Inc.",
    input_name: "KAOSS DJ",
    output_name: "KAOSS DJ",
    // Common
    shift_browse: { status: 0x96, data1: 0x07, off: 0x00, on: 0x7F },
    tap: { status: 0x96, data1: 0x0B, off: 0x00, on: 0x7F },
    touchpadmode: { status: 0x96, data1: 0x22, off:0x00, on: 0x7F }, // long press toggle
    touchpad_tl: { status: 0x96, data1: 0x4A, off: 0x00, on: 0x7F},
    touchpad_tr: { status: 0x96, data1: 0x4B, off: 0x00, on: 0x7F},
    touchpad_bl: { status: 0x96, data1: 0x4C, off: 0x00, on: 0x7F},
    touchpad_br: { status: 0x96, data1: 0x4D, off: 0x00, on: 0x7F},
    browse: { status: 0xB6, data1: 0x1E, right: 0x01, left: 0x7F },
    program: { status: 0xB6, data1: 0x1F, right: 0x01, left: 0x7F },
    cross: { status: 0xB6, data1: 0x17, min: 0x00, max: 0x7F },
    // A
    a_load: { status: 0x97, data1: 0x0E, off: 0x00, on: 0x7F },
    a_loopin: { status: 0x97, data1: 0x0F, off: 0x00, on: 0x7F },
    a_looponoff: { status: 0x97, data1: 0x10, off: 0x00, on: 0x7F },
    a_loopout: { status: 0x97, data1: 0x11, off: 0x00, on: 0x7F },
    a_hotcue1: { status: 0x97, data1: 0x12, off: 0x00, on: 0x7F },
    a_hotcue2: { status: 0x97, data1: 0x13, off: 0x00, on: 0x7F },
    a_hotcue3: { status: 0x97, data1: 0x14, off: 0x00, on: 0x7F },
    a_pitch_minus: { status: 0x97, data1: 0x15, off: 0x00, on: 0x7F },
    a_search: { status: 0x97, data1: 0x16, off: 0x00, on: 0x7F },  // toggle
    a_pitch_plus: { status: 0x97, data1: 0x17, off: 0x00, on: 0x7F },
    a_fx: { status: 0x97, data1: 0x18, off: 0x00, on: 0x7F }, // toggle
    a_monitorcue: { status: 0x97, data1: 0x19, off: 0x00, on: 0x7F },
    a_shift: { status: 0x97, data1: 0x1A, off: 0x00, on: 0x7F },
    a_play: { status: 0x97, data1: 0x1B, off: 0x00, on: 0x7F },
    a_sync: { status: 0x97, data1: 0x1D, off: 0x00, on: 0x7F },
    a_cue: { status: 0x97, data1: 0x1E, off: 0x00, on: 0x7F },
    a_touchwheel: { status: 0x97, data1: 0x1F, off: 0x00, on: 0x7F },
    a_shiftplay: { status: 0x97, data1: 0x2E, off: 0x00, on: 0x7F },
    a_shiftsync: { status: 0x97, data1: 0x2F, off: 0x00, on: 0x7F },
    a_shiftcue: { status: 0x97, data1: 0x30, off: 0x00, on: 0x7F },
    a_loopshiftin: { status: 0x97, data1: 0x28, off: 0x00, on: 0x7F },
    a_loopshiftonoff: { status: 0x97, data1: 0x29, off: 0x00, on: 0x7F },
    a_loopshiftout: { status: 0x97, data1: 0x2A, off: 0x00, on: 0x7F },
    a_shifthotcue1: { status: 0x97, data1: 0x2B, off: 0x00, on: 0x7F },
    a_shifthotcue2: { status: 0x97, data1: 0x2C, off: 0x00, on: 0x7F },
    a_shifthotcue3: { status: 0x97, data1: 0x2D, off: 0x00, on: 0x7F },
    a_touchpad_x: { status: 0xB7, data1: 0x0C, min: 0x00, max: 0x7F },
    a_touchpad_y: { status: 0xB7, data1: 0x0D, min: 0x00, max: 0x7F },
    a_touchwheel_xy: { status: 0xB7, data1: 0x0E, right: { slow: 0x01, midium: 0x02, fast: 0x03 }, left: { slow: 0x7F, midium: 0x7E, fast: 0x7D } },
    a_shiftwheel_xy: { status: 0xB7, data1: 0x0F, right: { slow: 0x01, midium: 0x02, fast: 0x03 }, left: { slow: 0x7F, midium: 0x7E, fast: 0x7D } },
    a_search_xy: { status: 0xB7, data1: 0x10, right: { slow: 0x01, midium: 0x02, fast: 0x03 }, left: { slow: 0x7F, midium: 0x7E, fast: 0x7D } },
    a_inputfader: { status: 0xB7, data1: 0x18, min: 0x00, max: 0x7F },
    a_pitch: { status: 0xB7, data1: 0x19, min: 0x00, max: 0x7F },
    a_gain: { status: 0xB7, data1: 0x1A, min: 0x00, max: 0x7F },
    a_hi: { status: 0xB7, data1: 0x1B, min: 0x00, max: 0x7F },
    a_mid: { status: 0xB7, data1: 0x1C, min: 0x00, max: 0x7F },
    a_lo: { status: 0xB7, data1: 0x1D, min: 0x00, max: 0x7F },
    a_slidervalue: { status: 0xB7, data1: 0x21, min: 0x00, max: 0x7F }, // with shift
    // B
    b_load: { status: 0x98, data1: 0x0E, off: 0x00, on: 0x7F },
    b_loopin: { status: 0x98, data1: 0x0F, off: 0x00, on: 0x7F },
    b_looponoff: { status: 0x98, data1: 0x10, off: 0x00, on: 0x7F },
    b_loopout: { status: 0x98, data1: 0x11, off: 0x00, on: 0x7F },
    b_hotcue1: { status: 0x98, data1: 0x12, off: 0x00, on: 0x7F },
    b_hotcue2: { status: 0x98, data1: 0x13, off: 0x00, on: 0x7F },
    b_hotcue3: { status: 0x98, data1: 0x14, off: 0x00, on: 0x7F },
    b_pitch_minus: { status: 0x98, data1: 0x15, off: 0x00, on: 0x7F },
    b_search: { status: 0x98, data1: 0x16, off: 0x00, on: 0x7F },  // toggle
    b_pitch_plus: { status: 0x98, data1: 0x17, off: 0x00, on: 0x7F },
    b_fx: { status: 0x98, data1: 0x18, off: 0x00, on: 0x7F }, // toggle
    b_monitorcue: { status: 0x98, data1: 0x19, off: 0x00, on: 0x7F },
    b_shift: { status: 0x98, data1: 0x1A, off: 0x00, on: 0x7F },
    b_play: { status: 0x98, data1: 0x1B, off: 0x00, on: 0x7F },
    b_sync: { status: 0x98, data1: 0x1D, off: 0x00, on: 0x7F },
    b_cue: { status: 0x98, data1: 0x1E, off: 0x00, on: 0x7F },
    b_touchwheel: { status: 0x98, data1: 0x1F, off: 0x00, on: 0x7F },
    b_shiftplay: { status: 0x98, data1: 0x2E, off: 0x00, on: 0x7F },
    b_shiftsync: { status: 0x98, data1: 0x2F, off: 0x00, on: 0x7F },
    b_shiftcue: { status: 0x98, data1: 0x30, off: 0x00, on: 0x7F },
    b_loopshiftin: { status: 0x98, data1: 0x28, off: 0x00, on: 0x7F },
    b_loopshiftonoff: { status: 0x98, data1: 0x29, off: 0x00, on: 0x7F },
    b_loopshiftout: { status: 0x98, data1: 0x2A, off: 0x00, on: 0x7F },
    b_shifthotcue1: { status: 0x98, data1: 0x2B, off: 0x00, on: 0x7F },
    b_shifthotcue2: { status: 0x98, data1: 0x2C, off: 0x00, on: 0x7F },
    b_shifthotcue3: { status: 0x98, data1: 0x2D, off: 0x00, on: 0x7F },
    b_touchpad_x: { status: 0xB8, data1: 0x0C, min: 0x00, max: 0x7F },
    b_touchpad_y: { status: 0xB8, data1: 0x0D, min: 0x00, max: 0x7F },
    b_touchwheel_xy: { status: 0xB8, data1: 0x0E, right: { slow: 0x01, midium: 0x02, fast: 0x03 }, left: { slow: 0x7F, midium: 0x7E, fast: 0x7D } },
    b_shiftwheel_xy: { status: 0xB8, data1: 0x0F, right: { slow: 0x01, midium: 0x02, fast: 0x03 }, left: { slow: 0x7F, midium: 0x7E, fast: 0x7D } },
    b_search_xy: { status: 0xB8, data1: 0x10, right: { slow: 0x01, midium: 0x02, fast: 0x03 }, left: { slow: 0x7F, midium: 0x7E, fast: 0x7D } },
    b_inputfader: { status: 0xB8, data1: 0x18, min: 0x00, max: 0x7F },
    b_pitch: { status: 0xB8, data1: 0x19, min: 0x00, max: 0x7F },
    b_gain: { status: 0xB8, data1: 0x1A, min: 0x00, max: 0x7F },
    b_hi: { status: 0xB8, data1: 0x1B, min: 0x00, max: 0x7F },
    b_mid: { status: 0xB8, data1: 0x1C, min: 0x00, max: 0x7F },
    b_lo: { status: 0xB8, data1: 0x1D, min: 0x00, max: 0x7F },
    b_slidervalue: { status: 0xB8, data1: 0x21, min: 0x00, max: 0x7F }, // with shift
  };
  json2 = {
    manufacturer: "Microsoft Corporation",
    input_name: "Casio MIDI In",
    output_name: "Casio MIDI Out",
    // Common
    cross: { status: 0xB1, data1: 0x10, min: 0x00, max: 0x7F },
    master: { status: 0xB1, data1: 0x11, min: 0x00, max: 0x7F },
    b_filter: { status: 0xB1, data1: 0x13, min: 0x00, max: 0x7F },
    fx_param: { status: 0xB0, data1: 0x10, min: 0x00, max: 0x7F },
    monitor: { status: 0xB0, data1: 0x12, min: 0x00, max: 0x7F },
    a_filter: { status: 0xB0, data1: 0x13, min: 0x00, max: 0x7F },
    // A
    a_shift: { status: 0x90, data1: 0x2E, off: 0x00, on: 0x7F },
    a_sync: { status: 0x90, data1: 0x2D, off: 0x00, on: 0x7F },
    a_cue: { status: 0x90, data1: 0x2C, off: 0x00, on: 0x7F },
    a_set: { status: 0x90, data1: 0x2B, off: 0x00, on: 0x7F },
    a_play: { status: 0x90, data1: 0x2A, off: 0x00, on: 0x7F },
    a_hotcue1: { status: 0x90, data1: 0x29, off: 0x00, on: 0x7F },
    a_hotcue2: { status: 0x90, data1: 0x28, off: 0x00, on: 0x7F },
    a_hotcue3: { status: 0x90, data1: 0x27, off: 0x00, on: 0x7F },
    a_select: { status: 0x90, data1: 0x26, off: 0x00, on: 0x7F },
    a_looptwice: { status: 0x90, data1: 0x25, off: 0x00, on: 0x7F },
    a_loop: { status: 0x90, data1: 0x24, off: 0x00, on: 0x7F },
    a_loophalf: { status: 0x90, data1: 0x23, off: 0x00, on: 0x7F },
    a_fxright: { status: 0x90, data1: 0x22, off: 0x00, on: 0x7F },
    a_fx: { status: 0x90, data1: 0x21, off: 0x00, on: 0x7F },
    a_fxleft: { status: 0x90, data1: 0x20, off: 0x00, on: 0x7F },
    a_touchwheel: {status: 0x90, data1: 0x3B, off: 0x00, on: 0x7F },
    a_touchwheel_xy: {status: 0xB2, data1: 0x10, right: { slow: 0x41, midium: 0x42, fast: 0x43 }, left: { slow: 0x3F, midium: 0x3E, fast: 0x3D } },
    // B
    b_shift: { status: 0x91, data1: 0x2E, off: 0x00, on: 0x7F },
    b_sync: { status: 0x91, data1: 0x2D, off: 0x00, on: 0x7F },
    b_cue: { status: 0x91, data1: 0x2C, off: 0x00, on: 0x7F },
    b_set: { status: 0x91, data1: 0x2B, off: 0x00, on: 0x7F },
    b_play: { status: 0x91, data1: 0x2A, off: 0x00, on: 0x7F },
    b_hotcue1: { status: 0x91, data1: 0x29, off: 0x00, on: 0x7F },
    b_hotcue2: { status: 0x91, data1: 0x28, off: 0x00, on: 0x7F },
    b_hotcue3: { status: 0x91, data1: 0x27, off: 0x00, on: 0x7F },
    b_select: { status: 0x91, data1: 0x26, off: 0x00, on: 0x7F },
    b_looptwice: { status: 0x91, data1: 0x25, off: 0x00, on: 0x7F },
    b_loop: { status: 0x91, data1: 0x24, off: 0x00, on: 0x7F },
    b_loophalf: { status: 0x91, data1: 0x23, off: 0x00, on: 0x7F },
    b_fxright: { status: 0x91, data1: 0x22, off: 0x00, on: 0x7F },
    b_fx: { status: 0x91, data1: 0x21, off: 0x00, on: 0x7F },
    b_fxleft: { status: 0x91, data1: 0x20, off: 0x00, on: 0x7F },
    b_touchwheel: { status: 0x91, data1: 0x3B, off: 0x00, on: 0x7F },
    b_touchwheel_xy: { status: 0xB2, data1: 0x11, right: { slow: 0x41, midium: 0x42, fast: 0x43 }, left: { slow: 0x3F, midium: 0x3E, fast: 0x3D } },
  }
  json3 = {
    manufacturer: "",
    input_name: "DDJ-SB3",
    output_name: "DDJ-SB3",
    // Common
    browse_btn: { status: 0x96, data1: 0x41, off: 0x00, on: 0x7F },
    master_cue: { status: 0x96, data1: 0x5B, off: 0x00, on: 0x7F },
    master: { status: 0xB6, data1: 0x08, min: 0x00, max: 0x7F }, // MSB
    // master: { status: 0xB6, data1: 0x28, min: 0x00, max: 0x7F }, // LSB
    monitor: { status: 0xB6, data1: 0x0D, min: 0x00, max: 0x7F }, // MSB
    // monitor: { status: 0xB6, data1: 0x2D, min: 0x00, max: 0x7F }, // LSB
    cross: { status: 0xB6, data1: 0x1F, min: 0x00, max: 0x7F }, // MSB
    // cross: { status: 0xB6, data1: 0x3F, min: 0x00, max: 0x7F }, // LSB
    browse: { status: 0xB6, data1: 0x40, right: 0x01, left: 0x7F },
    shift_browse: { status: 0xB6, data1: 0x64, right: 0x01, left: 0x7F },
    // A
    a_load: { status: 0x96, data1: 0x46, off: 0x00, on: 0x7F },
    a_filter: { status: 0xB6, data1: 0x17, min: 0x00, max: 0x7F }, // MSB
    // a_filter: { status: 0xB6, data1: 0x37, min: 0x00, max: 0x7F }, // LSB
    a_touchwheel_xy: { status: 0xB0, data1: 0x23, right: { slow: 0x41, midium: 0x42, fast: 0x43 }, left: { slow: 0x3F, midium: 0x3E, fast: 0x3D }},
    a_play: { status: 0x90, data1: 0x0B, off: 0x00, on: 0x7F },
    a_cue: { status: 0x90, data1: 0x0C, off: 0x00, on: 0x7F },
    a_loophalf: { status: 0x90, data1: 0x12, off: 0x00, on: 0x7F },
    a_looptwice: { status: 0x90, data1: 0x13, off: 0x00, on: 0x7F },
    a_autoloop: { status: 0x90, data1: 0x14, off: 0x00, on: 0x7F },
    a_hotcue_btn: { status: 0x90, data1: 0x1B, off: 0x00, on: 0x7F },
    a_touchwheel: { status: 0x90, data1: 0x36, off: 0x00, on: 0x7F },
    a_shift: { status: 0x90, data1: 0x3F, off: 0x00, on: 0x7F },
    a_shiftsync: { status: 0x90, data1: 0x47, off: 0x00, on: 0x7F },
    a_shiftcue: { status: 0x90, data1: 0x48, off: 0x00, on: 0x7F },
    a_reloopexit: { status: 0x90, data1: 0x50, off: 0x00, on: 0x7F }, // with shift
    a_monitorcue: { status: 0x90, data1: 0x54, off: 0x00, on: 0x7F },
    a_sync: { status: 0x90, data1: 0x58, off: 0x00, on: 0x7F },
    a_shiftplay: { status: 0x90, data1: 0x5C, off: 0x00, on: 0x7F },
    a_loopin: { status: 0x90, data1: 0x61, off: 0x00, on: 0x7F }, // with shift
    a_loopout: { status: 0x90, data1: 0x62, off: 0x00, on: 0x7F }, // with shift
    a_pitch: { status: 0xB0, data1: 0x00, min: 0x00, max: 0x7F }, // MSB
    // a_pitch: { status: 0xB0, data1: 0x20, min: 0x00, max: 0x7F }, // LSB
    a_gain: { status: 0xB0, data1: 0x04, min: 0x00, max: 0x7F }, // MSB
    // a_gain: { status: 0xB0, data1: 0x24, min: 0x00, max: 0x7F }, // LSB
    a_hi: { status: 0xB0, data1: 0x07, min: 0x00, max: 0x7F }, // MSB
    // a_hi: { status: 0xB0, data1: 0x27, min: 0x00, max: 0x7F }, // LSB
    a_mid: { status: 0xB0, data1: 0x0B, min: 0x00, max: 0x7F }, // MSB
    // a_mid: { status: 0xB0, data1: 0x2B, min: 0x00, max: 0x7F }, // LSB
    a_lo: { status: 0xB0, data1: 0x0F, min: 0x00, max: 0x7F }, // MSB
    // a_lo: { status: 0xB0, data1: 0x2F, min: 0x00, max: 0x7F }, // LSB
    a_inputfader: { status: 0xB0, data1: 0x13, min: 0x00, max: 0x7F }, // MSB
    // a_inputfader: { status: 0xB0, data1: 0x33, min: 0x00, max: 0x7F }, // LSB
    // A FX
    a_fx1: { status: 0x94, data1: 0x47, off: 0x00, on: 0x7F },
    a_fx2: { status: 0x94, data1: 0x48, off: 0x00, on: 0x7F },
    a_fx3: { status: 0x94, data1: 0x49, off: 0x00, on: 0x7F },
    a_fxlevel: { status: 0xB4, data1: 0x06, min: 0x00, max: 0x7F }, // MSB
    // a_fxlevel: { status: 0xB4, data1: 0x26, min: 0x00, max: 0x7F }, // LSB
    // A HOTCUE
    a_hotcue1: { status: 0x97, data1: 0x00, off: 0x00, on: 0x7F },
    a_hotcue2: { status: 0x97, data1: 0x01, off: 0x00, on: 0x7F },
    a_hotcue3: { status: 0x97, data1: 0x02, off: 0x00, on: 0x7F },
    a_hotcue4: { status: 0x97, data1: 0x03, off: 0x00, on: 0x7F },
    a_hotcue5: { status: 0x97, data1: 0x04, off: 0x00, on: 0x7F },
    a_hotcue6: { status: 0x97, data1: 0x05, off: 0x00, on: 0x7F },
    a_hotcue7: { status: 0x97, data1: 0x06, off: 0x00, on: 0x7F },
    a_hotcue8: { status: 0x97, data1: 0x07, off: 0x00, on: 0x7F },
    a_shifthotcue1: { status: 0x97, data1: 0x08, off: 0x00, on: 0x7F }, // with shift
    a_shifthotcue2: { status: 0x97, data1: 0x09, off: 0x00, on: 0x7F }, // with shift
    a_shifthotcue3: { status: 0x97, data1: 0x0A, off: 0x00, on: 0x7F }, // with shift
    a_shifthotcue4: { status: 0x97, data1: 0x0B, off: 0x00, on: 0x7F }, // with shift
    a_shifthotcue5: { status: 0x97, data1: 0x0C, off: 0x00, on: 0x7F }, // with shift
    a_shifthotcue6: { status: 0x97, data1: 0x0D, off: 0x00, on: 0x7F }, // with shift
    a_shifthotcue7: { status: 0x97, data1: 0x0E, off: 0x00, on: 0x7F }, // with shift
    a_shifthotcue8: { status: 0x97, data1: 0x0F, off: 0x00, on: 0x7F }, // with shift

    //B
    b_load: { status: 0x96, data1: 0x47, off: 0x00, on: 0x7F },
    a_filter: { status: 0xB6, data1: 0x18, min: 0x00, max: 0x7F }, // MSB
    // a_filter: { status: 0xB6, data1: 0x38, min: 0x00, max: 0x7F }, // LSB
    b_touchwheel_xy: { status: 0xB1, data1: 0x23, right: { slow: 0x41, midium: 0x42, fast: 0x43 }, left: { slow: 0x3F, midium: 0x3E, fast: 0x3D }},
    b_play: { status: 0x91, data1: 0x0B, off: 0x00, on: 0x7F },
    b_cue: { status: 0x91, data1: 0x0C, off: 0x00, on: 0x7F },
    b_loophalf: { status: 0x91, data1: 0x12, off: 0x00, on: 0x7F },
    b_looptwice: { status: 0x91, data1: 0x13, off: 0x00, on: 0x7F },
    b_autoloop: { status: 0x91, data1: 0x14, off: 0x00, on: 0x7F },
    b_hotcue_btn: { status: 0x91, data1: 0x1B, off: 0x00, on: 0x7F },
    b_touchwheel: { status: 0x91, data1: 0x36, off: 0x00, on: 0x7F },
    b_shift: { status: 0x91, data1: 0x3F, off: 0x00, on: 0x7F },
    b_shiftsync: { status: 0x91, data1: 0x47, off: 0x00, on: 0x7F },
    b_shiftcue: { status: 0x91, data1: 0x48, off: 0x00, on: 0x7F },
    b_reloopexit: { status: 0x91, data1: 0x50, off: 0x00, on: 0x7F }, // with shift
    b_monitorcue: { status: 0x91, data1: 0x54, off: 0x00, on: 0x7F },
    b_sync: { status: 0x91, data1: 0x58, off: 0x00, on: 0x7F },
    b_shiftplay: { status: 0x91, data1: 0x5C, off: 0x00, on: 0x7F },
    b_loopin: { status: 0x91, data1: 0x61, off: 0x00, on: 0x7F }, // with shift
    b_loopout: { status: 0x91, data1: 0x62, off: 0x00, on: 0x7F }, // with shift
    b_pitch: { status: 0xB1, data1: 0x00, min: 0x00, max: 0x7F }, // MSB
    // b_pitch: { status: 0xB1, data1: 0x20, min: 0x00, max: 0x7F }, // LSB
    b_gain: { status: 0xB1, data1: 0x04, min: 0x00, max: 0x7F }, // MSB
    // b_gain: { status: 0xB1, data1: 0x24, min: 0x00, max: 0x7F }, // LSB
    b_hi: { status: 0xB1, data1: 0x07, min: 0x00, max: 0x7F }, // MSB
    // b_hi: { status: 0xB1, data1: 0x27, min: 0x00, max: 0x7F }, // LSB
    b_mid: { status: 0xB1, data1: 0x0B, min: 0x00, max: 0x7F }, // MSB
    // b_mid: { status: 0xB1, data1: 0x2B, min: 0x00, max: 0x7F }, // LSB
    b_lo: { status: 0xB1, data1: 0x0F, min: 0x00, max: 0x7F }, // MSB
    // b_lo: { status: 0xB1, data1: 0x2F, min: 0x00, max: 0x7F }, // LSB
    b_inputfader: { status: 0xB1, data1: 0x13, min: 0x00, max: 0x7F }, // MSB
    // b_inputfader: { status: 0xB1, data1: 0x33, min: 0x00, max: 0x7F }, // LSB
    // B FX
    b_fx1: { status: 0x95, data1: 0x47, off: 0x00, on: 0x7F },
    b_fx2: { status: 0x95, data1: 0x48, off: 0x00, on: 0x7F },
    b_fx3: { status: 0x95, data1: 0x49, off: 0x00, on: 0x7F },
    b_fxlevel: { status: 0xB5, data1: 0x06, min: 0x00, max: 0x7F }, // MSB
    // b_fxlevel: { status: 0xB5, data1: 0x26, min: 0x00, max: 0x7F }, // LSB
    // B HOTCUE
    b_hotcue1: { status: 0x98, data1: 0x00, off: 0x00, on: 0x7F },
    b_hotcue2: { status: 0x98, data1: 0x01, off: 0x00, on: 0x7F },
    b_hotcue3: { status: 0x98, data1: 0x02, off: 0x00, on: 0x7F },
    b_hotcue4: { status: 0x98, data1: 0x03, off: 0x00, on: 0x7F },
    b_hotcue5: { status: 0x98, data1: 0x04, off: 0x00, on: 0x7F },
    b_hotcue6: { status: 0x98, data1: 0x05, off: 0x00, on: 0x7F },
    b_hotcue7: { status: 0x98, data1: 0x06, off: 0x00, on: 0x7F },
    b_hotcue8: { status: 0x98, data1: 0x07, off: 0x00, on: 0x7F },
    b_shifthotcue1: { status: 0x98, data1: 0x08, off: 0x00, on: 0x7F }, // with shift
    b_shifthotcue2: { status: 0x98, data1: 0x09, off: 0x00, on: 0x7F }, // with shift
    b_shifthotcue3: { status: 0x98, data1: 0x0A, off: 0x00, on: 0x7F }, // with shift
    b_shifthotcue4: { status: 0x98, data1: 0x0B, off: 0x00, on: 0x7F }, // with shift
    b_shifthotcue5: { status: 0x98, data1: 0x0C, off: 0x00, on: 0x7F }, // with shift
    b_shifthotcue6: { status: 0x98, data1: 0x0D, off: 0x00, on: 0x7F }, // with shift
    b_shifthotcue7: { status: 0x98, data1: 0x0E, off: 0x00, on: 0x7F }, // with shift
    b_shifthotcue8: { status: 0x98, data1: 0x0F, off: 0x00, on: 0x7F }, // with shift
  }
  audioprocess;
  uicontroller;

  onAccessSuccess(access) {
    let inputs = [...access.inputs.values()];
    let outputs = [...access.outputs.values()];
    console.log(inputs);
    console.log(outputs);

    for(let input of inputs) {
      if(input.name.endsWith(this.json.input_name) && input.manufacturer === this.json.manufacturer) {
        input.onmidimessage = (event) => { this.onMidiMessage(event, this.json); };
      }

      if(input.name.endsWith(this.json2.input_name) && input.manufacturer === this.json2.manufacturer) {
        input.onmidimessage = (event) => { this.onMidiMessage(event, this.json2); };
      }

      if(input.name.endsWith(this.json3.input_name) && input.manufacturer === this.json3.manufacturer) {
        input.onmidimessage = (event) => { this.onMidiMessage(event, this.json3); };
      }
    }

    access.onstatechange = (event) => { this.onStateChange(event); };
  }

  onStateChange(event) {
    console.log(event);
  }

  onMidiMessage(event, feature) {
    if(event.data[0] === feature.browse.status && event.data[1] === feature.browse.data1) {
      // Browse
      this.uicontroller.onMoveFileList(event.data[2]);
    }
    else if(event.data[0] === feature.master.status && event.data[1] === feature.master.data1) {
      // Master volume
      this.audioprocess.onMasterVolume(event.data[2]);
      this.uicontroller.volume_master.value = event.data[2];
    }
    else if(event.data[0] === feature.monitor.status && event.data[1] === feature.monitor.data1) {
      // Monitor volume
      this.audioprocess.onMonitorVolume(event.data[2]);
      this.uicontroller.volume_monitor.value = event.data[2];
    }
    else if(event.data[0] === feature.cross.status && event.data[1] === feature.cross.data1) {
      // Cross fader
      this.audioprocess.onCrossFader(event.data[2]);
      this.uicontroller.fader_cross.value = event.data[2];
    }
    else if(event.data[0] === feature.a_load.status && event.data[1] === feature.a_load.data1) {
      // A load
      this.uicontroller.onLoadADeck();
    }
    else if(event.data[0] === feature.a_monitorcue.status && event.data[1] === feature.a_monitorcue.data1) {
      // A monitor cue
      if(event.data[2] === feature.a_monitorcue.on) {
        this.uicontroller.chkbox_a_monitor.checked = !this.uicontroller.chkbox_a_monitor.checked;
        this.audioprocess.onChangeAMonitorCue(this.uicontroller.chkbox_a_monitor.checked);
      }
    }
    else if(event.data[0] === feature.a_play.status && event.data[1] === feature.a_play.data1) {
      // A play
      if(event.data[2] === feature.a_play.on) {
        this.uicontroller.onClickAPlay();
      }
    }
    else if(event.data[0] === feature.a_cue.status && event.data[1] === feature.a_cue.data1) {
      // A cue
      if(event.data[2] === feature.a_cue.on) {
        this.uicontroller.onMouseDownACue();
      }
      else {
        this.uicontroller.onMouseUpACue();
      }
    }
    else if(event.data[0] === feature.a_inputfader.status && event.data[1] === feature.a_inputfader.data1) {
      // A input fader
      this.uicontroller.fader_a_input.value = event.data[2];
      this.audioprocess.onFaderAInput(event.data[2]);
    }
    else if(event.data[0] === feature.a_pitch.status && event.data[1] === feature.a_pitch.data1) {
      // A pitch
      this.uicontroller.fader_a_pitch.value = event.data[2];
      this.uicontroller.onFaderAPitch(event.data[2]);
    }
    else if(event.data[0] === feature.a_gain.status && event.data[1] === feature.a_gain.data1) {
      // A gain
      this.uicontroller.a_gain.value = event.data[2];
      this.audioprocess.onAGain(event.data[2]);
    }
    else if(event.data[0] === feature.a_hi.status && event.data[1] === feature.a_hi.data1) {
      // A hi
      this.uicontroller.eq_a_hi.value = event.data[2];
      this.audioprocess.onEqualizerAHigh(event.data[2]);
    }
    else if(event.data[0] === feature.a_mid.status && event.data[1] === feature.a_mid.data1) {
      // A mid
      this.uicontroller.eq_a_mid.value = event.data[2];
      this.audioprocess.onEqualizerAMiddle(event.data[2]);
    }
    else if(event.data[0] === feature.a_lo.status && event.data[1] === feature.a_lo.data1) {
      // A lo
      this.uicontroller.eq_a_lo.value = event.data[2];
      this.audioprocess.onEqualizerALow(event.data[2]);
    }
    else if(event.data[0] === feature.a_touchwheel.status && event.data[1] === feature.a_touchwheel.data1) {
      // A touch wheel
      if(event.data[2] === feature.a_touchwheel.on) {
        this.a_paused = this.uicontroller.a_audio.paused;
        this.uicontroller.a_audio.pause();
      } else {
        if(!this.a_paused)
          this.uicontroller.a_audio.play();
      }
    }
    else if(event.data[0] === feature.b_load.status && event.data[1] === feature.b_load.data1) {
      // B load
      this.uicontroller.onLoadBDeck();
    }
    else if(event.data[0] === feature.b_monitorcue.status && event.data[1] === feature.b_monitorcue.data1) {
      // B monitor cue
      if(event.data[2] === feature.b_monitorcue.on) {
        this.uicontroller.chkbox_b_monitor.checked = !this.uicontroller.chkbox_b_monitor.checked;
        this.audioprocess.onChangeBMonitorCue(this.uicontroller.chkbox_b_monitor.checked);
      }
    }
    else if(event.data[0] === feature.b_play.status && event.data[1] === feature.b_play.data1) {
      // B play
      if(event.data[2] === feature.b_play.on) {
        this.uicontroller.onClickBPlay();
      }
    }
    else if(event.data[0] === feature.b_cue.status && event.data[1] === feature.b_cue.data1) {
      // B cue
      if(event.data[2] === feature.b_cue.on) {
        this.uicontroller.onMouseDownBCue();
      }
      else {
        this.uicontroller.onMouseUpBCue();
      }
    }
    else if(event.data[0] === feature.b_inputfader.status && event.data[1] === feature.b_inputfader.data1) {
      // B input fader
      this.uicontroller.fader_b_input.value = event.data[2];
      this.audioprocess.onFaderBInput(event.data[2]);
    }
    else if(event.data[0] === feature.b_pitch.status && event.data[1] === feature.b_pitch.data1) {
      // B pitch
      this.uicontroller.fader_b_pitch.value = event.data[2];
      this.uicontroller.onFaderBPitch(event.data[2]);
    }
    else if(event.data[0] === feature.b_gain.status && event.data[1] === feature.b_gain.data1) {
      // B gain
      this.uicontroller.b_gain.value = event.data[2];
      this.audioprocess.onBGain(event.data[2]);
    }
    else if(event.data[0] === feature.b_hi.status && event.data[1] === feature.b_hi.data1) {
      // B hi
      this.uicontroller.eq_b_hi.value = event.data[2];
      this.audioprocess.onEqualizerBHigh(event.data[2]);
    }
    else if(event.data[0] === feature.b_mid.status && event.data[1] === feature.b_mid.data1) {
      // B mid
      this.uicontroller.eq_b_mid.value = event.data[2];
      this.audioprocess.onEqualizerBMiddle(event.data[2]);
    }
    else if(event.data[0] === feature.b_lo.status && event.data[1] === feature.b_lo.data1) {
      // B lo
      this.uicontroller.eq_b_lo.value = event.data[2];
      this.audioprocess.onEqualizerBLow(event.data[2]);
    }
    else if(event.data[0] === feature.b_touchwheel.status && event.data[1] === feature.b_touchwheel.data1) {
      // B touch wheel
      if(event.data[2] === feature.b_touchwheel.on) {
        this.b_paused = this.uicontroller.b_audio.paused;
        this.uicontroller.b_audio.pause();
      } else {
        if(!this.b_paused)
          this.uicontroller.b_audio.play();
      }
    }
    console.log('status: 0x'+event.data[0].toString(16).toUpperCase().padStart(2,'0')+', data1: 0x'+event.data[1].toString(16).toUpperCase().padStart(2,'0')+', value: 0x'+event.data[2].toString(16).toUpperCase().padStart(2,'0'));
  }
}