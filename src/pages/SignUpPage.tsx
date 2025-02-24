import AuthImagePattern from "../components/auth/AuthImagePattern"
import { SignUpForm } from "../components/forms/SignUpForm"
import Logo from "../components/nav/Logo"
import { Link } from "react-router-dom"
import { logoProps } from "../data/logoProps"


const SignUpPage = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <Logo title={logoProps.signupTitle}/>
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
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default SignUpPage