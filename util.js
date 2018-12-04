function bufferToText(buffer) {
  const view = new DataView(buffer);
  return new Array(buffer.byteLength - 4) // Skip first 4 bytes
    .fill(0)
    .map((_, i) => String.fromCharCode(view.getUint8(i + 4))).join("");
}

function textToBuffer(text) {
  const view = new DataView(new ArrayBuffer(text.length + 5));

  // Set first 4 bytes to 0xff
  new Array(4).fill(0xff).forEach((o, i) => view.setUint8(i, o));
  text.split("").forEach((char, i) => view.setUint8(i + 4, char.charCodeAt(0)));


  view.setUint8(text.length + 4, 0);

  return view.buffer;
}

function arrayToText(arr) {
  return arr.map(o => String.fromCharCode(o)).join("");
}

function test() {
  const text = "Luka Klacar";
  const buffer = textToBuffer(text);
  const decodedText = bufferToText(buffer);
  console.log(decodedText);
}

module.exports = {
  bufferToText,
  textToBuffer,
  arrayToText
};