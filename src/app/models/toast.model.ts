export class Toast {
  type: 'success' | 'error';
  text: string;
  time: number; // ms

  constructor(text: string, type: 'success' | 'error', time: number = 3000) {
    this.text = text;
    this.time = time;
    this.type = type;
  }
}
