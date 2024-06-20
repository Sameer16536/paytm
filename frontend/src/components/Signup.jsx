import React from 'react'
import Heading from './Heading'
import SubHeading from './SubHeading'
import Button from './Button'
import { BottomWarning } from './BottomWarning'
import InputBox from './InputBox'

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading  label={"Sign Up"}/>
                <SubHeading label={"Create an account"}/>
                <InputBox placeholder="Nigga" label={'First Name'} />
                <InputBox placeholder="Saurus" label={'Last Name'} />
                <InputBox placeholder="sirdeluxenigga3@gmail.com" label={'Email'} />
                <InputBox placeholder="GiggaNigga45" label={'Password'}/>
                <div className='pt-4'> 
                <Button  label={'Sign up'}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
  )
}

export default Signup