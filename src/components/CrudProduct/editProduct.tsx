import { yupResolver } from '@hookform/resolvers/yup'
import { ToppingAPI } from '../../api/topping'
import { ProductForm, ProductSchema } from '../../validate/Form'
import { useForm } from 'react-hook-form'
import { memo, useEffect, useMemo, useState } from 'react'
import { Button, Label, TextInput, Textarea, Tooltip } from 'flowbite-react'
import { IImage } from '../../interfaces/image.type'
import SelectMui, { SelectChangeEvent } from '@mui/material/Select'
import { Box, Chip, MenuItem, OutlinedInput, Select, Theme, Typography, useTheme } from '@mui/material'
import BoxUpload from '../Upload/index'
import Modal from '@mui/material/Modal'
import CategoryApi from '../../api/category'
import { useUpdateProductMutation } from '../../api/Product'
import { IProduct } from '../../interfaces/products.type'
import { BiEditAlt } from 'react-icons/bi'
import { toast } from 'react-toastify'
import DynamicallyField from '../DynamicallyField'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}

const EditProductModal = ({ DataEdit }: { DataEdit: IProduct }) => {
  const methods = useForm<ProductForm>({
    mode: 'onChange',
    resolver: yupResolver(ProductSchema),
    defaultValues: {
      name: DataEdit.name,
      price: DataEdit.price,
      sale: DataEdit.sale,
      description: DataEdit.description,
      toppings: DataEdit.toppings.map((item) => item._id!)
    } as any
  })

  // console.log(DataEdit.toppings.map((item) => item._id as any));

  const [isOpen, setIsOpen] = useState(false)

  const [getDataTopping, { data: DataToping }] = ToppingAPI.endpoints.getAllTopping.useLazyQuery()
  const [getCategory, { data: DataCategory }] = CategoryApi.endpoints.getAllCategory.useLazyQuery()
  const [DynamicSize, setDynamicSize] = useState<any[]>([])
  const [submit, setSubmit] = useState(false)

  const [updateProduct] = useUpdateProductMutation()

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useMemo(() => methods, [methods])

  const [urls, setUrl] = useState<IImage[]>([])
  const theme = useTheme()
  const [toppingState, setToppingState] = useState<string[]>([])
  // const [sizeState, setSizeState] = useState<string[]>([])

  const [loadingUpload, setLoadingUpload] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const handleChangeTopping = (event: SelectChangeEvent<typeof toppingState>) => {
    setValue('toppings', event.target.value as any, { shouldValidate: true })
    const {
      target: { value }
    } = event

    setToppingState(typeof value === 'string' ? value.split(',') : value)
  }

  const onEditProduct = handleSubmit((data: any) => {
    if (data && submit) {
      const DataPost =
        urls.length > 0
          ? { _id: DataEdit._id, ...data, images: [...urls] }
          : { _id: DataEdit._id, ...data, images: [...DataEdit.images], sizes: [...DynamicSize] }

      updateProduct(DataPost).then((data: any) => {
        data.error ? toast.error(data.error.data.err?.[0]) : setIsOpen(false)
      })
    }
  })

  useEffect(() => {
    getDataTopping()
    getCategory()
    setToppingState(DataEdit.toppings.map((item) => item._id!))
  }, [])

  return (
    <div>
      <Tooltip content='Chỉnh sửa sản phẩm'>
        <Button color='primary' onClick={() => setIsOpen(true)}>
          <BiEditAlt className='text-sm' />
        </Button>
      </Tooltip>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='no-scrollbar h-full overflow-y-auto'
      >
        <Box
          sx={{
            width: '50rem',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '10px'
          }}
        >
          <Typography className='p-6 bg-[#e2e8f0]' variant='h5' component='h3'>
            Edit Product
          </Typography>
          <form autoComplete='off'>
            <div className='lg:grid-cols-2 grid gap-6'>
              <div>
                <Label htmlFor='productName'>Product name</Label>
                <TextInput
                  id='productName'
                  placeholder='Product...'
                  className='mt-1'
                  {...register('name')}
                  name='name'
                />
                <span className='block my-2 text-sm text-red-500'>{errors.name && errors.name.message}</span>
              </div>
              <div>
                <Label htmlFor='category'>Category</Label>
                <Select
                  labelId='demo-simple-select-label'
                  defaultValue={DataEdit.category?._id}
                  id='demo-simple-select'
                  label='Age'
                  className='w-full h-[42px] mt-1'
                  {...register('category')}
                  name='category'
                >
                  {DataCategory?.docs.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <span className='block my-2 text-sm text-red-500'>{errors.category && errors.category.message}</span>
              </div>
              <div>
                <Label htmlFor='brand'>Topping</Label>
                <SelectMui
                  className='w-full mt-1'
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  value={toppingState}
                  input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={DataToping?.data.find((item) => item._id === value)?.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  {...register('toppings')}
                  name='toppings'
                  onChange={handleChangeTopping}
                >
                  {DataToping?.data.map((topping) => (
                    <MenuItem
                      key={topping._id}
                      value={topping._id}
                      style={getStyles(topping.name, toppingState, theme)}
                    >
                      {topping.name}
                    </MenuItem>
                  ))}
                </SelectMui>
                <span className='block my-2 text-sm text-red-500'>{errors.toppings && errors.toppings.message}</span>
              </div>
              <div>
                <Label htmlFor='price'>Sale</Label>
                <TextInput
                  id='price'
                  type='number'
                  placeholder='Sale...'
                  className='mt-1'
                  {...register('sale')}
                  name='sale'
                  defaultValue={0}
                />
                <span className='block my-2 text-sm text-red-500'>{errors.sale && errors.sale.message}</span>
              </div>
              <div>
                <Label htmlFor='price'>Size</Label>
                <DynamicallyField
                  setSubmit={setSubmit}
                  setDynamic={setDynamicSize}
                  submit={submit}
                  dataSize={DataEdit.sizes}
                />
              </div>
              <div className='lg:col-span-2'>
                <Label htmlFor='producTable.Celletails'>Product details</Label>
                <Textarea
                  id='producTable.Celletails'
                  placeholder='Description...'
                  rows={6}
                  className='mt-1'
                  {...register('description')}
                  name='description'
                />
                <span className='block my-2 text-sm text-red-500'>
                  {errors.description && errors.description.message}
                </span>
              </div>
            </div>
            <BoxUpload
              urls={urls}
              setLoadingUpload={setLoadingUpload}
              setLoadingDelete={setLoadingDelete}
              setUrl={setUrl}
            />
          </form>
          {loadingUpload || loadingDelete ? (
            <Button color='primary' className='mt-[10px]' disabled>
              Edit product
            </Button>
          ) : (
            <Button
              color='primary'
              className='mt-[10px]'
              onClick={() => {
                onEditProduct()
                setSubmit(true)
              }}
            >
              Edit product
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default memo(EditProductModal)
