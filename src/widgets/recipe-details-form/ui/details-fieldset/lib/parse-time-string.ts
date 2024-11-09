interface Time {
  hours: number;
  minutes: number;
}

const hoursLabel = 'hr';
const minutesLabel = 'min';

function parseTimeString(time: string): Time {
  const parts = time?.split(' ') ?? [];
  const [value1, label1, value2, label2] = parts;

  if (!value1 && !label1) return { hours: 0, minutes: 45 };

  if (label1 === hoursLabel && !label2) return { hours: parseInt(value1), minutes: 0 };
  if (label1 === minutesLabel) return { hours: 0, minutes: parseInt(value1) };
  return { hours: parseInt(value1), minutes: parseInt(value2) };
}

export { parseTimeString, hoursLabel, minutesLabel };
