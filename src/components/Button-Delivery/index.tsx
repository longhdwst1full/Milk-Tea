import { Link } from 'react-router-dom'
import styles from './Button-Delivery.module.scss'

const ButtonDelivery = () => {
  return (
    <Link to='/products' className={`${styles.btn_delivery}`}>
      <img src='/button_delivery.png' className={`${styles.btn_delivery_img}`} alt='' />
    </Link>
  )
}

export default ButtonDelivery
