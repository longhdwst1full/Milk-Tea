import { savePage, saveValueSearch } from '../../store/slices/product.slice'

import { UseFormRegister } from 'react-hook-form'
import { useAppDispatch } from '../../store/hooks'

type NameInput = 'password' | 'account' | 'username' | 'confirmpassword' | any

type Props = {
  placeholder?: string
  prefix?: React.ReactNode
  type?: string
  name?: NameInput
  typeInput?: string
  register?: UseFormRegister<any>
  error?: string
  setText?: React.Dispatch<React.SetStateAction<any>>
  searchValue?: string
}

const Input = ({ placeholder, type, prefix, name, typeInput, register, error, setText, searchValue }: Props) => {
  const dispatch = useAppDispatch()
  return (
    <div
      className={`flex items-center ${type === 'auth' ? 'justify-center flex-col gap-x-3' : ''} ${error && 'flex-col'}`}
    >
      <div className='w-full flex items-center'>
        {prefix && prefix}
        <input
          className={`p-0 outline-none px-2 block w-full focus:bg-gray-50 ${
            type === 'auth' &&
            'border-transparent border border-b-[#d6cdbc] text-sm outline-none py-[10px] w-full focus:ring-0'
          }
          ${
            type === 'search' &&
            'w-full bg-[#fbfbfb] h-[32px] text-[14px] rounded-2xl focus:outline-none border-none placeholder: pl-9 lg:mx-auto lg:w-[35rem]'
          }`}
          autoComplete='off'
          autoFocus
          placeholder={placeholder && placeholder}
          type={typeInput}
          {...register?.(name)}
          value={searchValue}
          onChange={(e) => {
            if (setText) {
              setText(e.target.value)
              dispatch(saveValueSearch(e.target.value))
              dispatch(savePage(1))
            }
          }}
          name={name}
        />
      </div>
      {error && <span className='text-red-500 text-[13px] self-start'>{error}</span>}
    </div>
  )
}

export default Input
