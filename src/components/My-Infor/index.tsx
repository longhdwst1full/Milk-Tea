import { RootState } from '../../store/store';
import { useAppSelector } from '../../store/hooks';

type Props = {};

const MyInfor = (props: Props) => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth);
  console.log(user);

  return (
    <div className="my-account grow ">
      <div className="account flex flex-col">
        <div className="bg-top-account"></div>

        <div className="account-content relative -top-5 bg-[#fff] mx-4 rounded-md">
          <div className="account-avatar absolute -top-[60px] left-[calc(50%-60px)] h-[120px] w-[120px] bg-[#fff] rounded-full border-[5px] border-white">
            <div className="avatar">
              <div>
                <img className="w-full rounded-full" src={user?.avatar} />
              </div>
              <div className="image-upload">
                <label className="btn-change-photo" htmlFor="file-input"></label>
                <input className="hidden" id="file-input" type="file" />
              </div>
            </div>
          </div>

          <div className="profile mt-[90px] px-[20px] text-sm">
            <form action="">
              <div className="flex flex-wrap">
                <div className="item-profile w-[50%] my-3 ">
                  <label className="block py-2 text-[#959393] ">Mã thành viên</label>
                  <input
                    className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                    type="text"
                  />
                </div>
                <div className="item-profile w-[50%] my-3 ">
                  <label className="block py-2 text-[#959393]">Điểm</label>
                  <input
                    className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                    type="text"
                  />
                </div>
                <div className="item-profile w-[50%] my-3">
                  <label className="block py-2 text-[#959393]">Họ và tên</label>
                  <input
                    className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                    type="text"
                  />
                </div>
                <div className="item-profile w-[50%] my-3">
                  <label className="block py-2 text-[#959393]">Sinh nhật</label>
                  <input
                    className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                    type="text"
                  />
                </div>
                <div className="item-profile w-[50%] my-3">
                  <label className="block py-2 text-[#959393]">Tài khoản</label>
                  <input
                    className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                    type="text"
                    defaultValue={user?.account}
                  />
                </div>
                {/* <div className="item-profile w-[50%] my-3">
                  <label className="block py-2 text-[#959393]">Email</label>
                  <input
                    className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                    type="text"
                  />
                </div> */}
                <div className="item-profile w-[50%] my-3">
                  <label className="block py-2 text-[#959393]">Giới tính</label>
                  <input
                    className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                    type="text"
                  />
                </div>
                <div className="item-profile w-[50%] my-3">
                  <label className="block py-2 text-[#959393]">Địa chỉ mặc định</label>
                  <input
                    className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                    type="text"
                  />
                </div>
              </div>
              <div className="text-center my-5">
                <button
                  className="btn bg-[#d8b979] text-white rounded-xl w-[calc(50%-30px)] uppercase cursor-pointer h-[36px]"
                  type="submit"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfor;
