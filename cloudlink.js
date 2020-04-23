// MikeDEV's CloudLink API
// Version 0.1.5 - Built upon KingdomPi's Scratch-websockets repo.
// See https://github.com/KingdomPy/scratch_websockets/blob/master/index.js for the original script!
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

const vers = '0.1.5';

const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAE9ElEQVR4Xu2aS4gcVRSGv9MOjSJowI0RRONODDKj0tUDMzgjggohKgRFETIRcaUwoqAIkkR04QMi6saFzEhIBAMad7rK+JyujpCIoBsfCcTHMiIIMdpHqh+T6Zl6dZ3qeYRzl133P3Xq6//ec++tEryZCIhJ7WIcoNEEDtABGgkY5e5AB2gkYJS7Ax2gkYBR7g50gEYCRrk70AEaCRjl7kAHaCRglLsDHaCRgFHuDnSARgJGuTvQARoJGOXuQAdoJGCUuwM3BMATuoVzHECY6eZzEmEPNTlpzK88eaj3Abu7Ad8jkKNlBLc7MIL3D8eA0RUJnUWY3hAQQ51fBq+X5j4C2W+FaAOYDK+Tl7BATaatSZr0DZ1FOBAbQ5mnLnss8YsDzILXyyqQ4vewPFlPG+op4LrEUEaIxR4uLzz4k0C2lMGhcIxQNYd2P4Hsy9FvVZfBAeaHF92scGJFHiZWE2pULO7NjNcpetFcOVAbDOBg8D4jkKmBshlG507O0TC+MjN8AYj5AQ4G71uqTDEmZzOTXosOTR1FWRgGxHwANzO83h80JIj5AOadR2BjOW+lu4cAMRtg/CI0buBtbHhDcmI6wLLhhfowMAH8wggfcav8mDgFHtc7abETuLo9f40wz23yd2z/ht4M7KLCTcAiIxzmFvktMXaJTkwGWCa8pj6IMgdc1vdQwhvU5Km+3xp6BcIHwF19vyv/Ao9Sl4N9v4f6FvBEDKxnCeTVYUOMB1gmvON6Ay1+Sim2zxHIK0vXm/oOyuOJ/YWt1OSP9vVQnwTeTOyr3EFdon16fCvBiasBlgkvSruhryM8nbpa6W33mhoN199T+yp7qcuLXYBZu4wjBPJAajwjxH6A+eGdpspornVeqD8D2zKgTFKXLwn1IeBwxtIwJJA6i3ojFb7P6HuOQC7NXGo2daY7xWR27R7TLe1Y+gEaAqUMk19RrsnI7G4C+ZROkTmU2ldoUpOAr3Q7I3yXEfc8gVQzqXTWuSeA6zP7Rku1QJaO7lYP4bIhNnUOXTpojc/vEi5vV9hvdCv/kVw9O+oL++vsg4KjBHJ/JpRQo13K7Zn9Yta58UWkTIgNnUD4IiW5twkkKgadFuq77Wqb1JRrqcuZ9uWmPoPyWmJf4R5q8kkqmPzTVuw6N3kZUybEUF8Gno95kM85zw4m5K9lAK8CjgBxB7GPEUgE+EJr6EGER1bFVl6iLi8ME14UO30hPQjEFtOMSzQU4tvXOkaF3VSYRIkKy4cE8n5i/1B3oOyk0l5IH6PKXGLRCnUSYRfK9vZCusUhxuWHYcPLBtgZJnkr1MZ5B5I1mRmH7fLw2Xvhiw1iifDyObCH+2JwYsnwBgO42Z04BHiDA9ysEIcErxjAwSCeIpD0bVzWhG+9Hmr0tm1vjjCFzjPzFZG4u+edE4Wxdf06IXu3Ej1dIXjFHThIYWmxjXGJ3oqtfeuctER73LRWGJ4dYPZwXv9Xm6FGbwaTXmma4JUDMBniaVpMrZv7ep5b1Ckq7Y+fVjYzvPIARpE6ic52v9JaoMpsrvPCtRjYnU/bojO8nhM/pspMGfkVLyJr8eCb4B4O0PgnOUAHaCRglLsDHaCRgFHuDnSARgJGuTvQARoJGOXuQAdoJGCUuwMdoJGAUe4OdIBGAka5O9ABGgkY5e5AB2gkYJS7Ax2gkYBR7g50gEYCRvn/QEDeYP09rHoAAAAASUVORK5CYII=';

const menuIconURI = blockIconURI; 

class cloudlink{
    constructor (runtime, extensionId) {
        this.isRunning = false;
        this.socketData = "";
        this.runtime = runtime;
    }

    static get STATE_KEY () {
        return 'Scratch.websockets';
    }

    getInfo () {
        return {
            id: 'cloudlink',
            name: 'CloudLink',
            blockIconURI: blockIconURI,
            color1: '#054c63',
            color2: '#054c63',
            color3: '#043444',
            blocks: [
                {
                    opcode: 'getSocketData',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Socket data',
                },
                {
                    opcode: 'getSocketState',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'Socket connected?',
                },
                {
                    opcode: 'openSocket',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Connect to socket [WS]',
		    arguments: {
			WS: {
			type: Scratch.ArgumentType.STRING,
			defaultValue: 'ws://localhost:3000/',
			}
		    }
                },
                {
                    opcode: 'closeSocket',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Disconnect from socket',
                },
                {
                    opcode: 'sendData',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Send through socket [DATA]',
                    arguments: {
                        DATA: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'thing',
                        }
                    }
                },
                {
                    opcode: 'fetchData',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Fetch socket data',
                },
            ],
        };
    }

    openSocket (args) {
	const WS = args.WS;
    	if (this.isRunning == false) {
    		console.log("CloudLink API v" + vers + " | Opening socket...");
    		this.mWS = new WebSocket(WS);
    		const self = this;
    		this.mWS.onerror = function(){
    			self.isRunning = false;
    			console.log("CloudLink API v" + vers + " | Failed to connect to socket.");
    		};
    		this.mWS.onopen = function(){
    			self.isRunning = true;
    			console.log("CloudLink API v" + vers + " | Connected to socket successfully.");
    		}
    	}
    	else{
    		console.log("CloudLink API v" + vers + " | Socket already open, no action taken.");
		return "Socket already open, no action taken.";
    	}
    }

    closeSocket () {
        if (this.isRunning == true) {
    		console.log("CloudLink API v" + vers + " | Closing socket...");
    		this.mWS.close(1000,'script closure');
		console.log("CloudLink API v" + vers + " | Socket closed successfully.");
    		this.isRunning = false;
		return "Socket closed successfully.";
    	}
    	else{
    		console.log("CloudLink API v" + vers + " | Socket not open, no action taken.");
		return "Socket not open, no action taken.";
    	}
    }

   	getSocketState () {
   		if (this.isRunning){
   			var response = this.mWS.readyState;
   			if (response == 2 || response == 3) {
   				this.isRunning = false;
   				console.log("CloudLink API v" + vers + " | Socket closed unexpectedly.")
   			}
   		}
   		return this.isRunning;
   	}

   	sendData (args) {
   		if (this.isRunning == true) {
   			this.mWS.send(args.DATA);
			return "Sent data successfully.";
   		}
		else {
			return "Socket not open, no action taken.";
		}
   	}

   	fetchData (args) {
   		if (this.isRunning == true) {
   			this.mWS.send("%_fetch");
   			const self = this;
   			//Load response
   			var message = this.mWS.onmessage = function(event){
   				self.socketData = String(event.data);
				self.socketData = self.socketData.slice(1, -1)
   			};
   		}
		else {
			return "Socket not open, no action taken.";
		}
   	}

   	getSocketData () {
   		return this.socketData;
   	}
}

Scratch.extensions.register(new cloudlink());
console.log("CloudLink API v" + vers + " | Ready!");