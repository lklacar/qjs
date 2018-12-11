const WebSocket = require('ws');
const bufferToText = require("./util").bufferToText;
const textToBuffer = require("./util").textToBuffer;
const ws = new WebSocket('ws://master.quakejs.com:27950/', {
  headers: {
    'x-forwarded-port': 27960
  }
});


const messageOptions = {
  binary: true,
  compress: true,
  fin: true,
  mask: true,
};

ws.binaryType = "binary";
ws.on('open', function (res) {

  // ws.send(textToBuffer("heartbeat ComeOn"), messageOptions, null);

  ws.send(textToBuffer("heartbeat ComeOn"), messageOptions, null);
  setInterval(function() {
    ws.send(textToBuffer("heartbeat ComeOn"), messageOptions, null);
  }, 60000)

  ws.on('message', function (res) {
    const view = Uint8Array.from(res);
    const buffer = view.buffer;
    const response = bufferToText(buffer);
    console.log(response);

    if (response.indexOf('getinfo') !== -1) {

      const challenge = response.split(" ")[1];
      const infoResponse = "infoResponse\n" +
        "\\g_needpass\\0\\pure\\1\\gametype\\0\\sv_maxclients\\12\\g_humanplayers\\0\\clients\\0\\mapname\\q3dm7\\hostname\\CHANGE ME\\protocol\\71\\gamename\\Quake3Arena\\challenge\\" + challenge;

      ws.send(textToBuffer(infoResponse), messageOptions, null);

    }
  })

});


