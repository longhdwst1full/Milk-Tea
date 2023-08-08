import { Button } from '..';
import { Link } from 'react-router-dom';
import React from 'react';

type Props = {};

const News = (props: Props) => {
  return (
    <div className="container mx-auto">
      <div className="title flex flex-col items-center mb-8">
        <h4 className="text-[#d3b673] text-[22px] mb-[5px] font-bold">Tin Tức và Khuyến Mãi</h4>
        <h3 className="text-center  text-3xl md:text-4xl font-bold text-black uppercase mb-2">
          KHÁM PHÁ NHẬN NGAY KHUYẾN MÃI
        </h3>
        <div className="bg_title"></div>
      </div>
      <div className="news-content mb-10 flex flex-col md:flex-row justify-center ">
        <div className="left w-full md:w-1/2 mr-2 flex flex-wrap">
          <Link
            to="/"
            className="block w-full m-0 bg-[#f5f5f5] mb-[30px] transition-all group shadow-[3.5px_6px_18px_0_rgb(0,0,0/10%)]"
          >
            <div className="img overflow-hidden">
              <img
                className="w-full transition-all group-hover:scale-[1.1]"
                src="https://tea.com/wp-content/uploads/2023/04/hinhthumb-scaled.jpg"
                alt=""
              />
            </div>
            <div className="info p-[15px]">
              <div className="title">
                <h3 className="text-sm uppercase mb-[5px] text-[#282828] font-[700]">
                  Ice Cream – Coffee bán kem 10.000 đồng khiến mạng xã hội khấy đảo
                </h3>
              </div>
              <div className="description mt-8">
                <p className="text-sm">
                  Với món kem 10.000 đồng và đồ uống chỉ 25.000 đồng, nhiều người trẻ với mức thu
                  nhập trung bình dễ dàng chi trả, Ice Cream – Coffee đang […]
                </p>
              </div>
              <div className="btn mt-4">
                {/* <button className="py-1 px-4 text-[16px] mt-4 border border-[#d3b673] bg-[#d3b673] text-white uppercase">
                  Xem thêm
                </button> */}
                <Button
                  size="medium"
                  shape="square"
                  style="hover:bg-white hover:text-[#d3b673] hover:border hover:border-[#d3b673]"
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="mr-2 w-[calc(50%-8px)] bg-[#f5f5f5] mb-[30px] overflow-hidden transition-all text-black group"
          >
            <div className="img overflow-hidden">
              <img
                className="w-full transition-all group-hover:scale-[1.1]"
                src="https://tea.com/wp-content/uploads/2022/07/Hinh-thumb-2-scaled.jpg"
                alt=""
              />
            </div>
            <div className="info p-[15px] ">
              <div className="title">
                <h3 className="text-sm uppercase mb-[5px] font-[700] text-[#282828]">
                  “cháy” cùng hàng trăm học sinh Amsterdam và Chuyên Ngoại Ngữ trong chương trình
                  Camp Aletheia
                </h3>
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="mr-2 w-[calc(50%-8px)] bg-[#f5f5f5] mb-[30px] overflow-hidden transition-all text-black group"
          >
            <div className="img overflow-hidden">
              <img
                className="w-full transition-all group-hover:scale-[1.1]"
                src="https://tea.com/wp-content/uploads/2022/07/Hinh-thumb-2-scaled.jpg"
                alt=""
              />
            </div>
            <div className="info p-[15px] ">
              <div className="title">
                <h3 className="text-sm uppercase mb-[5px] font-[700] text-[#282828]">
                  “cháy” cùng hàng trăm học sinh Amsterdam và Chuyên Ngoại Ngữ trong chương trình
                  Camp Aletheia
                </h3>
              </div>
            </div>
          </Link>
          <Link
            to="/"
            className="mr-2 w-[calc(50%-8px)] bg-[#f5f5f5] mb-[30px] overflow-hidden transition-all text-black group"
          >
            <div className="img overflow-hidden">
              <img
                className="w-full transition-all group-hover:scale-[1.1]"
                src="https://tea.com/wp-content/uploads/2022/07/Hinh-thumb-2-scaled.jpg"
                alt=""
              />
            </div>
            <div className="info p-[15px] ">
              <div className="title">
                <h3 className="text-sm uppercase mb-[5px] font-[700] text-[#282828]">
                  “cháy” cùng hàng trăm học sinh Amsterdam và Chuyên Ngoại Ngữ trong chương trình
                  Camp Aletheia
                </h3>
              </div>
            </div>
          </Link>
        </div>
        <div className="right w-full md:w-1/2 md:ml-2">
          <div className="main-content ">
            <Link to="/" className="group ">
              <div className="relative overflow-hidden">
                <div className="img">
                  <img
                    className="w-full transition-all group-hover:scale-[1.1]"
                    src="https://tea.com/wp-content/uploads/2021/07/video_bg.png"
                    alt=""
                  />
                </div>
                <div className="title py-2 px-1 absolute bottom-0 shadow-[0_2px_9px]">
                  <h3 className="text-white text-center text-sm md:text-[18px]">
                    CON ĐƯỜNG KHỞI NGHIỆP CỦA NGƯỜI SÁNG LẬP THƯƠNG HIỆU TRÀ SỮA VIỆT NAM -
                  </h3>
                </div>
              </div>
            </Link>
            <div className="flex flex-col gap-y-6 items-center mt-[30px]">
              <Link to="/" className="group">
                <div className="flex items-center gap-x-4 overflow-hidden">
                  <div className="img w-[160px]">
                    <img
                      className="w-full transition-all group-hover:scale-[1.1]"
                      src="https://tea.com/wp-content/uploads/2021/07/TACO_THU%CC%9BO%CC%9BNG-HIE%CC%A3%CC%82U-TIE%CC%82U-BIE%CC%82%CC%89U-CHA%CC%82U-A%CC%81-THA%CC%81I-BI%CC%80NH-DU%CC%9BO%CC%9BNG-2021.jpg"
                      alt=""
                    />
                  </div>
                  <div className="title">
                    <h4 className="text-[#282828] text-[16px] font-[700]">
                      đạt top 10 thương hiệu Châu Á Thái Bình Dương 2021
                    </h4>
                  </div>
                </div>
              </Link>
              <Link to="/" className="group">
                <div className="flex items-center gap-x-4 overflow-hidden">
                  <div className="img w-[160px]">
                    <img
                      className="w-full transition-all group-hover:scale-[1.1]"
                      src="https://tea.com/wp-content/uploads/2021/07/TACO_THU%CC%9BO%CC%9BNG-HIE%CC%A3%CC%82U-TIE%CC%82U-BIE%CC%82%CC%89U-CHA%CC%82U-A%CC%81-THA%CC%81I-BI%CC%80NH-DU%CC%9BO%CC%9BNG-2021.jpg"
                      alt=""
                    />
                  </div>
                  <div className="title">
                    <h4 className="text-[#282828] text-[16px] font-[700]">
                      đạt top 10 thương hiệu Châu Á Thái Bình Dương 2021
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
