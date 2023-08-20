import { RootState } from '../../store/store';
import { useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useForm } from 'react-hook-form';
import { InforForm, InforFormSchema } from '../../validate/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateInforMutation } from '../../api/Auth';
import { toast } from 'react-toastify';
import convertToBase64 from '../../utils/convertBase64';
import { useUpLoadAvartaUserMutation } from '../../api/User';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const MyInfor = () => {
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth);
  const [birthday, setBirthday] = useState<Date | null>(user.birthday!);
  const [errDate, setErrDate] = useState('');
  const [updateInfor, { isLoading: isUpdateInfor }] = useUpdateInforMutation();
  const [avatar, setAvatar] = useState<{ file: any; base64: string }>({ file: '', base64: '' });
  const [uploadAvatar, { isLoading: isUpdateAvatar }] = useUpLoadAvartaUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InforForm>({
    mode: 'onSubmit',
    resolver: yupResolver(InforFormSchema),
    defaultValues: {
      _id: user._id,
      username: user.username,
      account: user.account,
      gender: user.gender,
      address: user.address,
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    await convertToBase64(file).then((data) => {
      setAvatar({
        file: file,
        base64: data,
      });
    });
  };

  const handleDateChange = (selectedDates: Date[]) => {
    console.log(selectedDates);

    const selected = selectedDates[0] || null;
    setBirthday(selected);
  };

  const validateDate = (selectedDate: any) => {
    if (!selectedDate) {
      setErrDate('Sinh nhật không hợp lệ');

      return false; // Date is not selected
    }

    setErrDate('');

    return true; // Date is valid
  };

  useEffect(() => {
    // Flatpickr()
  });

  const ChangeInfor = (dataUpdate: any) => {
    updateInfor(dataUpdate).then(({ data }: any) => {
      if (data.error) {
        toast.error(data.error, {
          position: 'top-right',
        });
      } else {
        toast.success(data.message, {
          position: 'top-right',
        });
      }
    });
  };

  const onInfor = (dateUpdate: InforForm) => {
    if (!errDate) {
      if (avatar.file) {
        const form = new FormData();
        form.append('images', avatar.file);
        uploadAvatar(form).then(({ data: { urls } }: any) => {
          ChangeInfor({ ...dateUpdate, birthday: birthday!, avatar: urls[0].url });
        });
      } else {
        ChangeInfor({ ...dateUpdate, birthday: birthday! });
      }
    }
  };

  return (
    <div className="my-account grow ">
      <div className="account flex flex-col">
        <div className="bg-top-account"></div>

        <div className="account-content relative -top-5 bg-[#fff] mx-4 rounded-md">
          <div className="account-avatar absolute -top-[60px] left-[calc(50%-60px)] h-[120px] w-[120px] bg-[#fff] rounded-full border-[5px] border-white">
            <div className="avatar">
              <div>
                <img className="w-full rounded-full" src={avatar.base64 || user?.avatar} />
              </div>
              <div className="image-upload">
                <label className="btn-change-photo" htmlFor="file-input"></label>
                <input
                  className="hidden"
                  id="file-input"
                  onChange={(e) => {
                    (async () => {
                      await handleFileUpload(e);
                    })();
                  }}
                  type="file"
                />
              </div>
            </div>
          </div>

          <div className="profile mt-[90px] px-[20px] h-[30rem] text-sm relative">
            {/* {isLoading} */}
            <form action="" onSubmit={handleSubmit(onInfor)} className="h-full">
              {isUpdateInfor || isUpdateAvatar ? (
                <Box
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress color="success" size={70} />
                </Box>
              ) : (
                <div className="flex flex-wrap">
                  <div className="item-profile w-[50%] my-3 ">
                    <label className="block py-2 text-[#959393] ">Mã thành viên</label>
                    <input
                      className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                      type="text"
                      {...register('_id')}
                      name="_id"
                      readOnly
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3 ">
                    <label className="block py-2 text-[#959393]">Điểm</label>
                    <input
                      className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                      type="text"
                      name="grade"
                      defaultValue={user.grade}
                      readOnly
                    />
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Họ và tên</label>
                    <input
                      className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                      type="text"
                      {...register('username')}
                      name="username"
                    />
                    <span className="text-red-500">
                      {errors.username && errors.username.message}
                    </span>
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Sinh nhật</label>
                    <Flatpickr
                      className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                      value={birthday!}
                      onChange={handleDateChange}
                      onClose={(_, selectedDates) => {
                        const isValid = validateDate(selectedDates);
                        if (!isValid) {
                          setBirthday(null);
                        }
                      }}
                      options={{ dateFormat: 'd/m/Y', allowInput: true }}
                    />
                    <span className="text-red-500">{errDate && errDate}</span>
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Tài khoản</label>
                    <input
                      className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                      type="text"
                      {...register('account')}
                      name="account"
                      readOnly
                    />
                    <span className="text-red-500">{errors.account && errors.account.message}</span>
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Giới tính</label>
                    <div className="w-full h-[2.25rem] flex justify-center items-center gap-4 g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none">
                      <label htmlFor="" className="flex items-center">
                        <input
                          type="radio"
                          value="male"
                          {...register('gender')}
                          name="gender"
                          id=""
                          className="cursor-pointer"
                        />
                        <span>:Nam</span>
                      </label>
                      <label htmlFor="" className="flex items-center">
                        <input
                          type="radio"
                          value="female"
                          {...register('gender')}
                          name="gender"
                          id=""
                          className="cursor-pointer"
                        />
                        <span>:Nữ</span>
                      </label>
                      <label htmlFor="" className="flex items-center">
                        <input
                          type="radio"
                          value="other"
                          {...register('gender')}
                          name="gender"
                          id=""
                          className="cursor-pointer"
                        />
                        <span>:Khác</span>
                      </label>
                    </div>
                    <span className="text-red-500">{errors.gender && errors.gender.message}</span>
                    {/* <input
                    className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                    type="text"
                  /> */}
                  </div>
                  <div className="item-profile w-[50%] my-3">
                    <label className="block py-2 text-[#959393]">Địa chỉ mặc định</label>
                    <input
                      className="w-full g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none"
                      type="text"
                      {...register('address')}
                      name="address"
                    />
                    <span className="text-red-500">{errors.address && errors.address.message}</span>
                  </div>
                </div>
              )}
              <div className="text-center my-5 left-0 right-0 absolute bottom-0">
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
