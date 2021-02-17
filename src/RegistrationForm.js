import React from 'react'
import AuthApiService from './services/auth-api-service'





export default class RegistrationForm extends React.Component {
    
    
    
      state = { error: null }
    
      handleSubmit = ev => {
        ev.preventDefault()
        const { full_name, user_name, password,repeat_password } = ev.target
        
        
        AuthApiService.postUser({
          user_name: user_name.value,
          password: password.value,
          full_name: full_name.value,
          repeat_password: repeat_password.value
          
        })
          .then(user => {
            full_name.value = ''
            
            user_name.value = ''
            password.value = ''
            repeat_password.value = ''
            this.props.history.push('/login')
            
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
      }
    render(){
        return (
        <form onSubmit={this.handleSubmit} className="registration-form">
            <label htmlFor="full_name">Name</label>
            <input name="full_name"></input>
            <label htmlFor="user_name">Username</label>
            <input type="text" name="user_name"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password"/>
            <label htmlFor="repeat_password">Repeat Password</label>
            <input type="password" name="repeat_password"/>
            <button type="submit">Register</button>
        </form>
            )
    }
}