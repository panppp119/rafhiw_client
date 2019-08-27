import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
  debug: false,
  gaOptions: {
    cookieDomain: 'none'
  }
});

export default ReactGA;
