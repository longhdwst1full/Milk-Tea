import FooterHomePage from '../Footer-HomePage'
import HeaderHomePage from '../Header-HomePage'
import styles from './Achievement.module.scss'

const Achievement = () => {
  return (
    <>
      <HeaderHomePage />
      <div className={`${styles.page_top_banner}`}>THÀNH TỰU ĐẠT ĐƯỢC</div>
      <div className='max-w-[1111px] m-auto px-4 sm:px-6 lg:px-8'>
        <p className={`${styles.page_title} mt-4 sm:mt-[40px] mb-[25px] lg:text-xl`}>Thành tựu đạt được</p>
        <p className='mb-[10px]'>
          <img
            className='w-[100%] max-w-[100%] mt-[15px] mx-auto'
            src='https://tocotocotea.com/wp-content/uploads/2021/03/ttdd_1024x1024.webp'
            alt=''
          />
        </p>
      </div>
      <FooterHomePage />
    </>
  )
}

export default Achievement
