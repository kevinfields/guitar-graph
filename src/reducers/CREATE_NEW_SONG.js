import makeIdFromTitle from "../functions/makeIdFromTitle";

export default async function CREATE_NEW_SONG(projectRef) {

  let title = 'New Song ';

  let project;

  await projectRef.get().then(doc => {
    project = doc.data();
  });

  let usedIds = [];

  await projectRef.collection('tracks').get().then(snap => {
    snap.forEach(doc => {
      usedIds.push(doc.id);
    });
  });

  title += (usedIds.length + 1).toString();

  let id = makeIdFromTitle(title);

  if (usedIds.includes(id)) {
    id += (Math.floor(Math.random() * 1000).toString());
  }

  await projectRef.collection('tracks').doc(id).set({
    songTitle: title,
    addDate: new Date(),
    notes: [],
  });
}