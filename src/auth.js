import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

const locationHelper = locationHelperBuilder({})

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: state => (state.auth && state.auth.access_token) || localStorage.getItem('auth') !== null,
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectPath: '/sign_in'
})

export const userIsNotAuthenticated = connectedRouterRedirect({
  authenticatedSelector: state => !(state.auth && state.auth.access_token) || localStorage.getItem('auth') === null,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false
})
