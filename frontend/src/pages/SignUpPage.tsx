import { useState } from "react"
import { SignUpForm } from "../components/forms/SignUpForm"


const SignUpPage = () => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <div>
    <SignUpForm />
    </div>
  )
}

export default SignUpPage