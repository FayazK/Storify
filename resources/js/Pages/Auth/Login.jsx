import { useEffect, useState } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Head, Link, router, useForm } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout.jsx'
import { Checkbox, Flex, Form, Input } from 'antd'
import { IconAt, IconLock, IconPasswordUser } from '@tabler/icons-react'

export default function Login ({ status, canResetPassword }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { processing, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const submit = (values) => {
    router.post(route('login'), values)
  }// submit

  return (
    <AuthLayout title={'Login'}>
      <Form onFinish={submit} form={form}>
        <Form.Item name={'email'} rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'The input is not valid E-mail!' },
        ]}>
          <Input prefix={<IconAt stroke={2} size={16}/>}/>
        </Form.Item>
        <Form.Item>
          <Input.Password prefix={<IconPasswordUser size={16}/>}/>
        </Form.Item>
        <Flex align={'center'} justify={'space-between'}>
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{marginBottom:0}}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          {canResetPassword && (
            <Link href={route('password.request')}>
              Forgot your password?
            </Link>
          )}
        </Flex>
      </Form>
    </AuthLayout>
  )
}
