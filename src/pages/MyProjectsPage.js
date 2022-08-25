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
      style={{
        overflowY: 'scroll',
      }}
    >
      {loading ? <Loading />
      :
        projects.map(project => (
          <CurrentProjectCard
            project={project}
          />
        ))
      }
    </div>
  )
}

export default MyProjectsPage