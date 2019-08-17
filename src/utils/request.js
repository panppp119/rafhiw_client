import superagent from 'superagent';
import prefix from 'superagent-prefix';
import nocache from 'superagent-no-cache';

const agent = superagent.agent();

agent
  .use(prefix(process.env.REACT_APP_BASE_API))
  .use(nocache)
  .on('error', error => console.warn(error));

// Create helper method for attaching Access Tokens
superagent.Request.prototype.accessToken = function(accessToken) {
  return this.set('Authorization', 'Bearer ' + accessToken);
};

export default agent;
