class AudioProcess {
  constructor() {
  }

  createAudioContext() {
    this.ctx = new AudioContext();
    // A audio
    const a_audio = document.getElementsByTagName("audio")[0];
    // A media element source node
    this.a_mediaElementSourceNode = this.ctx.createMediaElementSource(a_audio);
    // B audio
    const b_audio = document.getElementsByTagName("audio")[1];
    // B media element source node
    this.b_mediaElementSourceNode = this.ctx.createMediaElementSource(b_audio);

    // Connect media element source node to context destination 
    this.a_mediaElementSourceNode.connect(this.ctx.destination);
    this.b_mediaElementSourceNode.connect(this.ctx.destination);
  }
}