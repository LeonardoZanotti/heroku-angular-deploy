import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];    // logs
  i = -13;

  constructor() { }

  add(message: string): void {
    this.messages.push(message);
    if (this.i === 1) {
      this.messages = this.messages.splice(this.i);
    } else {
      this.i++;
    }
  }

  clear(): void {
    this.messages = [];
    this.i = -13;
  }
}
