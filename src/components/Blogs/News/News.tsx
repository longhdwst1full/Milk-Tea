import { Avatar, Button, Card } from 'antd'
import { Link } from 'react-router-dom'
import { useGetAllBlogsQuery } from '../../../api/NewBlogs'
import './New.module.scss'
import ReactHtmlParser from 'html-react-parser'
const { Meta } = Card

const News = () => {
  const { data: dataBlog } = useGetAllBlogsQuery()
  console.log(dataBlog)

  return (
    <>
      <div className='grid grid-cols-2 gap-x-[20px] gap-y-[30px] my-[30px]'>
        {dataBlog?.docs?.map((item) => (
          <Card
            key={item._id}
            hoverable
            className='w-[calc(50% - 8px)] bg-[#f5f5f5] hover:bg-[#fff]'
            cover={<img className='w-full' alt={item.images[0].filename} src={item.images[0].url} />}
            // actions={[
            //   <Link to={'#'} className='text-left ml-3'>
            //     <Button className=''>Xem thêm</Button>
            //   </Link>
            // ]}
          >
            <Meta
              className='custom-title  mb-5'
              avatar={<Avatar src='/logo_icon.png' />}
              title={item.name}
              description={ReactHtmlParser(
                item.description.length > 101 ? item.description.slice(0, 101) + '[...]' : item.description
              )}
            />
            <Link to={'#'} className='text-left '>
              <Button className='mt-[25px] text-[#fff] bg-[#d3b673]'>Xem thêm</Button>
            </Link>
          </Card>
        ))}
      </div>
    </>
  )
}

export default News
