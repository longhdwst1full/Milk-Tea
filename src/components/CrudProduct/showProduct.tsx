import { memo, useState } from 'react'

import { AiFillEye } from 'react-icons/ai'
import { BiSolidDiscount } from 'react-icons/bi'
import { Button, Tooltip } from 'flowbite-react'
import { IProduct } from '../../interfaces/products.type'
import { Modal } from 'antd'
import Slider from 'react-slick'
import { Table } from 'antd'
import { formatCurrency } from '../../utils/formatCurrency'
import parse from 'html-react-parser'
import { saleCaculator } from '../../utils/saleCaculator'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  product: IProduct
}

const ShowProduct = ({ product }: Props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear'
  }
  const [isOpen, setIsOpen] = useState(false)
  const handleCancel = () => {
    setIsOpen(false)
  }

  const columns = [
    {
      dataIndex: 'name',
      key: 'name'
    },
    {
      dataIndex: 'price',
      key: 'price',
      width: 200,
      render: (price: number) => <span className='max-w-[200px]'>{formatCurrency(price)}</span>
    }
  ]

  return (
    <div>
      <Tooltip content='Xem trước sản phẩm'>
        <Button className='bg-yellow-500' onClick={() => setIsOpen(true)}>
          <AiFillEye />
        </Button>
      </Tooltip>
      <Modal
        footer={null}
        title='Sản phẩm chi tiết'
        width={1000}
        style={{ top: 20 }}
        open={isOpen}
        onCancel={handleCancel}
      >
        <div className='flex gap-4'>
          <div className='w-[40%]'>
            <Slider {...settings}>
              {product.images.map((url) => (
                <div key={url.url}>
                  <img src={url.url} alt={product.name} className='w-full' />
                </div>
              ))}
            </Slider>
          </div>
          <div className='flex-1'>
            <div className='flex flex-col'>
              <h1 className='text-2xl font-bold capitalize flex gap-2 flex-wrap items-center'>
                <span className='text-2xl font-bold'>{product.name}</span>{' '}
                {product.sale && (
                  <span className='text-2xl font-bold flex items-center'>
                    <span className='mt-[2px]'>
                      <BiSolidDiscount />
                    </span>
                    <span className=''>{saleCaculator(product.sizes[0].price, product.sale)}%</span>
                  </span>
                )}
              </h1>
              <span className=''>
                {product.category.name} - {`Sale: ${formatCurrency(product.sale)}`}
              </span>
              <div className='mt-5'>
                <h2 className='font-semibold text-lg'>Description</h2>
                <span className=''>{parse(product.description)}</span>
              </div>
              <div className='mt-14 relative'>
                <div className='absolute -top-4 left-0 w-full bg-gray-200 h-[1px] z-10'></div>
                <div className='absolute -top-8 z-10 left-4 bg-white px-4'>
                  <h2 className='font-semibold text-lg'>Size</h2>
                </div>
                <Table
                  dataSource={product.sizes.map((item) => ({ ...item, key: uuidv4() }))}
                  columns={columns}
                  pagination={false}
                />
              </div>
              <div className='mt-14 relative'>
                <div className='absolute -top-4 left-0 w-full bg-gray-200 h-[1px] z-10'></div>
                <div className='absolute -top-8 z-10 left-4 bg-white px-4'>
                  <h2 className='font-semibold text-lg'>Topping</h2>
                </div>
                <Table
                  dataSource={product.toppings.map((item) => ({ ...item, key: uuidv4() }))}
                  columns={columns}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default memo(ShowProduct)
