import Led from './led';

class IO {
  public led: Record<'inactiveStatus'|'pendingReview', Led>;

  constructor() {
    this.led = {
      inactiveStatus: new Led(3), // Pin 5
      pendingReview: new Led(4) // Pin 7
    }
  }
}

export default new IO();