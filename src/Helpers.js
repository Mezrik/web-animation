import React from 'react';

export const random = (min, max) => {
    if (max == null) {
        max = min;
        min = 0;
    }

    return Math.random() * (max - min) + Number(min);
}

export const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
