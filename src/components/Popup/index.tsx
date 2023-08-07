import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
type Props = {};

const Popup = (props: Props) => {
  const [isShowPopup, setIsShowPopup] = useState<boolean>(true);

  useEffect(() => {
    const closedTime = JSON.parse(localStorage.getItem('closedTime')!);

    const now = new Date().getTime();

    if (closedTime && now - closedTime <= 10 * 60 * 1000) {
      setIsShowPopup(false);
    }
  }, []);

  const handleClick = () => {
    localStorage.setItem('closedTime', JSON.stringify(new Date().getTime()));
    setIsShowPopup(false);
  };

  return isShowPopup ? (
    <div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] sm:w-auto sm:h-auto z-10">
        <div className="btn-close absolute -right-[30px] -top-[30px] ">
          <button
            onClick={handleClick}
            className="rounded-[50%] py-[5px] px-[10px]  z-[6] w-[30px] h-[30px] bg-white flex items-center justify-center group"
          >
            <FaTimes className="group-hover:scale-[1.1]" />
          </button>
        </div>
        <div className="content">
          <Link to="/products">
            <img
              className="w-full"
              src="https://tocotocotea.com/wp-content/uploads/2023/06/z4464528172206_690eb284c1df88d468d9aa6e470d4af7.jpg"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div
        onClick={handleClick}
        className="overlay fixed w-[100vw] h-[100vh] top-0 left-0 z-[1] bg-[#80808080]"
      ></div>
    </div>
  ) : (
    <></>
  );
};

export default Popup;
