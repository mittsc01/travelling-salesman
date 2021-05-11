import React, {useContext} from 'react'
import LoginContext from '../../LoginContext'
import AuthApiService from '../../services/auth-api-service'
export default function About(props){
    const context = useContext(LoginContext)
    const logIn = () => {
        AuthApiService.postLogin({
            user_name: 'demo',
            password: 'password',
          })
            .then(res => {
              
              context.handleLogin()
              props.history.push('/schedule')
            })
            .catch(res => {
              //alert(res.error)
              
              
            
            })
    }
    return (
        <div>
            <h1>Travelling Salesman App</h1>
            <p>Create routes and add them to your schedule.</p>
            <p>Click the 'Go' button for a live demo! <button onClick={() => logIn()}>Go</button></p>
        </div>
    
    )
}