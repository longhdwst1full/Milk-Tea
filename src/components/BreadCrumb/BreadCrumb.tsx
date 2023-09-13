import { Breadcrumb } from 'antd'
import { HiHome } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'

const BreadCrumb = () => {
  const location = useLocation()
  const breadCrumbItem = location.pathname.split('/').filter(Boolean)
  return (
    <Breadcrumb className='mb-4'>
      <HiHome className='text-xl mr-[7px]' />
      {breadCrumbItem?.map((item, index) => (
        <Breadcrumb.Item key={index} className='capitalize dark:text-white font-[600]'>
          <Link to={`/${breadCrumbItem.slice(0, index + 1).join('/')}`}>{item}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default BreadCrumb
