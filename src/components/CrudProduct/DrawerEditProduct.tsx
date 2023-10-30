import { Button, Tooltip } from 'flowbite-react'
import { IProduct } from '../../interfaces/products.type'
import { BiEditAlt } from 'react-icons/bi'
import { memo, useEffect, useState } from 'react'
import { BiMinus, BiPlusMedical } from 'react-icons/bi'
import {
  Form,
  Input,
  Modal,
  Select,
  Button as Butt,
  SelectProps,
  Space,
  UploadFile,
  message,
  InputNumber,
  Switch,
  Row,
  Drawer,
  Col
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Upload, { UploadProps } from 'antd/es/upload'
import { useUpdateProductMutation, useUploadImagesProductMutation } from '../../api/Product'
import { ToppingAPI } from '../../api/topping'
import CategoryApi from '../../api/category'
import { toast } from 'react-toastify'
import convertToBase64 from '../../utils/convertBase64'
import { formatCurrency, formatNumberDigits } from '../../utils/formatCurrency'
import SizeApi from '../../store/slices/size.slice'

interface ItemProps {
  label: string
  value: string
}

interface CustomUploadFile extends UploadFile {
  _id?: string
  publicId: string
}

const optionTopping: ItemProps[] = []
const optionOriginalSize: ItemProps[] = []

const DrawerEditProduct = ({ DataEdit }: { DataEdit: IProduct }) => {
  const [getDataTopping] = ToppingAPI.endpoints.getAllTopping.useLazyQuery()
  const [getCategory, { data: DataCategory }] = CategoryApi.endpoints.getAllCategory.useLazyQuery()
  const [getSize] = SizeApi.endpoints.getAllSize.useLazyQuery()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [uploadImages] = useUploadImagesProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [isPercent, setIsPercent] = useState(DataEdit.sale)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<CustomUploadFile[]>(
    DataEdit.images.map((item) => {
      return {
        uid: `${item._id}`,
        percent: 50,
        name: `${item.filename}`,
        status: 'done',
        url: `${item.url}`,
        thumbUrl: `${item.url}`,
        publicId: item.publicId
      }
    })
  )

  const fillForm = ({ DataEdit }: { DataEdit: IProduct }) => {
    const { name, category, description, toppings, sale, sizes } = DataEdit
    form.setFieldsValue({
      name: name,
      category: category._id,
      toppings: toppings.map((item) => item._id),
      sizes: sizes.map((item) => `${item._id}|${item.name}|${item.price}`),
      sale: sale,
      description: description
      // customsizes: customsizes.map((item) => {
      //   return {
      //     name: item.name,
      //     price: item.price
      //   }
      // })
    })
  }

  useEffect(() => {
    getDataTopping().then(({ data: { data } }: any) => {
      if (optionTopping.length == 0) {
        data.forEach((item: { name: string; _id: string }) => {
          optionTopping.push({
            label: `${item.name}`,
            value: `${item._id}`
          })
        })
      }
    })
    getSize({ page: 1, limit: 10 }).then(({ data: { docs } }: any) => {
      if (optionOriginalSize.length == 0) {
        docs.forEach((item: any) => {
          optionOriginalSize.push({
            label: `${item.name} (${formatCurrency(item.price)})`,
            value: `${item._id}|${item.name}|${item.price}`
          })
        })
      }
    })
    getCategory()
    return () => {
      getCategory().unsubscribe()
      getDataTopping().unsubscribe()
      getSize({ page: 1, limit: 10 }).unsubscribe()
    }
  }, [])

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

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await convertToBase64(file.originFileObj!)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || (file.url ?? '').substring((file.url ?? '').lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList([...newFileList] as CustomUploadFile[])

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

  const showDrawer = () => {
    fillForm({ DataEdit })
    setFileList(
      DataEdit.images.map((item) => {
        return {
          uid: `${item._id}`,
          percent: 50,
          name: `${item.filename}`,
          status: 'done',
          url: `${item.url}`,
          thumbUrl: `${item.url}`,
          publicId: item.publicId
        }
      })
    )
    setIsOpenDrawer(true)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setIsOpenDrawer(false)
  }

  const handleCancelImg = () => setPreviewOpen(false)

  const onResetSale = () => {
    form.setFieldsValue({
      sale: 0
    })
  }

  const getMin = (array: any) => {
    let min = Number(array[0])
    for (let i = 1; i < array.length; i++) {
      min = min < Number(array[i]) ? min : Number(array[i])
    }
    return min
  }

  const onFinish = (values: any) => {
    setConfirmLoading(true)

    const formData = new FormData()
    const existImg = fileList
      .filter((item) => {
        return item.publicId ? item : ''
      })
      .map((item) => {
        if (item.publicId) {
          return {
            filename: item.name,
            publicId: item.publicId,
            url: item.url,
            _id: item.uid
          }
        }
      })

    let product = {
      _id: DataEdit._id,
      ...values,
      sizes: values.sizes.map((item: any) => item.split('|')[0]),
      sale: {
        value: values.sale,
        isPercent: isPercent
      },
      images: [...existImg]
    }

    if (!values.images) {
      updateProduct(product).then((data: any) => {
        if (data.error) {
          setConfirmLoading(false)
          toast.error(data.error.data.err?.[0])
        } else {
          setIsOpenDrawer(false)
          setConfirmLoading(false)
          toast.success('Cập nhật sản phẩm thành công!')
        }
      })
    } else if (values.images.length > 0) {
      let check = false
      values?.images.forEach((file: any) => {
        if (file.originFileObj) {
          check = true
          formData.append('images', file.originFileObj)
        }
      })
      if (check) {
        uploadImages(formData).then(({ data }: any) => {
          product = {
            _id: DataEdit._id,
            ...values,
            images: [...existImg, ...(data.urls ?? [])]
          }
          updateProduct(product).then((data: any) => {
            if (data.error) {
              toast.error(data.error.data.err?.[0])
            } else {
              setIsOpenDrawer(false)
              setConfirmLoading(false)
              toast.success('Cập nhật sản phẩm thành công!')
            }
          })
        })
      } else {
        updateProduct(product).then((data: any) => {
          if (data.error) {
            toast.error(data.error.data.err?.[0])
          } else {
            setIsOpenDrawer(false)
            setConfirmLoading(false)
            toast.success('Cập nhật sản phẩm thành công!')
          }
        })
      }
    }
  }

  return (
    <>
      <Tooltip content='Chỉnh sửa sản phẩm'>
        <Button color='primary' onClick={showDrawer}>
          <BiEditAlt className='text-sm' />
        </Button>
      </Tooltip>

      <Drawer
        title='Chỉnh sửa sản phẩm mới'
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
                rules={
                  [
                    // {
                    //   required: true,
                    //   message: 'Hãy chọn category'
                    // }
                  ]
                }
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
                rules={
                  [
                    // {
                    //   required: true,
                    //   message: 'Hãy chọn topping!'
                    // }
                  ]
                }
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

                          console.log(sizes)

                          const duplicateSize = array_is_unique(sizes, sizes.length)

                          console.log(duplicateSize)
                          if (duplicateSize === 1) {
                            return Promise.reject('Size không lên trùng nhau!')
                          }

                          // return value.filter((item: any) => {
                          //   return value[0].name === item.name
                          // }).length > 0
                          //   ? Promise.reject('Size bị trùng!')
                          //   : Promise.resolve()
                        }
                        // return Promise.reject('kaka')
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
                                // { required: true, message: 'Hãy nhập giá size!' },
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
                      // {
                      //   required: true,
                      //   message: 'Hãy nhập giá sale!'
                      // },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!isPercent) {
                            if (value < 0) {
                              return Promise.reject('Giá sale không hợp lệ!')
                            } else if (value === 0) {
                              return Promise.resolve()
                            } else if (
                              getFieldValue('customsizes')?.length >= 1 ||
                              getFieldValue('sizes').length >= 1
                            ) {
                              const originalSize = getFieldValue('sizes').map((item: any) => {
                                return Number(item.split('|')[2])
                              })
                              const size = getFieldValue('customsizes')?.map((item: any) => {
                                return Number(item.price)
                              })

                              console.log([...originalSize, ...size])

                              const min =
                                size?.[0] > 0
                                  ? formatNumberDigits(getMin([...originalSize, ...size]))
                                  : formatNumberDigits(getMin([...originalSize]))

                              console.log(min)

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
                  {/* <Switch
                    checked={isPercent}
                    checkedChildren='%'
                    unCheckedChildren='VND'
                    className='bg-red-500 font-bold'
                    onChange={() => {
                      onResetSale()
                      setIsPercent(!isPercent)
                    }}
                  /> */}
                </Space.Compact>
              </Form.Item>
              <Form form={form} onFinish={onFinish}>
                <Form.Item
                  label='Picture'
                  name='images'
                  valuePropName='files'
                  getValueFromEvent={(event) => {
                    return event?.fileList
                  }}
                  rules={[
                    {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      validator() {
                        return new Promise((resolve, reject) => {
                          if (fileList.length <= 0) {
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
                    defaultFileList={fileList}
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
              </Form>
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
    </>
  )
}

export default memo(DrawerEditProduct)
