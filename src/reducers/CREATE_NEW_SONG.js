import makeIdFromTitle from "../functions/makeIdFromTitle";

export default async function CREATE_NEW_SONG(projectRef, title) {

  let unnamed = false;

  if (title === '') {
    unnamed = true;
    title = 'New Song ';
  }

  let usedIds = [];

  await projectRef.collection('tracks').get().then(snap => {
    snap.forEach(doc => {
      usedIds.push(doc.id);
    });
  });

  if (unnamed) {
    title += (usedIds.length + 1).toString();
  }

  let id = makeIdFromTitle(title);

  while (usedIds.includes(id)) {
    id += (Math.floor(Math.random() * 100000).toString());
  }

  await projectRef.collection('tracks').doc(id).set({
    songTitle: title,
    addDate: new Date(),
    notes: [],
    lyrics: [],
    index: usedIds.length,
  });
}