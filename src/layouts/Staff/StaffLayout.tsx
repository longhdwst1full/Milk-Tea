import { Breadcrumb, Layout, theme } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import StaffSidebar from '../../components/Staff/Sidebar'
import NavbarStaff from '../../components/Staff/Navbar/NavbarStaff'
// const { Search } = Input

const { Header, Content, Footer } = Layout
const StaffLayout = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const location = useLocation()
  const breadcrumbItem = location.pathname.split('/').filter(Boolean)
  // breadcrumbItem.unshift('Staff')
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StaffSidebar />
      <Layout>
        <Header style={{ padding: 2, background: colorBgContainer }}>
          <NavbarStaff />
        </Header>
        <Content style={{ display: 'flex', flexDirection: 'column', margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItem?.map((item, index) => (
              <Breadcrumb.Item key={index} className='capitalize'>
                <Link to={`/${breadcrumbItem.slice(0, index + 1).join('/')}`}>{item}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright {new Date().getFullYear()}© TocoToco</Footer>
      </Layout>
    </Layout>
  )
}

export default StaffLayout
