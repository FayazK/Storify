import { Button, Flex, Layout, Menu, Space, theme } from 'antd'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

const { Header, Content, Footer } = Layout

const AppLayout = ({ title, children }) => {
  const { props: { auth } } = usePage()
  const [menuItems, setMenuItems] = useState([])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    auth.user ? setMenuItems([
      {
        key: 'dashboard', label: <Link
          href={route('dashboard')}
        >
          Dashboard
        </Link>,
      },
    ]) : setMenuItems([
      {
        key: 'login', label: <Link
          href={route('login')}>
          Log in
        </Link>,
      },
      {
        key: 'register', label: <Link
          href={route('register')}>
          Register
        </Link>,
      },
    ])
  }, [])

  const handleLogout = () => {
    router.post(route('logout'))
  }// handleLogout

  return (
    <Layout>
      <Head title={title}/>
      <Header>
        <Flex justify={'space-between'} align={'center'}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={menuItems}
            style={{
              flex: 1,
              minWidth: 1,
            }}
          />
          {auth.user &&
            <Space>
              <Button type={'link'} onClick={() => router.visit(
                route('profile.edit'))}>Profile</Button>
              <Button type={'link'} onClick={handleLogout}>Logout</Button>
            </Space>}
        </Flex>
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        {children}
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}
export default AppLayout
