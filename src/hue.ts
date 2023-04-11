function getHueByPos(pos: number): number {
  const startHue = 280;
  const hue = startHue - pos * 10;
  return hue;
}

export { getHueByPos }
