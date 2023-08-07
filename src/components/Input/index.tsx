import { UseFormRegister } from 'react-hook-form';
import style from './clearOutline.module.css';

type NameInput = 'password' | 'account' | 'username' | 'confirmpassword' | any;

type Props = {
  placeholder?: string;
  prefix?: React.ReactNode;
  type?: string;
  name?: NameInput;
  typeInput?: string;
  register?: UseFormRegister<any>;
  error?: string;
};

const Input = ({ placeholder, type, prefix, name, typeInput, register, error }: Props) => {
  return (
    <div
      className={`flex items-center ${type === 'auth' ? 'justify-center flex-col gap-x-3' : ''}`}
    >
      {prefix && prefix}
      <input
        className={`p-0 outline-none  ${
          type === 'auth' &&
          'border-transparent border border-b-[#d6cdbc] text-sm outline-none py-[10px] w-full focus:ring-0'
        } 
        ${
          type === 'search' &&
          'w-full bg-[#fbfbfb] h-[32px] text-[14px] rounded-2xl focus:outline-none border-none placeholder: pl-9 lg:mx-auto lg:w-[35rem]'
        }`}
        autoComplete="off"
        placeholder={placeholder && placeholder}
        type={typeInput}
        {...register?.(name)}
        name={name}
      />
      {error && <span className="text-red-500 text-[13px]">{error}</span>}
    </div>
  );
};

export default Input;
