export default async function CHECK_USERNAME_AVAILABILITY (masterListRef, name) {
  
  let list = [];

  await masterListRef.get().then((doc) => {
    list = doc.data().list;
  });

  if (list.includes(name)) {
    return false;
  } else {
    return true;
  }
}