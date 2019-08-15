import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';

import './ForgotPasswordForm.scss';

const INITIAL_STATE = {
  email: '',
  error: null
};

class ForgotPasswordForm extends React.Component {
  state = { ...INITIAL_STATE };

  onSubmit = e => {
    const { email } = this.state;

    e.preventDefault();

    this.props.firebase
      .resetPassword(email)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <div className="forgot-pw-form">
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            name="email"
            placeholder="Email"
            type="email"
            onChange={this.onChange}
            autoComplete="off"
          />

          <Form.Button type="submit" disabled={isInvalid}>
            Reset My Password
          </Form.Button>
        </Form>

        {error && <p className="error">{error.message}</p>}
      </div>
    );
  }
}

export default withRouter(ForgotPasswordForm);
