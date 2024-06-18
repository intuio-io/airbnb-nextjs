'use client';
import React, {useCallback, useState} from 'react'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from 'react-hot-toast';

// icons
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

// hooks
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

// components
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

// utils
import axiosClient from '@/app/utils/axios-client';

const LoginModal = () => {

  const registerModal  = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axiosClient.post('/auth/signin', data)
      .then(({data}) => {
        localStorage.setItem("ACCESS_TOKEN", data.token);
        toast.success('Logged in successfully!');
        loginModal.onClose();
        setTimeout(() => location.reload(), 300);
      })
      .catch((error) => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
      title="Welcome back" 
      subtitle='Login to your account!'
       />

      <Input 
        id="email" 
        label="Email" 
        disabled={isLoading} 
        register={register} 
        errors={errors}
        required />

      <Input 
        id="password"
        type='password'
        label="Password" 
        disabled={isLoading} 
        register={register} 
        errors={errors}
        required />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr/>
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}}/>
      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}}/>
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            Don't have an account?
          </div>
          <div onClick={() => {loginModal.onClose(); registerModal.onOpen()}} className='text-neutral-800 cursor-pointer hover:underline'>
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading} 
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}/>
  )
}

export default LoginModal