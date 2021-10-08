const audioprocess = new AudioProcess();
const midicontroller = new MidiController();
const uicontroller = new UiController();

// Input from controllers Output to audio process
uicontroller.audioprocess = audioprocess;
midicontroller.audioprocess = audioprocess;

// UI controller changes apply to MIDI controller
uicontroller.midicontroller = midicontroller;

// MIDI controller changes apply to UI controller
midicontroller.uicontroller = uicontroller;
