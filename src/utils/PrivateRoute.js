import React from 'react'
import TokenService from '../services/token-service'
import {Redirect, Route} from 'react-router-dom'

export default function PrivateRoute({ component, ...props }) {
    const Component = component
    return (
      <Route
        {...props}
        render={componentProps => (
          TokenService.hasAuthToken()
            ? <Component {...componentProps} />
            : <Redirect
                to={{
                  pathname: '/login',
                  state: { from: componentProps.location }
                }}
              />
        )}
      />
    )
  }
  