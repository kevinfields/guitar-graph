export default async function ASSIGN_TO_TRACK(projectRef, type, index, trackId) {

  let project;
  await projectRef.get().then(doc => {
    project = doc.data();
    console.log('trackId: ' + trackId);
    console.log('project: ');
    console.log(JSON.stringify(project));
  });

  let track;
  await projectRef.collection('tracks').doc(trackId).get().then(doc => {
    track = doc.data();
  });

  let detail;
  switch (type) {
    case 'lyric':
      detail = project.lyrics[index];
      project.lyrics.splice(index, 1);
      track.lyrics.push(detail);
      break;
    case 'note':
      detail = project.notes[index];
      project.notes.splice(index, 1);
      track.notes.push(detail);
      break;
    default:
      return;
  };

  await projectRef.set(project);
  await projectRef.collection('tracks').doc(trackId).set(track);

}