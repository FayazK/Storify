import { useEffect, useState } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Head, Link, router, useForm } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout.jsx'
import { Button, Flex, Form, Input } from 'antd'
import { IconAt, IconPasswordUser, IconUser } from '@tabler/icons-react'

export default function Register () {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const submit = (values) => {
    setLoading(true)
    router.post(route('register'), values, {
      preserveScroll: true,
      onError: (errors) => {
        console.log(errors)
        Object.keys(errors).forEach((key) => {
          form.setFields([{ name: key, errors: [errors[key]] }])
        })
        form.setFieldValue('password', '')
      },
      onFinish: () => setLoading(false),
    })
  }// submit

  return (
    <AuthLayout title={'Register'}>
      <Form onFinish={submit} form={form}>
        <Form.Item name={'name'} rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}>
          <Input prefix={<IconUser size={18}/>}/>
        </Form.Item>
        <Form.Item name={'email'} rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'The input is not valid E-mail!' },
        ]}>
          <Input prefix={<IconAt size={18}/>}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[
          { required: true, message: 'Please input your password!' },
        ]}>
          <Input.Password prefix={<IconPasswordUser size={18}/>}/>
        </Form.Item>
        <Form.Item name={'password_confirmation'} rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                'The two passwords that you entered do not match!')
            },
          }),
        ]}>
          <Input.Password prefix={<IconPasswordUser size={18}/>}/>
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} block={true} loading={loading}
                  htmlType={'submit'}>Register</Button>
        </Form.Item>

        <Flex justify={'space-around'}>
          <Link href={route('login')}>
            Already registered?
          </Link>
        </Flex>
      </Form>
    </AuthLayout>
  )
}
