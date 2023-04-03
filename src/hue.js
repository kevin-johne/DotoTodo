function getHueByPos(pos) {
  const startHue = 280;
  const hue = startHue - pos * 10;
  return hue;
}

export { getHueByPos }
