function hashColor(text: string, opacity = 0.7) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    const brighteningFactor = 1.3;

    const adjustedValue = Math.min(195, Math.round(value * brighteningFactor));
    color += ('00' + adjustedValue.toString(16)).slice(-2);
  }

  return color;
}

export { hashColor };
