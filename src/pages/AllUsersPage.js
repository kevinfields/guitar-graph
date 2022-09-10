import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';

const AllUsersPage = (props) => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {

    let userList = [];

    await props.usersRef.get().then(snap => {
      snap.forEach(doc => {
        userList.push({
          id: doc.id,
          data: doc.data(),
        })
      })
    });
    setUsers(userList);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, [])

  return (
    <div className='page'>
      {loading ? 
        <Loading />
      :
        <div className='user-list'>
          {users.map(user => (
            <UserCard user={user.data} />
          ))}
        </div>
      }
    </div>
  )
}

export default AllUsersPage