import '@css/auth.css'
import { Card, Flex, Space, Typography } from 'antd'
import { Head } from '@inertiajs/react'
import ApplicationLogo from '@/Components/ApplicationLogo.jsx'

export default function AuthLayout ({ title, children }) {
  return (
    <Flex align={'center'} vertical={true} justify={'space-around'}
          className={'vh-100'}>
      <Head title={title}/>
      <Space direction={'vertical'} align={'center'}>
        <ApplicationLogo className={'logo'}/>
        <Card title={title} styles={{
          title: { textAlign: 'center' },
          header: { border: 'none' },
        }}>
          {children}
        </Card>
        <Typography.Text className={'copyright'} type={'secondary'}>
          &copy; {new Date().getFullYear()}
        </Typography.Text>
      </Space>
    </Flex>
  )

}// AuthLayout
