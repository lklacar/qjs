function bufferToText(buffer) {
  const view = new DataView(buffer);
  return new Array(buffer.byteLength).fill(0).map((_, i) => String.fromCharCode(view.getUint8(i))).join("");
}

function textToBuffer(text) {
  const view = new DataView(new ArrayBuffer(text.length));
  text.split("").forEach((char, i) => view.setUint8(i, char.charCodeAt(0)));
  return view.buffer;
}


const text = "Luka Klacar";
const buffer = textToBuffer(text);
const decodedText = bufferToText(buffer);
console.log(decodedText);