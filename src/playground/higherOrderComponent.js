// Higher Order Component -  a component that renders another component
// reuse code
// render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);



// const withAdminWarning = (WrappedComponent) => {
//   return (props) => (
//     <div>
//       { props.isAdmin && <p>This is private info, do not share to others</p>}
//       <WrappedComponent {...props} />
//     </div>
//   );
// };

const requireAuthentication = (WrappedComponent) => {
   return (props) => (
      <div>
        {props.isAuthenticated ? <WrappedComponent {...props} /> : 'To view this page, you need to log in'}
      </div>
   );
};

// const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

//ReactDOM.render(<AdminInfo isAdmin={true} info='there are the details' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info='there are the details' />, document.getElementById('app'));