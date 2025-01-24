import { useState } from "react"
import { SignUpForm } from "../components/forms/Register"



const SignUpPage = () => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <div>
    <SignUpForm />
    </div>
  )
}

export default SignUpPage