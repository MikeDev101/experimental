// MikeDEV's CloudLink API
// Version 0.1.2
//
// CloudLink is a simple API for low-latency data communications two-and-from a server-to-client and client-to-server, or even client-to-client.
// All that is needed is a local node.js powered webserver and this handy-dandy extension.
//
// USAGE
// 1. Create a unique client ID, which makes things easier to identify who to send/get packets two/from.
// 2. ???
// 3. Profit.
//
// NECESSITIES
// 1. Flex tape (because I have terrible programming skillz in JavaScript)
// 2. A local node.js powered webserver
// 3. This extension, included in your browser or scratch-gui copy
//
// Uh, I suppose you don't mind taking a look at my crappy code? Thankz.

const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAE9ElEQVR4Xu2aS4gcVRSGv9MOjSJowI0RRONODDKj0tUDMzgjggohKgRFETIRcaUwoqAIkkR04QMi6saFzEhIBAMad7rK+JyujpCIoBsfCcTHMiIIMdpHqh+T6Zl6dZ3qeYRzl133P3Xq6//ec++tEryZCIhJ7WIcoNEEDtABGgkY5e5AB2gkYJS7Ax2gkYBR7g50gEYCRrk70AEaCRjl7kAHaCRglLsDHaCRgFHuDnSARgJGuTvQARoJGOXuQAdoJGCUuwM3BMATuoVzHECY6eZzEmEPNTlpzK88eaj3Abu7Ad8jkKNlBLc7MIL3D8eA0RUJnUWY3hAQQ51fBq+X5j4C2W+FaAOYDK+Tl7BATaatSZr0DZ1FOBAbQ5mnLnss8YsDzILXyyqQ4vewPFlPG+op4LrEUEaIxR4uLzz4k0C2lMGhcIxQNYd2P4Hsy9FvVZfBAeaHF92scGJFHiZWE2pULO7NjNcpetFcOVAbDOBg8D4jkKmBshlG507O0TC+MjN8AYj5AQ4G71uqTDEmZzOTXosOTR1FWRgGxHwANzO83h80JIj5AOadR2BjOW+lu4cAMRtg/CI0buBtbHhDcmI6wLLhhfowMAH8wggfcav8mDgFHtc7abETuLo9f40wz23yd2z/ht4M7KLCTcAiIxzmFvktMXaJTkwGWCa8pj6IMgdc1vdQwhvU5Km+3xp6BcIHwF19vyv/Ao9Sl4N9v4f6FvBEDKxnCeTVYUOMB1gmvON6Ay1+Sim2zxHIK0vXm/oOyuOJ/YWt1OSP9vVQnwTeTOyr3EFdon16fCvBiasBlgkvSruhryM8nbpa6W33mhoN199T+yp7qcuLXYBZu4wjBPJAajwjxH6A+eGdpspornVeqD8D2zKgTFKXLwn1IeBwxtIwJJA6i3ojFb7P6HuOQC7NXGo2daY7xWR27R7TLe1Y+gEaAqUMk19RrsnI7G4C+ZROkTmU2ldoUpOAr3Q7I3yXEfc8gVQzqXTWuSeA6zP7Rku1QJaO7lYP4bIhNnUOXTpojc/vEi5vV9hvdCv/kVw9O+oL++vsg4KjBHJ/JpRQo13K7Zn9Yta58UWkTIgNnUD4IiW5twkkKgadFuq77Wqb1JRrqcuZ9uWmPoPyWmJf4R5q8kkqmPzTVuw6N3kZUybEUF8Gno95kM85zw4m5K9lAK8CjgBxB7GPEUgE+EJr6EGER1bFVl6iLi8ME14UO30hPQjEFtOMSzQU4tvXOkaF3VSYRIkKy4cE8n5i/1B3oOyk0l5IH6PKXGLRCnUSYRfK9vZCusUhxuWHYcPLBtgZJnkr1MZ5B5I1mRmH7fLw2Xvhiw1iifDyObCH+2JwYsnwBgO42Z04BHiDA9ysEIcErxjAwSCeIpD0bVzWhG+9Hmr0tm1vjjCFzjPzFZG4u+edE4Wxdf06IXu3Ej1dIXjFHThIYWmxjXGJ3oqtfeuctER73LRWGJ4dYPZwXv9Xm6FGbwaTXmma4JUDMBniaVpMrZv7ep5b1Ckq7Y+fVjYzvPIARpE6ic52v9JaoMpsrvPCtRjYnU/bojO8nhM/pspMGfkVLyJr8eCb4B4O0PgnOUAHaCRglLsDHaCRgFHuDnSARgJGuTvQARoJGOXuQAdoJGCUuwMdoJGAUe4OdIBGAka5O9ABGgkY5e5AB2gkYJS7Ax2gkYBR7g50gEYCRvn/QEDeYP09rHoAAAAASUVORK5CYII=';
const vers = '0.1.2';
var wsstatus = 'Ready';
var connected = false;

class cloudlink {
  constructor(runtime, extensionId) {
    this.isRunning = false;
    this.socketData = "";
    this.runtime = runtime;
  }
  getInfo() {
    return {
      id: 'cloudlink',
      name: 'CloudLink',
      color1: '#054c63',
      color2: '#054c63',
      color3: '#043444',
      blockIconURI: icon,
      blocks: [
        {
          opcode: 'rpStatus',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Status',
        },
        {
          opcode: 'isConnected',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Connected?',
        },
        {
          opcode: 'get',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Get from websocket [A]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Insert an IP here.',
            },
          },
        },
        {
          opcode: 'set',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Set [DATA] to [VALUE]',
          arguments: {
            DATA: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'data',
            },
            VALUE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'value',
            },
          },
        },
        {
          opcode: 'cn',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Connect to [WS]',
          arguments: {
            WS: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'localhost:3000',
            },
          },
        },
        {
          opcode: 'ds',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Disconnect',
        },
      ],
    }
  }
  get({A}) {
    return A;
  }
  rpStatus() {
    return wsstatus;
  }
  cn({WS}) {
    console.log("CloudLink API v" + vers + ' | Now connecting to ' + WS);
    wsstatus = ('Connecting to websocket server ' + WS);
    return '\n';
  }
  ds() {
    console.log("CloudLink API v" + vers + ' | Now closing connection... ');
    wsstatus = ('Ready');
    return;
  }
  isConnected() {
    return connected;
  }
  set({DATA, VALUE}) {
    return;
  }
}
Scratch.extensions.register(new cloudlink());
console.log("CloudLink API v" + vers + " | Ready to go! :D");
