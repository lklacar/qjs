function bufferToText(buffer) {
  const view = new DataView(buffer);
  let str = '';
  for (let i = 0; i < buffer.byteLength; i++) {
    const c = String.fromCharCode(view.getUint8(i));
    str += c;
  }

  return str;
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