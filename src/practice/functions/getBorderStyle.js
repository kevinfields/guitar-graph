const COLORS = ['LightSkyBlue', 'Blue', 'DarkBlue', 'Indigo', 'DarkViolet', 'MediumPurple', 'Plum'];

export default function getBorderStyle(stats) {
  

  let width = Math.ceil(stats.health / 100);

  let color = COLORS[stats.age - 1];

  return `${width}px solid ${color}`;

};