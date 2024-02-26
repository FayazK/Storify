import {  Link, router } from '@inertiajs/react'
import AuthLayout from '@/Layouts/AuthLayout.jsx'
import { Alert, Button, Flex, Form, Typography } from 'antd'
import { useState } from 'react'

export default function VerifyEmail() {
    const [form] = Form.useForm();
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const submit = (values) => {
        router.post(route('verification.send'),values,{
            onSuccess:(props)=>{
                setStatus(props.props.status)
            },
            onError: (errors) => {
                console.error(errors)
            },
            onFinish: () => {
                setLoading(false)
            },
        })
    }// submit

    return (
        <AuthLayout title={'Email Verification'}>

            <Typography.Paragraph >
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
            </Typography.Paragraph>

            {status === 'verification-link-sent' && (
                <Alert type={'success'} closable={true} className={'mt-1 mb-1'}>
                    A new verification link has been sent to the email address you provided during registration.
                </Alert>
            )}

            <Form onFinish={submit} form={form}>
                <Form.Item>
                    <Button type={'primary'} htmlType={'submit'} block={true} loading={loading}>
                        Resend Verification Email
                    </Button>
                </Form.Item>
                <Flex justify={'space-around'}>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Log Out
                    </Link>
                </Flex>
            </Form>
        </AuthLayout>
    );
}
