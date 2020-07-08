const thumb = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAE9ElEQVR4Xu2aS4gcVRSGv9MOjSJowI0RRONODDKj0tUDMzgjggohKgRFETIRcaUwoqAIkkR04QMi6saFzEhIBAMad7rK+JyujpCIoBsfCcTHMiIIMdpHqh+T6Zl6dZ3qeYRzl133P3Xq6//ec++tEryZCIhJ7WIcoNEEDtABGgkY5e5AB2gkYJS7Ax2gkYBR7g50gEYCRrk70AEaCRjl7kAHaCRglLsDHaCRgFHuDnSARgJGuTvQARoJGOXuQAdoJGCUuwM3BMATuoVzHECY6eZzEmEPNTlpzK88eaj3Abu7Ad8jkKNlBLc7MIL3D8eA0RUJnUWY3hAQQ51fBq+X5j4C2W+FaAOYDK+Tl7BATaatSZr0DZ1FOBAbQ5mnLnss8YsDzILXyyqQ4vewPFlPG+op4LrEUEaIxR4uLzz4k0C2lMGhcIxQNYd2P4Hsy9FvVZfBAeaHF92scGJFHiZWE2pULO7NjNcpetFcOVAbDOBg8D4jkKmBshlG507O0TC+MjN8AYj5AQ4G71uqTDEmZzOTXosOTR1FWRgGxHwANzO83h80JIj5AOadR2BjOW+lu4cAMRtg/CI0buBtbHhDcmI6wLLhhfowMAH8wggfcav8mDgFHtc7abETuLo9f40wz23yd2z/ht4M7KLCTcAiIxzmFvktMXaJTkwGWCa8pj6IMgdc1vdQwhvU5Km+3xp6BcIHwF19vyv/Ao9Sl4N9v4f6FvBEDKxnCeTVYUOMB1gmvON6Ay1+Sim2zxHIK0vXm/oOyuOJ/YWt1OSP9vVQnwTeTOyr3EFdon16fCvBiasBlgkvSruhryM8nbpa6W33mhoN199T+yp7qcuLXYBZu4wjBPJAajwjxH6A+eGdpspornVeqD8D2zKgTFKXLwn1IeBwxtIwJJA6i3ojFb7P6HuOQC7NXGo2daY7xWR27R7TLe1Y+gEaAqUMk19RrsnI7G4C+ZROkTmU2ldoUpOAr3Q7I3yXEfc8gVQzqXTWuSeA6zP7Rku1QJaO7lYP4bIhNnUOXTpojc/vEi5vV9hvdCv/kVw9O+oL++vsg4KjBHJ/JpRQo13K7Zn9Yta58UWkTIgNnUD4IiW5twkkKgadFuq77Wqb1JRrqcuZ9uWmPoPyWmJf4R5q8kkqmPzTVuw6N3kZUybEUF8Gno95kM85zw4m5K9lAK8CjgBxB7GPEUgE+EJr6EGER1bFVl6iLi8ME14UO30hPQjEFtOMSzQU4tvXOkaF3VSYRIkKy4cE8n5i/1B3oOyk0l5IH6PKXGLRCnUSYRfK9vZCusUhxuWHYcPLBtgZJnkr1MZ5B5I1mRmH7fLw2Xvhiw1iifDyObCH+2JwYsnwBgO42Z04BHiDA9ysEIcErxjAwSCeIpD0bVzWhG+9Hmr0tm1vjjCFzjPzFZG4u+edE4Wxdf06IXu3Ej1dIXjFHThIYWmxjXGJ3oqtfeuctER73LRWGJ4dYPZwXv9Xm6FGbwaTXmma4JUDMBniaVpMrZv7ep5b1Ckq7Y+fVjYzvPIARpE6ic52v9JaoMpsrvPCtRjYnU/bojO8nhM/pspMGfkVLyJr8eCb4B4O0PgnOUAHaCRglLsDHaCRgFHuDnSARgJGuTvQARoJGOXuQAdoJGCUuwMdoJGAUe4OdIBGAka5O9ABGgkY5e5AB2gkYJS7Ax2gkYBR7g50gEYCRvn/QEDeYP09rHoAAAAASUVORK5CYII=';

class cloudlink {
  constructor(runtime, extensionid) {
    this.isLinked = false;
    this.runtime = runtime;
    this.socketData = "";
    this.systemStatus = "";
  }
  static get STATE_KEY() {
    return 'Scratch.websockets';
  }
  getInfo() {
    return {
      id: 'cloudlink',
      name: 'CloudLink',
      color1: '#054c63',
      color2: '#054c63',
      color3: '#043444',
      menuIconURI: thumb,
      blockIconURI: thumb,
      blocks: [
        {
          opcode: 'getStatus',
          blockType: Scratch.BlockType.REPORTER,
          text: 'System Status',
        },
        {
          opcode: 'getData',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Data',
        },
        {
          opcode: 'connectToServer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Connect to Server [url]',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'ws://127.0.0.1:3000/',
            },
          },
        },
        {
          opcode: 'transmitData',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Transmit [A]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Thing',
            },
          },
        },
      ],
    }
  }
  connectToServer(args) {
    const self = this;
    self.systemStatus = "Connecting to server";
    const url = args.url;
    if (this.isLinked == false) {
      const self = this;
      this.mWS = new WebSocket(url);
      this.mWS.onerror = function() {
        self.isLinked = false;
        self.systemStatus = "Failed to connect";
      };
      this.mWS.onopen = function(){
        const self = this;
        self.isLinked = true;
        self.systemStatus = "Connected";
      };
    }
    else{
      const self = this;
      self.systemStatus = "Connected";
    };
  }
  transmitData({A}) {
    const self = this;
    self.socketData = A;
    self.systemStatus = "Transmitting data";
    return A;
  }
  getData() {
    return this.socketData;
  }
  getStatus() {
    return this.systemStatus;
  }
}
Scratch.extensions.register(new cloudlink())
