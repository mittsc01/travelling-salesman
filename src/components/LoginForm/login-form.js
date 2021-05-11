import React from 'react'
import RaceContext from '../../LoginContext'
import AuthApiService from '../../services/auth-api-service'


export default class LoginForm extends React.Component {
    

    state = { error: null }
    static contextType = RaceContext
    handleSubmitJwtAuth = ev => {
      ev.preventDefault()
      this.setState({ error: null })
      const { user_name, password } = ev.target
  
      AuthApiService.postLogin({
        user_name: user_name.value,
        password: password.value,
      })
        .then(res => {
          user_name.value = ''
          password.value = ''
          this.context.handleLogin()
          this.props.history.push('/schedule')
        })
        .catch(res => {
          alert(res.error)
          
          this.setState({ error: res.error })
        })
    }

    render(){
        return (<form className='login-form' onSubmit={this.handleSubmitJwtAuth}>
          <div className="form-div">
          <label htmlFor="user_name">username</label>
            <input type='text' placeholder="username" name="user_name"></input>
            <label htmlFor="password">password</label>
            <input type="password" placeholder="password" name="password"></input>
            
          </div>
          <button className="save-button" type="submit">Log in</button>
            
        </form>)
    }
}