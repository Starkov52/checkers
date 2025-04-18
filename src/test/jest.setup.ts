import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;
// В тесте мокаем метод play
// jest.setup.ts
import { fetch, Request, Response, Headers } from "cross-fetch";

global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;

Object.defineProperty(HTMLMediaElement.prototype, "play", {
 configurable: true,
 value: jest.fn().mockResolvedValue(true),
});
