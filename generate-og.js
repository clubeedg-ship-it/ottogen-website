const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function makeOG() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, width, height);

  // Gradient accent
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0055ff');
  gradient.addColorStop(1, '#7c3aed');
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1.0;

  // Wait, I don't have canvas module installed globally
}
