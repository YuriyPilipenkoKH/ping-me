import Logo from '../components/nav/Logo'
import { Link } from 'react-router-dom'
import LoginForm from '../components/forms/LoginForm'
import AuthImagePattern from '../components/AuthImagePattern'
  

const LoginPage = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <Logo/>
      <LoginForm />
      <div className="text-center">
          <p className="text-base-content/60">
            Need an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
  </div>
  )
}

export default LoginPage