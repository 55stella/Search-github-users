import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <AuthWrapper>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  {/* {here we wrap our route in the dashboard to ensure that only 
                  authenticated users can access the route}  */} 
                  <Dashboard />
                </PrivateRoute>
              }
            ></Route>

            <Route path="login" element={<Login />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
          {/* { here we are wrapping all our pages in a router component.} */}
        </Router>
      </AuthWrapper>
    </div>
  );
}

export default App;
