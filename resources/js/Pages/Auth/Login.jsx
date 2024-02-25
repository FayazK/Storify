import { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout.jsx'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import { IconAt, IconPasswordUser } from '@tabler/icons-react'

export default function Login ({ canResetPassword }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const submit = (values) => {
    setLoading(true)
    router.post(route('login'), values, {
      preserveScroll: true,
      onError: (errors) => {
        Object.keys(errors).forEach((key) => {
          form.setFields([{ name: key, errors: [errors[key]] }])
        })
        form.setFieldValue('password', '')
      },
      onFinish: () => {
        setLoading(false)
      },
    })
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
        <Form.Item name={'password'} rules={[
          { required: true, message: 'Please input your password!' },
        ]}>
          <Input.Password prefix={<IconPasswordUser size={16}/>}/>
        </Form.Item>
        <Flex align={'center'} justify={'space-between'}>
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          {canResetPassword && (
            <Link href={route('password.request')}>
              Forgot your password?
            </Link>
          )}
        </Flex>
        <Form.Item style={{ marginTop: '2rem',marginBottom:0 }}>
          <Button type={'primary'} block={true}
                  loading={loading}
                  htmlType={'submit'}>Login</Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  )// render

}// Login
