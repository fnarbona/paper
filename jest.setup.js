// polyfill for node_modules/whatwg-url/lib/encoding.js missing import
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
