import { useEffect, useState } from 'react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { router, useForm } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout.jsx'
import { Button, Form, Input } from 'antd'
import { IconAt, IconPasswordUser } from '@tabler/icons-react'

export default function ResetPassword ({ token, email }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const submit = (values) => {
    values['token'] = token
    setLoading(true)
    router.post(route('password.store'), values, {
      onError: (errors) => {
        Object.keys(errors).forEach((key) => {
          form.setFields([{ name: key, errors: [errors[key]] }])
        })
      },
      onFinish: () => {
        setLoading(false)
      },
    })
  }

  return (
    <AuthLayout title={'Reset Password'}>

      <Form onFinish={submit} form={form}>
        <Form.Item name={'email'} initialValue={email} rules={[
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
          { required: true, message: 'Please input your password again!' },
          ({ getFieldValue }) => ({
            validator (_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!'))
            },
          }),
        ]}>
          <Input.Password prefix={<IconPasswordUser size={18}/>}/>
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} htmlType={'submit'} block={true} loading={loading}>Reset Password</Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  )
}
