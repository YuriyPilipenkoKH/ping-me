import { SignUpForm } from "../components/forms/SignUpForm"
import Logo from "../components/nav/Logo"
import { Link } from "react-router-dom"


const SignUpPage = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <Logo/>
        <SignUpForm />
        <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage