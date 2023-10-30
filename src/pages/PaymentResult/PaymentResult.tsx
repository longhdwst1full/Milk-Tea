import { Button, Result } from 'antd'
import { useEffect, useState } from 'react'
import ConFetti from 'react-confetti'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getAllProducts } from '../../store/services/product.service'
import { RootState } from '../../store/store'
import NewProductItem from '../../components/New-ProductItem'
import { IProduct } from '../../interfaces/products.type'
const PaymentResult = () => {
  const [second, setSecond] = useState<number>(5)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const navigate = useNavigate()
  const { state } = useLocation()
  const dispatch = useAppDispatch()
  const { products } = useAppSelector((state: RootState) => {
    console.log(state)

    return state.persistedReducer.products
  })
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    dispatch(getAllProducts({}))
  }, [dispatch])

  useEffect(() => {
    window.onresize = () => handleWindowResize()
    if (!state) {
      navigate(-1)
    }
    const intervalId = setInterval(() => {
      if (second === 0) return
      setSecond((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [second, windowWidth])

  return (
    <>
      <div className='min-h-[100vh] overflow-hidden'>
        <ConFetti
          className={`transition-opacity duration-1000 pointer-events-none ${second <= 0 ? 'opacity-0 ' : ''}`}
          width={windowWidth}
          height={window.innerHeight}
        />
        <div className='mt-20'>
          <div className='my-0 mx-auto bg-white rounded-lg'>
            <div className='flex justify-center items-center'>
              <Result
                className='bg-white  shadow-lg rounded-xl w-[calc(100%-20px)] md:w-max'
                status='success'
                title='Chúc mừng bạn đã đặt hàng thành công 🎉'
                subTitle='Đơn hàng đang được xử lý.Quá trình này sẽ mất 1 chút thời gian,bạn vui lòng đợi nhé!'
                extra={[
                  <Button
                    size='large'
                    className='bg-[#D8B979] hover:!bg-transparent hover:!text-[#D8B979] hover:border-[#D8B979]'
                    type='primary'
                    key='console'
                    onClick={() => navigate('/account-layout/my-order')}
                  >
                    Xem đơn hàng
                  </Button>,
                  <Button
                    size='large'
                    key='buy'
                    className='hover:!bg-transparent hover:!text-[#D8B979] hover:!border-[#D8B979]'
                    onClick={() => navigate('/products')}
                  >
                    Tiếp tục mua hàng
                  </Button>
                ]}
              />
            </div>

            <div className='suggest-products mt-20 max-w-[1140px] mx-auto'>
              <div className='title flex flex-col items-center'>
                <div className='sub-title'>
                  <h4 className='text-[#d3b673] text-[22px] mb-[5px] font-bold '>MilkTea Menu</h4>
                </div>
                <div className='main-title'>
                  <h2 className='text-3xl md:text-4xl text-center text-black px-[50px] uppercase font-bold mb-2'>
                    Có thể bạn sẽ thích
                  </h2>
                </div>
                <div className='bg_title'></div>
              </div>
              <div className='list mt-[50px] flex flex-wrap '>
                {products &&
                  products?.docs?.length > 0 &&
                  products?.docs
                    .slice(0, 4)
                    ?.map((product: IProduct) => <NewProductItem key={product._id} product={product} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentResult
