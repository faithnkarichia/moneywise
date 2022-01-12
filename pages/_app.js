import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
// import { UserProvider } from '@auth0/nextjs-auth0';
import { refreshToken } from '../functions/auth';
// import {useStore} from '../store'
import PageChange from '../components/PageChange/PageChange.js';
import { useStore } from '../store';

import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/tailwind.css';

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add('body-page-transition');
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition')
  );
});
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  const store = useStore();
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  

  useEffect(() => {
    refreshToken().then((data) => {
      if (data.ok) {
        store.setAccessToken(data.accessToken);
        store.setUser(data.user);
      }
      setLoading(false);
    });
    setInterval(() => {
      refreshToken().then((data) => {
        if (data.ok) {
          store.setAccessToken(data.accessToken);
          store.setUser(data.user);
        }
      });
    }, 600000);
  }, []);

  // componentDidMount() {
  //   refreshToken().then(data => {
  //     if(data.ok) {
  //       store.setAccessToken(data.accessToken)
  //       store.setUser(data.user)
  //     }
  //     setLoading(false)
  //   })

  //   //starts silent refreshes
  //   setInterval(() => {
  //     refreshToken().then(data => {
  //       if(data.ok) {
  //         store.setAccessToken(data.accessToken)
  //         store.setUser(data.user)
  //       }
  //     })
  //   },600000)
  // }
  // render() {
  // const { Component, pageProps } = this.props;

  // const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <React.Fragment>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <title>Fin - Money Transfer</title>
      </Head>
      {/* <UserProvider> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      {/* </UserProvider> */}
    </React.Fragment>
  );
  // }
 
}

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp