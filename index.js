'use strict';
const { Transform, Readable } = require('stream');
const TAG = 'mock-server-349ee1';
class Upper extends Transform {
  _transform(chunk, enc, cb) { cb(null, chunk.toString().toUpperCase()); }
}
class Counter extends Transform {
  constructor() { super(); this.bytes = 0; }
  _transform(chunk, enc, cb) { this.bytes += chunk.length; cb(null, chunk); }
}
const data = ['hello ', 'from ', TAG, ' stream'];
const src = Readable.from(data);
const counter = new Counter();
const upper = new Upper();
let output = '';
src.pipe(counter).pipe(upper).on('data', c => output += c).on('end', () => {
  console.log(`[${TAG}] Output: ${output.trim()}`);
  console.log(`[${TAG}] Bytes: ${counter.bytes}`);
});
