const audioprocess = new AudioProcess();
const midicontroller = new MidiController();
const uicontroller = new UiController();
const hidcontroller = new HidController();

// Input from controllers Output to audio process
hidcontroller.audioprocess = audioprocess;
uicontroller.audioprocess = audioprocess;
midicontroller.audioprocess = audioprocess;

// UI controller changes apply to MIDI controller
uicontroller.midicontroller = midicontroller;

// MIDI controller changes apply to UI controller
midicontroller.uicontroller = uicontroller;

// HID controller changes apply to MIDI & UI controller
hidcontroller.midicontroller = midicontroller;
hidcontroller.uicontroller = uicontroller;