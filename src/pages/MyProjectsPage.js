import React, {useState, useEffect} from 'react';
import CurrentProjectCard from '../components/CurrentProjectCard';
import Loading from '../components/Loading';

const MyProjectsPage = (props) => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {

    let projectArr = [];
    await props.userRef.collection('projects').get().then(snap => {
      snap.forEach(doc => {
        projectArr.push({
          id: doc.id,
          data: doc.data(),
        })
      })
    });
    setProjects(projectArr);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, [])

  return (
    <div 
      className='page'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh',
          overflowY: 'scroll',
          flex: 1,
          height: '75vh',
          padding: '2vh',
        }}
      >
        {loading ? <Loading />
        :
          projects.map(project => (
            <div
              style={{
                display: 'flex',
                minHeight: 'min-content',
              }}
            >
              <CurrentProjectCard
                project={project}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyProjectsPage