import { Avatar, Button, Col, Row } from 'antd'
import { BiLogOut, BiSolidSun } from 'react-icons/bi'
import { FaMoon } from 'react-icons/fa'
import { useLogoutMutation } from '../../../api/Auth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const NavbarStaff = () => {
  const [logout] = useLogoutMutation()
  const onLogout = () => {
    logout().then(() => {
      window.location.href = '/'
    })
  }
  const [isDarkMode, setIsDarkmode] = useState(false)
  const toggleDarkMode = () => {
    setIsDarkmode((prevMode) => !prevMode)
  }
  return (
    <>
      <Row>
        <Col flex='50%'>
          {/* <Search
                                className='bg-blue-500 mt-[10px] ml=[-50px]'
                                placeholder="input search text"
                                allowClear
                                enterButton="Search"
                                size="large"
                                onSearch={onSearch}
                            /> */}
        </Col>
        <Col flex='30%' className='text-right mt-[-3px]'>
          <Avatar style={{ backgroundColor: '#f56a00', marginRight: '10px' }}>DH</Avatar>
          <Link to={'#'} className='mr-[20px] hidden sm:hidden lg:inline-block'>
            Dang Quang Huy
          </Link>
        </Col>
        <Col flex='20%'>
          <Button className='font-bold text-right hidden sm:inline-block lg:inline-block' onClick={toggleDarkMode}>
            {isDarkMode ? <BiSolidSun /> : <FaMoon />}
          </Button>
          <Button className='bg-green-400 ml-[10px] font-bold text-[#ffffff]' onClick={onLogout}>
            <BiLogOut style={{ transform: 'rotate(180deg)' }} />
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default NavbarStaff
