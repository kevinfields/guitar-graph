// IMPORTANT NOTE: NEW ORDER SHOULD BE RELATIVE TO OLD ORDER | NEW ORDER IS AN ARRAY OF INDICES 
// WITH EACH INDEX VALUE SLOT REPRESENTING THE NEW INDEX OF THE TRACK CURRENTLY IN THAT SLOT OF
// THE ORIGINAL ARRAY.

//ex: (if tracks are ordered [A, B, C, D, E] and arranged with newOrder [0, 4, 2, 3, 1]) => {
//  tracks are now ordered [A, E, C, D, B]
// }






export default async function ADJUST_TRACK_ORDER(newOrder, projectRef) {

  let tracks = [];
  await projectRef.collection('tracks').get().then(snap => {
    snap.forEach(doc => {
      tracks.push({
        id: doc.id,
        data: doc.data(),
      });
    });
  });
  tracks = tracks.sort((a, b) => a.data.index - b.data.index);

  let trackCatcher = [];

  for (let i=0; i<tracks.length; i++) {
    trackCatcher.push(tracks.find(track => track.data.index === Number(newOrder[i])));
  };

  for (const track of trackCatcher) {
    console.log(JSON.stringify(track));
    await projectRef.collection('tracks').doc(track.id).set({
      ...track.data,
      index: trackCatcher.indexOf(track),
    });
  };
}