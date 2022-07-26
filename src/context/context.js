import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


const GithubContext = React.createContext();

const GitProvider = ({ children }) => {
    const[GithubUsers, setGithubUser] = useState(mockUser)
    const[Repos, setRepo] = useState(mockRepos)
  const [Followers, setFollowers] = useState(mockFollowers)
  // request loading
  const [request, setRequest] = useState(0)
  const [Isloading, setLoading] = useState(false)
  // error
  const[error, setError] = useState({show:false, msg:''})
  // check request
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      
      .then(({ data }) => {
        
        console.log(data)
        const { rate: { remaining } } = data
        setRequest(remaining)
        // the ip address generates the request/ requests
        if (remaining === 0) {
          // throw an error
          toggleError(true,'sorry, you have excceede your hourly limits!')
        }
       })
      .catch((err) =>
        console.log(err))
  }

  function toggleError(show=false, msg='') {
    setError({show, msg})
  
    

  }

  const searchGithubUser = async (user) => {
    setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`)
      .catch(error => console.log(error))
    console.log(response)
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data
      // promse.allsettled is used to display the data only when we get everything back
      // i commented on the second method
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
      ]).then((result) => {
        console.log(result)
        const [repos, followers] = result
        // array has two items, so destructuring gives repos ans status

        const status = 'fulfilled'
        if (repos.status === status) {
          setRepo(repos.value.data)
          
        }
        if (followers.status === status) {
          setFollowers(followers.value.data)
          
        }

        
      }).catch((err)=>console.log(err));
      // setGithubUser(response.data);
      // const { login, followers_url } = response.data
      // // repos
      // axios(`${rootUrl}/users/${login}/repos?per_page=100`).
      //   then(response =>
      //     setRepo(response.data)
      //   )

      // // followers
      // axios(`${followers_url}?per_page=100`).
      //   then(response => setFollowers(response.data))

      // for repos
      // https://api.github.com/users/john-smilga/repos?per_page=100
      // for followers
      //https://api.github.com/users/john-smilga/followers
      // more logic here
      toggleError();
      // the toggle error function when called with no argument will answer
      // by using the previous arguments in the function by removing the error message
      // when called.
    }
    else {
      toggleError(true,'there is no user with that username')
    }
      
    setLoading(false)
    checkRequest()
    
  }

  useEffect(() => {
    checkRequest()
  

  },[])
    return (
      <GithubContext.Provider value={{
        GithubUsers, Repos, Followers,
        request, error,Isloading, searchGithubUser
      }}>{children}</GithubContext.Provider>
    );
    
}
export { GitProvider, GithubContext };