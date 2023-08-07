import { HiTrash, HiUpload } from 'react-icons/hi';
import { useDeleteImageUserMutation, useUpLoadAvartaUserMutation } from '../../api/User';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IImage } from '../../interfaces/image.type';
import Swal from 'sweetalert2';

type UserUploadProps = {
  urlAvatar: IImage;
  setUrlAvatar: React.Dispatch<React.SetStateAction<IImage>>;
  upLoadAvartaUser: any;
  deleteImageUser: any;
};

const UserUpload = ({
  urlAvatar,
  setUrlAvatar,
  upLoadAvartaUser,
  deleteImageUser,
}: UserUploadProps) => {
  const handleChangeUpload = (event: any) => {
    const file = event.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append('images', file);

    upLoadAvartaUser(formData).then(({ data }: any) => {
      toast.success('Upload success');
      setUrlAvatar(data.urls[0]);
    });
  };

  const handleDeleteUserImage = (id: string) => {
    deleteImageUser(id)
      .then(() => {
        setUrlAvatar({} as IImage);
        toast.success('Delete image success');
      })
      .catch((err: any) => toast.error(`Delete image failed ${err.message}`));
  };
  return (
    <>
      <div className="lg:col-span-2">
        <div className="flex w-full items-center justify-center">
          <label className="flex h-28 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
            <div className="flex flex-col h-full items-center justify-center pt-5 pb-6">
              <HiUpload className="text-4xl text-gray-300" />
              <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                Upload a file or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              type="file"
              hidden
              // {...register('avatar')}
              // onChange={(e) => handleChangeUpload(e)}
              onChange={(e) => handleChangeUpload(e)}
            />
          </label>
        </div>
      </div>
      {Object.keys(urlAvatar).length > 0 && (
        <div className="flex mt-5 w-full items-center">
          <div>
            <img alt={urlAvatar.filename} src={urlAvatar.url} className="h-28 w-28 rounded-full" />
            <span
              className="cursor-pointer"
              onClick={() => handleDeleteUserImage(urlAvatar.publicId)}
            >
              <span className="sr-only">Delete</span>
              <HiTrash className="-mt-5 text-2xl text-red-600" />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserUpload;
