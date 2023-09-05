import { Link } from 'react-router-dom'
import styles from './index.module.scss'

const SiderbarBlog = () => {
  return (
    <div className='sm:w-full lg:w-full max-w-[300px]'>
      <div className={`${styles.category_menu_title} sm:text-[25px] text-center lg:text-[28px]`}>Danh mục tin tức</div>
      <div className='w-full max-w-[260px] mx-auto mb-[70px]'>
        <ul>
          <li className={`${styles.menu_category}`}>
            {' '}
            {/* sm:text-center lg:text-left */}
            <Link to='cau-chuyen-thuong-hieu'>Câu chuyện thương hiệu</Link>
          </li>
          <li className={`${styles.menu_category}`}>
            <Link to='tin-tuc-khuyen-mai'>Tin tức khuyến mãi</Link>
          </li>
          <li className={`${styles.menu_category}`}>
            <Link to='su-kien'>Sự kiện</Link>
          </li>
        </ul>
      </div>
      <div className={`${styles.category_menu_title} hidden sm:hidden lg:inline-block text-[28px] `}>
        <span>Từ khóa</span>
      </div>
    </div>
  )
}

export default SiderbarBlog
