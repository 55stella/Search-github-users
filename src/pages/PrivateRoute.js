import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children}) => {
  const { user, isAuthenticated } = useAuth0()
  const isUser = user && isAuthenticated
  if (!isUser) {
    return <Navigate to= '/login'/>
  }


  return children
  


  
};
export default PrivateRoute;




// const PrivateRoute = (props) => {
//   console.log(props)
//   const { children, ...rest } = props
//   console.log(children)
//   console.log(props)
//   const { user, isAuthenticated } = useAuth0()
  

//   const isUser = user && isAuthenticated 
//   // by the time that we are trying to login to the dashboard, isauthenticated and the user
//   // is still false. so we need to wrap our entire app with an authWrapper componenet
//   // in the 
  
//   return <Route {...rest} render={() => {
//     return isUser ? children : <Redirect to = '/login'></Redirect>
//   }}>


//   </Route>;
// };
// export default PrivateRoute;
