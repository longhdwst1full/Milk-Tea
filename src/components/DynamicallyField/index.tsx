import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlusMedical } from 'react-icons/bi'

interface Props {
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>
  setDynamic: React.Dispatch<React.SetStateAction<any[]>>
  submit: boolean
  dataSize?: any[]
}

const DynamicField = ({ setSubmit, setDynamic, dataSize }: Props) => {
  const [field, setField] = useState(() =>
    dataSize
      ? dataSize.map((item) => ({ ...item, errors: { name: '', price: '' } }))
      : [{ name: '', price: '', errors: { name: '', price: '' } }]
  )

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target

    const list = [...field]
    list[index][(name as 'name') || 'price'] = value

    if (!value) {
      list[index].errors[(name as 'name') || 'price'] = `${name} size is required`
      setSubmit(false)
    } else if (Number(value) < 0) {
      list[index].errors.price = `${name} size must be greater than or equal to 0`
      setSubmit(false)
    } else {
      list[index].errors[(name as 'name') || 'price'] = ''
      setSubmit(false)
    }
    setField(list)
  }

  const addField = () => {
    setField([...field, { name: '', price: '', errors: { name: '', price: '' } }])
  }

  const removeField = (index: number) => {
    const list = [...field]
    list.splice(index, 1)
    setField(list)
  }

  useEffect(() => {
    field.forEach((item) => {
      ;(item.price as any) == '' ? (item.errors.price = 'Price size is required') && setSubmit(false) : ''
      item.name === '' ? (item.errors.name = 'Name size is required') && setSubmit(false) : ''
      item.name !== '' && item.price !== '' && (item.price as any) >= 0 ? setSubmit(true) : ''
    })

    setField(field)
    setDynamic(field)
    console.log(field)
  }, [field, setDynamic, setSubmit])

  return (
    <>
      <span className='inline-block float-right mr-[15px] cursor-pointer' onClick={addField}>
        <BiPlusMedical />
      </span>
      <div>
        {field.map((item, index) => (
          <div className='flex items-center gap-1' key={index}>
            <div className='mb-[15px]'>
              <TextInput
                type='text'
                placeholder='Size...'
                className='mt-1'
                name='name'
                value={item.name}
                onChange={(e) => handleFieldChange(e, index)}
                defaultValue={item.name}
              />
              <span className='text-red-500 text-sm block h-[10px]'>{item.errors && item.errors.name}</span>
            </div>
            <div className='mb-[15px]'>
              <TextInput
                type='number'
                placeholder='Price...'
                className='mt-1'
                name='price'
                defaultValue={item.price}
                value={item.price}
                onChange={(e) => handleFieldChange(e, index)}
              />
              <span className='text-red-500 text-sm block  h-[10px]'>{item.errors && item.errors.price}</span>
            </div>
            {index === 0 ? (
              ''
            ) : (
              <Button className='bg-red-400 mb-[22px] ml-1' onClick={() => removeField(index)}>
                <BiMinus />
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default DynamicField
