import type { Options } from './storage.js';

interface InitMessage {
  readonly kind: 'init';
  readonly scrollAnimation: Options['scrollAnimation'];
  readonly scrollToFirst: Options['scrollToFirst'];
  readonly selector: Options['list'][number]['selector'];
}

interface CommandMessage {
  readonly command: 'scroll-to-next' | 'scroll-to-previous';
  readonly kind: 'command';
}

type Message = CommandMessage | InitMessage;

export type { CommandMessage, InitMessage, Message };
