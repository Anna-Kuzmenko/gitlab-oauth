import Layout from "../components/layout"
import { getCsrfToken, useSession } from "next-auth/react";
import { ReposList } from "./reposList";

export default function IndexPage() {
  const { data: session } = useSession();

  // const token = getCsrfToken();

  // token.then(res => console.log(res.data));
  

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/auth/session')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch CSRF token');
  //       }
  //       console.log(response)
  //       return response.json()
  //     })
  //     .then(data => {
  //       setToken(data.csrfToken);
  //       console.log(data.csrfToken);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching token', error);
  //     });
  // }, []);

  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>

      {session && <ReposList />}
    </Layout>
  );
}
