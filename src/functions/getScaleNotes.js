const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

export default function getScaleNotes(key, mode) {

  const firstIndex = notes.indexOf(key);

  switch (mode) {
    case 'Major / Ionian':
      return [notes[firstIndex], notes[firstIndex + 2], notes[firstIndex + 4], notes[firstIndex + 5], notes[firstIndex + 7], notes[firstIndex + 9], notes[firstIndex + 11]];
    case 'Dorian':
      return [notes[firstIndex], notes[firstIndex + 2], notes[firstIndex + 3], notes[firstIndex + 5], notes[firstIndex + 7], notes[firstIndex + 9], notes[firstIndex + 10]];
    case 'Minor / Aeolian':
      return [notes[firstIndex], notes[firstIndex + 2], notes[firstIndex + 3], notes[firstIndex + 5], notes[firstIndex + 7], notes[firstIndex + 8], notes[firstIndex + 10]];
    case 'Lydian':
      return [notes[firstIndex], notes[firstIndex + 2], notes[firstIndex + 4], notes[firstIndex + 6], notes[firstIndex + 7], notes[firstIndex + 9], notes[firstIndex + 11]];
    case 'Mixolydian':
      return [notes[firstIndex], notes[firstIndex + 2], notes[firstIndex + 3], notes[firstIndex + 5], notes[firstIndex + 7], notes[firstIndex + 9], notes[firstIndex + 10]];
    case 'Phrygian':
      return [notes[firstIndex], notes[firstIndex + 1], notes[firstIndex + 3], notes[firstIndex + 5], notes[firstIndex + 7], notes[firstIndex + 8], notes[firstIndex + 10]];
    case 'Locrian':
      return [notes[firstIndex], notes[firstIndex + 1], notes[firstIndex + 3], notes[firstIndex + 5], notes[firstIndex + 6], notes[firstIndex + 8], notes[firstIndex + 10]];
    default: 
      return [];
  }
}