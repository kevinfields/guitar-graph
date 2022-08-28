export default async function CHANGE_USERNAME(masterListRef, userRef, newName) {

  let list = [];
  let user;

  await userRef.get().then(doc => {
    user = doc.data();
  })

  const oldName = user.username;

  await masterListRef.get().then(doc => {
    list = doc.data().list;
  });

  const index = list.indexOf(oldName);

  if (index === -1) {
    return false;
  };

  if (list.includes(newName)) {
    return false;
  };

  list.splice(index, 1, newName);
  user = {
    ...user,
    username: newName,
  }

  await masterListRef.set({
    list: list,
  });

  await userRef.set(user);
  
  return true;
}