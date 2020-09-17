interface Adjustments {
  [key: string]: Adjustment;
}

interface Adjustment {
  shortcut: string;
  value: string | number;
}

export class ImageQueryString {
  private adjustments: Adjustments = {};

  get value(): string {
    const adjustmentStrings = [];

    for (const key in this.adjustments) {
      const adjustment = this.adjustments[key];
      adjustmentStrings.push(`${adjustment.shortcut}=${adjustment.value}`);
    }

    if (!adjustmentStrings.length) return '';

    return `?${adjustmentStrings.join('&')}`;
  }

  setWidth(value: number): void {
    this.adjustments.width = {
      shortcut: 'w',
      value,
    };
  }

  setHeight(value: number): void {
    this.adjustments.height = {
      shortcut: 'h',
      value,
    };
  }
}
