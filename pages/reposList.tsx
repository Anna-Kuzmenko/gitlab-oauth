import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Repo {
  id: string;
  name: string;
}

export const ReposList = () => {
  const [repos, setRepos] = useState([]);
  const { data: session } = useSession();


  const apiUrl = `https://gitlab.com/api/v4/projects?access_token=${session?.accessToken}`;
  // const apiUrl = `https://gitlab.com/api/v4/projects/${session.user.id}`;

  console.log(session, session?.user, session?.accessToken)

  useEffect(() => {
    if (session) {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${session.accessToken}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      return response.json()
    })
    .then(data => {
      setRepos(data);
    })
    .catch(error => {
      console.error('Error fetching data from GitLab', error);
    });
    }
  }, [session?.accessToken]);

  return (
    <>
      {repos.length > 0 && 
        (<><h2>GitLab Repositories</h2><ul>
          {repos.map((repo: Repo) => (
            <li key={repo.id}>
              {repo.name} <br />
              <a>{repo.id}</a> <br />
            </li>
          ))}
        </ul></>)
      }
    </>
  )
}
