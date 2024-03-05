import React, { useState } from 'react'
import { Layout, Menu, Button, theme } from 'antd'
import {
  IconCameraRotate, IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand,
  IconUpload,
  IconUser,
} from '@tabler/icons-react'

const { Header, Sider, Content } = Layout
const App = ({children}) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <Layout style={{height:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical"/>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <IconUser/>,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <IconCameraRotate/>,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <IconUpload/>,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <IconLayoutSidebarLeftExpand/> :
              <IconLayoutSidebarLeftCollapse/>}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '1rem',
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
            {children}
        </Content>
      </Layout>
    </Layout>
  )
}
export default App
