import { Fragment } from "react";

import Header from './Navigation';

const Layout = (props) => {
  return (  
    <Fragment>
      <Header />
      <main>
        {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;