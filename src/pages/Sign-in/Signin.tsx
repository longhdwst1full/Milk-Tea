import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../api/Auth';
import { Button, Input } from '../../components';
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Login, LoginSchema } from '../../validate/Form';
import { IUser } from '../../interfaces/user.type';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CardSigin from '../../components/CardSignin';
import { BiLogoGoogle, BiLogoFacebookSquare, BiLogoTwitter } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// type Props = {};

// type Login = {
//   account: string;
//   password: string;
// };

const Signin = () => {
  const [loginUser, { isSuccess }] = useLoginMutation();
  // const { user } = useSelector((state: RootState) => state.persistedReducer.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });
  const navigate = useNavigate();
  const onLogin = (loginData: IUser) => {
    loginUser(loginData).then((data: any) => {
      if (data.error) {
        return toast.error(data.error.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
  };

  return (
    <div className="background-container">
      <div className="flex items-center justify-center h-full">
        <div className="content background-content bg-white w-[90vw] md:w-[500px] h-[600px] mx-6 md:px-[100px] py-6 flex justify-center items-center flex-col rounded">
          <div className="logo">
            <img src="/logo.png" alt="" className="w-[200px] mb-5" />
          </div>
          <form action="" className="flex flex-col" onSubmit={handleSubmit(onLogin)}>
            <Input
              type="auth"
              placeholder="Nhập SDT hoặc email của bạn"
              name="account"
              register={register}
              error={errors.account?.message}
            />
            <Input
              type="auth"
              placeholder="Nhập mật khẩu của bạn"
              name="password"
              error={errors.password?.message}
              register={register}
              typeInput="password"
            />
            <div className="text-right mt-4 font-bold text-[#d4b774] text-sm">Quên mật khẩu?</div>
            <Button type="auth" size="large" shape="circle">
              Đăng nhập
            </Button>
            <div className="flex justify-center gap-1">
              <CardSigin
                bgColor="#dc2626"
                color="#fafafa"
                icon={<BiLogoGoogle />}
                colorHover="#fef2f2"
                bgColorHover="#991b1b"
                LoginIn="google"
              />
              <CardSigin
                bgColor="#0369a1"
                color="#fafafa"
                icon={<BiLogoFacebookSquare />}
                colorHover="#fef2f2"
                bgColorHover="#075985"
                LoginIn="facebook"
              />
              <CardSigin
                bgColor="#0891b2"
                color="#fafafa"
                icon={<BiLogoTwitter />}
                colorHover="#fef2f2"
                bgColorHover="#075985"
                LoginIn="twitter"
              />
            </div>
            <div className="flex items-center justify-center my-5 text-sm gap-x-2">
              <div>Bạn chưa có tài khoản?</div>
              <div className="font-semibold ">
                <Link to="/signup" className="text-[#d4b774]">
                  Tạo tài khoản
                </Link>
              </div>
            </div>
          </form>
          <div>
            <Link to="/" className="text-sm text-[#007bff] hover:underline">
              Quay lại màn hình chính
            </Link>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Signin;
