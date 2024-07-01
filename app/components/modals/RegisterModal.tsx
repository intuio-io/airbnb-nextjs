'use client';
import React, {useState} from 'react'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from 'react-hot-toast';

// actions
import { getCurrentUser } from '@/app/store/actions/authActions';

// hooks
import useHomeStore from '@/app/store/homeStore';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

// components
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';

// utils
import axiosClient from '@/app/utils/axios-client';

const RegisterModal = () => {
  const { addUser } = useHomeStore();
  const registerModal  = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const response = await axiosClient.post('/auth/register', data);
      localStorage.setItem("ACCESS_TOKEN", response.data.token);

      const userDetails = await getCurrentUser();
      addUser(userDetails);
      toast.success(response?.data?.message);
      reset();
      registerModal.onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading 
      title="Welcome to RapidStay" 
      subtitle='Create an account!'
       />

      <Input 
        id="email" 
        label="Email" 
        disabled={isLoading} 
        register={register} 
        errors={errors}
        required />

      <Input 
        id="name" 
        label="Name" 
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
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            Already have an account?
          </div>
          <div onClick={() => {registerModal.onClose(); loginModal.onOpen()}} className='text-neutral-800 cursor-pointer hover:underline'>
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal 
      disabled={isLoading} 
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}/>
  )
}

export default RegisterModal
