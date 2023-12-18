import { Avatar, Button, Card, Empty } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetAllBlogsQuery } from '../../../api/NewBlogs'
import './New.module.scss'
import ReactHtmlParser from 'html-react-parser'
const { Meta } = Card

const News = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: dataBlog } = useGetAllBlogsQuery()
  const listBlogsByIdCate = dataBlog && dataBlog?.docs?.filter((item) => item?.category?._id === id)
  if (listBlogsByIdCate && listBlogsByIdCate.length <= 0) {
    return (
      <div className='flex items-center justify-center w-full py-4'>
        <Empty
          className='flex items-center flex-col'
          image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
          imageStyle={{ height: 200 }}
          description={<span>Hiện tại chưa có bài viết nào!</span>}
        />
      </div>
    )
  }
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[30px] my-[30px]'>
        {listBlogsByIdCate?.map((item) => (
          <Card
            onClick={() => navigate(`/blogs/${item._id}`)}
            key={item._id}
            hoverable
            className='w-[calc(50% - 8px)] bg-[#f5f5f5] hover:bg-[#fff]'
            cover={
              <img
                className='w-full max-h-[200px] object-cover'
                alt={item.images[0].filename}
                src={item.images[0].url}
              />
            }
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
              <Button className='mt-[25px] hover:!text-[#d3b673] hover:bg-transparent hover:!border-[#d3b673]  text-[#fff] bg-[#d3b673]'>
                Xem thêm
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </>
  )
}

export default News
