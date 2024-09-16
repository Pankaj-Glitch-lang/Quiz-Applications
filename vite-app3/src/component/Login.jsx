import { Card ,FormControl, Input,Button,CardBody,Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CheckLogin from './CheckLogin';
import { useNavigate } from 'react-router-dom';
import QuizApp from './QuizApp';


const Login = () => {

    const dispatch=useDispatch();
    const {isLoading, isError,token}=useSelector((state)=>state.auth)
    const[email, setEmail]=useState('');
    const[password,setPassword]=useState('')
    console.log("token ===>", token)

   
      const navigate=useNavigate();

    useEffect(()=>{

      if(token){
        navigate('/quiz')
      }

    },[token,navigate])


    const handleSubmit=(e)=>{
            e.preventDefault();
            console.log("Form Clicked")
           
            dispatch(CheckLogin(email, password ));
    }

    const handleChange=(e)=>{
        const{name,value}=e.target;
        if(name=='email'){
            setEmail(value);
        }
       else if(name=='password'){
            setPassword(value)
        }

    }
    return (
        <Card borderRadius={30}  m={'auto'} w={650} h={400} mt={100} textAlign={'center'} bg={'lightcyan'} bgImage={'https://img.freepik.com/free-vector/neon-question-mark-frame-quiz-lighting-interrogation-point-red-neon-lamp-bricks-wall-texture-background-illustration_102902-1207.jpg?size=626&ext=jpg'}>
               <Text bgColor={'yellow'}fontWeight={'bold'} fontSize={30} >Login for the Quiz</Text>
            <CardBody justify={'center'} margin={10}>
                <FormControl  >
                    <Input fontSize={'large'} bgColor={'yellow'}fontWeight={'bold'} m={5} type="email" name='email' onChange={handleChange} value={email} placeholder='Enter your email' required/>
                    <Input bgColor={'yellow'} fontSize={'large'} fontWeight={'bold'} m={5} type="password" name='password' value={password} placeholder='Enter Password' required onChange={handleChange} />
                    <Button bgColor={'yellow'}mt={7} fontSize={'larger'} fontWeight={'bold'} type='submit' onClick={handleSubmit} isLoading={isLoading}>Login</Button>
                </FormControl>

                {isError && < Text color="red" fontSize={20} fontWeight={'bold'}>Error logging in. Please try again.</Text>}
                {token && <Text color="green" fontSize={20} fontWeight={'bold'}>Login successful! Token: {token}</Text>}
            </CardBody>
           
       
          
        </Card>
    )
}

export default Login