import {
  Button,
  Col,
  Drawer,
  Row,
  Space,
  Form,
  Input,
  UploadFile,
  Select,
  UploadProps,
  Button as Butt,
  SelectProps,
  InputNumber,
  Switch,
  Modal,
  Upload,
  message
} from 'antd'
import { ToppingAPI } from '../../api/topping'
import CategoryApi from '../../api/category'
import { useEffect, useRef, useState } from 'react'
import { useAddProductMutation, useUploadImagesProductMutation } from '../../api/Product'
import convertToBase64 from '../../utils/convertBase64'
import { BiMinus, BiPlusMedical } from 'react-icons/bi'
import { formatCurrency, formatNumberDigits } from '../../utils/formatCurrency'
import { toast } from 'react-toastify'
import SizeApi from '../../store/slices/size.slice'
import TextArea from 'antd/es/input/TextArea'

interface DrawerAddProductProps {
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  isOpenDrawer: boolean
}

interface ItemProps {
  label: string
  value: string
}

let optionTopping: ItemProps[] = []
let optionOriginalSize: ItemProps[] = []

export const DrawerAddProduct = ({ setIsOpenDrawer, isOpenDrawer }: DrawerAddProductProps) => {
  const [getDataTopping] = ToppingAPI.endpoints.getAllTopping.useLazyQuery()
  const [getCategory, { data: DataCategory }] = CategoryApi.endpoints.getAllCategory.useLazyQuery()
  const [getSize] = SizeApi.endpoints.getAllSize.useLazyQuery()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [addProduct] = useAddProductMutation()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPercent, setIsPercent] = useState(false)
  const [uploadImages] = useUploadImagesProductMutation()
  const selectOptionTopping = useRef<ItemProps[]>([])
  const selectOptionSize = useRef<ItemProps[]>([])
  const [form] = Form.useForm()
  // const handleCloseDrawer = () => {
  //   setIsOpenDrawer(false)
  // }

  useEffect(() => {
    // form.setFieldsValue({
    //   customsizes: [0].map(() => {
    //     return {
    //       name: '',
    //       price: ''
    //     }
    //   })
    // })
    getDataTopping().then(({ data: { data } }: any) => {
      data.forEach((item: any) => {
        selectOptionTopping.current.push({
          label: `${item.name} (${formatCurrency(item.price)})`,
          value: `${item._id}`
        })
        optionTopping = selectOptionTopping.current
      })
    })
    getSize({ page: 1, limit: 10 }).then(({ data: { docs } }: any) => {
      docs.forEach((item: any) => {
        selectOptionSize.current.push({
          label: `${item.name} (${formatCurrency(item.price)})`,
          value: `${item._id}|${item.name}|${item.price}`
        })
        optionOriginalSize = selectOptionSize.current
      })
    })
    getCategory()
    return () => {
      getCategory().unsubscribe()
      getDataTopping().unsubscribe()
      getSize({ page: 1, limit: 10 }).unsubscribe()
    }
  }, [])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await convertToBase64(file.originFileObj)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)

  const uploadButton = (
    <div className='flex justify-center items-center flex-col'>
      <BiPlusMedical />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const selectPropsTopping: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    options: optionTopping,
    placeholder: 'Select Topping...',
    maxTagCount: 'responsive'
  }

  const selectPropsSize: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    options: optionOriginalSize,
    placeholder: 'Select Size...',
    maxTagCount: 'responsive'
  }

  const handleOk = () => {
    form.submit()
  }

  const onResetSale = () => {
    form.setFieldsValue({
      sale: 0
    })
  }

  const getMin = (array: any) => {
    // let min = Number(array[0])
    // for (let i = 1; i < array.length; i++) {
    //   min = min < Number(array[i]) ? min : Number(array[i])
    // }
    let min = formatNumberDigits(Number(array[0]))
    for (let i = 1; i < array.length; i++) {
      min = min < formatNumberDigits(Number(array[i])) ? min : formatNumberDigits(Number(array[i]))
    }
    return min
  }

  const handleCancel = () => {
    setIsOpenDrawer(false)
    form.resetFields()
    setFileList([])
  }

  const handleCancelImg = () => setPreviewOpen(false)

  const array_is_unique = (array: any, size: number) => {
    //flag =  1 =>  tồn tại phần tử trùng nhau
    //flag =  0 =>  không tồn tại phần tử trùng nhau
    let flag = 0
    for (let i = 0; i < size - 1; ++i) {
      for (let j = i + 1; j < size; ++j) {
        if (array[i].name === array[j].name) {
          /*Tìm thấy 1 phần tử trùng là đủ và dừng vòng lặp*/
          flag = 1
          break
        }
      }
    }

    return flag
  }

  const onFinish = (values: any) => {
    // console.log({
    //   ...values,
    //   sizes: values.sizes.map((item: any) => item.split('|')[0]),
    //   sale: {
    //     value: values.sale,
    //     isPercent: isPercent
    //   }
    //   images: [...data.urls]
    // })
    setConfirmLoading(true)
    const formData = new FormData()
    values?.images.forEach((file: any) => {
      formData.append('images', file.originFileObj)
    })
    uploadImages(formData).then(({ data }: any) => {
      const product = {
        ...values,
        sizes: values.sizes.map((item: any) => item.split('|')[0]),
        sale: {
          value: values.sale,
          isPercent: isPercent
        },
        images: [...data.urls]
      }

      addProduct(product).then(() => {
        setConfirmLoading(false)
        setIsOpenDrawer(false)
        form.resetFields()
        toast.success('Thêm sản phẩm thành công!')
      })
    })
  }

  return (
    <Drawer
      title='Thêm sản phẩm mới'
      width='100%'
      onClose={handleCancel}
      open={isOpenDrawer}
      // bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button className='bg-blue-400' onClick={handleOk} loading={confirmLoading} type='primary'>
            Submit
          </Button>
        </Space>
      }
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name='name'
              label='Product Name'
              rules={[
                {
                  required: true,
                  message: 'Tên sản phẩm không để trống!'
                },
                {
                  whitespace: true
                }
              ]}
              hasFeedback
            >
              <Input placeholder='Name...' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='category'
              label='Category'
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn category'
                }
              ]}
              hasFeedback
            >
              <Select placeholder='Select category'>
                {DataCategory?.docs.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='toppings'
              label='Topping'
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn topping!'
                }
              ]}
              hasFeedback
            >
              <Select {...selectPropsTopping} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name='sizes'
              label='Original Size'
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn Size!'
                }
                // {
                //   validator(_,value){

                //   }
                // }
              ]}
              hasFeedback
            >
              <Select {...selectPropsSize} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='Size'>
              <Form.List
                name='customsizes'
                rules={[
                  {
                    validator: async (_, value) => {
                      if (value?.length >= 2) {
                        const sizes = value.filter((item: any) => {
                          return item && item
                        })

                        const duplicateSize = array_is_unique(sizes, sizes.length)

                        if (duplicateSize === 1) {
                          return Promise.reject('Size không lên trùng nhau!')
                        }
                      }
                    }
                  }
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    <div
                      id='scrollSize'
                      className='h-[200px] overflow-auto border-[1px] border-[#d9d9d9] rounded mb-1 p-2'
                    >
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', alignItems: 'center' }} align='center'>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  const sizes = getFieldValue('sizes')?.map((item: any) => {
                                    return item.split('|')[1].toLowerCase()
                                  })

                                  if (sizes && sizes.includes(value?.toLowerCase())) {
                                    return Promise.reject('Size đã tồn tại!')
                                  }
                                  return Promise.resolve()
                                }
                              })
                            ]}
                            hasFeedback
                          >
                            <Input placeholder='Size Name...' />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'price']}
                            rules={[
                              {
                                validator(_, value) {
                                  if (value && value <= 0) {
                                    return Promise.reject('Giá size không hợp lệ!')
                                  }
                                  return Promise.resolve()
                                }
                              }
                            ]}
                            hasFeedback
                          >
                            <InputNumber
                              className='w-full'
                              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                              parser={(value: any) => value.replace(/ \s?|(\.*)/g, '')}
                              placeholder='Price Size...'
                            />
                          </Form.Item>
                          <Form.Item className='cursor-pointer'>
                            <BiMinus onClick={() => remove(name)} />
                          </Form.Item>
                        </Space>
                      ))}
                    </div>
                    <Form.Item wrapperCol={{ span: 10 }}>
                      <Butt
                        type='dashed'
                        onClick={() => {
                          add()
                          const element = document.getElementById('scrollSize')
                          if (element) {
                            element.scrollTop = element.scrollHeight
                          }
                        }}
                        block
                        icon={<BiPlusMedical />}
                      >
                        Add field
                      </Butt>
                    </Form.Item>
                    <Form.ErrorList errors={errors} className='text-red-500' />
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Space.Compact block direction='horizontal' style={{ display: 'flex', gap: 5 }}>
                <Form.Item
                  name='sale'
                  label='Sale'
                  initialValue={0}
                  style={{ flex: 1 }}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!isPercent) {
                          if (value === 0) {
                            return Promise.resolve()
                          } else if (!getFieldValue('customsizes') && !getFieldValue('sizes')) {
                            return Promise.reject('Hãy chọn hoặc nhập giá size hợp lệ!')
                          } else if (getFieldValue('customsizes')?.length >= 1 || getFieldValue('sizes')?.length >= 1) {
                            const originalSize = getFieldValue('sizes')?.map((item: any) => {
                              return Number(item.split('|')[2])
                            })
                            const size = getFieldValue('customsizes')?.map((item: any) => {
                              return Number(item?.price)
                            })

                            if (!originalSize && isNaN(size[0])) {
                              return Promise.reject('Hãy chọn hoặc nhập giá size hợp lệ!')
                            }

                            const min =
                              size?.[0] > 0
                                ? formatNumberDigits(getMin([...originalSize, ...size]))
                                : formatNumberDigits(getMin([...originalSize]))

                            return formatNumberDigits(value) > min * 0.7
                              ? Promise.reject('Sale không được lớn hơn 70% giá size nhỏ nhất')
                              : Promise.resolve()
                          } else if (
                            getFieldValue('customsizes')?.length == 1 &&
                            formatNumberDigits(value) >
                              formatNumberDigits(Number(getFieldValue('customsizes')[0]?.price)) * 0.7
                          ) {
                            return Promise.reject('Sale không được lớn hơn 70% giá size')
                          }
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                  // hasFeedback
                >
                  <InputNumber
                    addonAfter={isPercent ? '%' : 'VND'}
                    className='w-full'
                    placeholder='Sale...'
                    min={0}
                    max={isPercent ? 100 : ''}
                    formatter={(value) => (isPercent ? `${value}` : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.'))}
                    parser={(value: any) => (isPercent ? value.replace('', '') : value.replace(/ \s?|(\.*)/g, ''))}
                  />
                </Form.Item>
                <Switch
                  checked={isPercent}
                  checkedChildren='%'
                  unCheckedChildren='VND'
                  className='bg-red-500 font-bold'
                  onChange={() => {
                    onResetSale()
                    setIsPercent(!isPercent)
                  }}
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item
              label='Profile Picture'
              name='images'
              valuePropName='fileList'
              getValueFromEvent={(event) => {
                return event?.fileList
              }}
              rules={[
                {
                  validator(_, fileList) {
                    return new Promise((resolve, reject) => {
                      console.log(fileList)
                      if (!fileList || fileList.length <= 0) {
                        reject('Hãy upload ảnh!')
                      } else {
                        resolve('')
                      }
                    })
                  }
                }
              ]}
            >
              <Upload
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={(file) => {
                  const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
                  if (!isPNG) {
                    message.error(`${file.name} is not a png, jpg or jpeg file`)
                  }
                  return isPNG ? false : Upload.LIST_IGNORE
                }}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelImg}>
              <img
                alt='example'
                style={{
                  width: '100%'
                }}
                src={previewImage}
              />
            </Modal>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col>
            <Form.Item
              name='description'
              label='Product Detail'
              rules={[
                {
                  required: true,
                  message: 'Hãy mô tả sản phẩmphẩm!'
                }
              ]}
              hasFeedback
            >
              <TextArea rows={6} cols={1000} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
