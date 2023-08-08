import { Breadcrumb, Button, Label, TextInput } from 'flowbite-react';
import type { FC } from 'react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiCog, HiDotsVertical, HiExclamationCircle, HiHome, HiTrash } from 'react-icons/hi';
import AddProductModal from '../../../components/CrudProduct/addProduct';
import ProductsTable from '../../../components/CrudProduct/listProduct';

const ProductsList = () => {
  const [isOpenModalAdd, setOpenModalAdd] = useState(false);

  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/e-commerce/products">E-commerce</Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All products
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchForProducts />
            <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Configure</span>
                <HiCog className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Delete</span>
                <HiTrash className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Purge</span>
                <HiExclamationCircle className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Settings</span>
                <HiDotsVertical className="text-2xl" />
              </a>
            </div>
            <div className="flex w-full items-center sm:justify-end">
              <Button color="primary" onClick={() => setOpenModalAdd(!isOpenModalAdd)}>
                <FaPlus className="mr-3 text-sm" />
                Add product
              </Button>
              {isOpenModalAdd ? (
                <AddProductModal isOpen={isOpenModalAdd} setIsOpen={setOpenModalAdd} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchForProducts: FC = function () {
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput id="products-search" name="products-search" placeholder="Search for products" />
      </div>
    </form>
  );
};

// const AddProductModal = ({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   console.log('Con');

//   const [getDataTopping, { data: DataToping, isSuccess: SuccesTopping }] =
//     ToppingAPI.endpoints.getAllTopping.useLazyQuery();
//   const [getDataSize, { data: DataSize, isSuccess: SuccessSize }] =
//     SizeApi.endpoints.getAllSizes.useLazyQuery();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<ProductForm>({
//     mode: 'onSubmit',
//     resolver: yupResolver(ProductSchema),
//   });

//   const [urls, setUrl] = useState<IImage[]>([]);
//   const theme = useTheme();
//   const [toppingState, setToppingState] = useState<string[]>([]);
//   const [sizeState, setSizeState] = useState<string[]>([]);

//   const handleChangeTopping = (event: SelectChangeEvent<typeof toppingState>) => {
//     setValue('toppings', event.target.value as any, { shouldValidate: true });
//     const {
//       target: { value },
//     } = event;
//     setToppingState(typeof value === 'string' ? value.split(',') : value);
//   };

//   const handleChangeSize = (event: SelectChangeEvent<typeof sizeState>) => {
//     setValue('sizes', event.target.value as any, { shouldValidate: true });
//     const {
//       target: { value },
//     } = event;
//     setSizeState(typeof value === 'string' ? value.split(',') : value);
//   };

//   const onAddProduct = handleSubmit(async (data: any) => {
//     console.log(data);

//     setIsOpen(false);
//   });

//   useEffect(() => {
//     getDataTopping();
//     getDataSize();
//     console.log(DataSize);
//     console.log(DataToping);
//   }, [DataToping, DataSize]);

//   return (
//     <>
//       <Modal className="lg:pt-[440px]" onClose={() => setIsOpen(false)} show={isOpen}>
//         <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
//           <strong>Add product</strong>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="grid gap-6 lg:grid-cols-2">
//               <div>
//                 <Label htmlFor="productName">Product name</Label>
//                 <input type="text" {...register('name')} name="name" id="" />
//                 {/* <TextInput
//                   id="productName"
//                   placeholder="Product..."
//                   className="mt-1"
//                   {...register('name')}
//                   name="name"
//                 /> */}
//                 <span className="text-red-500 text-sm block my-2">
//                   {errors.name && errors.name.message}
//                 </span>
//               </div>
//               <div>
//                 <Label htmlFor="category">Category</Label>
//                 <Select
//                   className="mt-1"
//                   {...register('category')}
//                   name="category"
//                   // onChange={(e) => console.log(e.target.value)}
//                 >
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                 </Select>
//               </div>
//               <div>
//                 <Label htmlFor="brand">Topping</Label>
//                 <SelectMui
//                   className="w-full mt-1"
//                   labelId="demo-multiple-chip-label"
//                   id="demo-multiple-chip"
//                   multiple
//                   value={toppingState}
//                   input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//                   renderValue={(selected) => (
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                       {selected.map((value) => (
//                         <Chip key={value} label={value} />
//                       ))}
//                     </Box>
//                   )}
//                   MenuProps={MenuProps}
//                   {...register('toppings')}
//                   name="toppings"
//                   onChange={handleChangeTopping}
//                 >
//                   {DataToping?.data.map((topping) => (
//                     <MenuItem
//                       key={topping._id}
//                       value={topping.name}
//                       style={getStyles(topping.name, toppingState, theme)}
//                     >
//                       {topping.name}
//                     </MenuItem>
//                   ))}
//                 </SelectMui>
//                 <span className="text-red-500 text-sm block my-2">
//                   {errors.toppings && errors.toppings.message}
//                 </span>
//               </div>
//               <div>
//                 <Label htmlFor="brand">Size</Label>
//                 <SelectMui
//                   className="w-full mt-1"
//                   labelId="demo-multiple-chip-label"
//                   id="demo-multiple-chip"
//                   multiple
//                   value={sizeState}
//                   input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//                   renderValue={(selected) => (
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                       {selected.map((value) => (
//                         <Chip key={value} label={value} />
//                       ))}
//                     </Box>
//                   )}
//                   MenuProps={MenuProps}
//                   {...register('sizes')}
//                   name="sizes"
//                   onChange={handleChangeSize}
//                 >
//                   {DataSize?.docs.map((size) => (
//                     <MenuItem
//                       key={size._id}
//                       value={size.name}
//                       style={getStyles(size.name, sizeState, theme)}
//                     >
//                       {size.name}
//                     </MenuItem>
//                   ))}
//                 </SelectMui>
//                 <span className="text-red-500 text-sm block my-2">
//                   {errors.sizes && errors.sizes.message}
//                 </span>
//               </div>
//               <div>
//                 <Label htmlFor="price">Price</Label>
//                 <TextInput
//                   id="price"
//                   type="number"
//                   placeholder="Price..."
//                   className="mt-1"
//                   {...register('price')}
//                   name="price"
//                 />
//                 <span className="text-red-500 text-sm block my-2">
//                   {errors.price && errors.price.message}
//                 </span>
//               </div>
//               <div>
//                 <Label htmlFor="price">Sale</Label>
//                 <TextInput
//                   id="price"
//                   type="number"
//                   placeholder="Sale..."
//                   className="mt-1"
//                   {...register('sale')}
//                   name="sale"
//                   defaultValue={0}
//                 />
//                 <span className="text-red-500 text-sm block my-2">
//                   {errors.sale && errors.sale.message}
//                 </span>
//               </div>
//               <div className="lg:col-span-2">
//                 <Label htmlFor="producTable.Celletails">Product details</Label>
//                 <Textarea
//                   id="producTable.Celletails"
//                   placeholder="Description..."
//                   rows={6}
//                   className="mt-1"
//                   {...register('description')}
//                   name="description"
//                 />
//                 <span className="text-red-500 text-sm block my-2">
//                   {errors.description && errors.description.message}
//                 </span>
//               </div>
//             </div>
//             <BoxUpload urls={urls} setUrl={setUrl} />
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button color="primary" onClick={onAddProduct}>
//             Add product
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// const EditProductModal: FC = function () {
//   const [isOpen, setOpen] = useState(false);

//   return (
//     <>
//       <Button color="primary" onClick={() => setOpen(!isOpen)}>
//         <HiPencilAlt className="mr-2 text-lg" />
//         Edit item
//       </Button>
//       <Modal onClose={() => setOpen(false)} show={isOpen}>
//         <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
//           <strong>Edit product</strong>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//               <div>
//                 <Label htmlFor="productName">Product name</Label>
//                 <TextInput
//                   id="productName"
//                   name="productName"
//                   placeholder='Apple iMac 27"'
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="category">Category</Label>
//                 <TextInput
//                   id="category"
//                   name="category"
//                   placeholder="Electronics"
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="brand">Brand</Label>
//                 <TextInput id="brand" name="brand" placeholder="Apple" className="mt-1" />
//               </div>
//               <div>
//                 <Label htmlFor="price">Price</Label>
//                 <TextInput
//                   id="price"
//                   name="price"
//                   type="number"
//                   placeholder="$2300"
//                   className="mt-1"
//                 />
//               </div>
//               {/* <div className="lg:col-span-2">
//                 <Label htmlFor="productDetails">Product details</Label>
//                 <Textarea
//                   id="productDetails"
//                   name="productDetails"
//                   placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
//                   rows={6}
//                   className="mt-1"
//                 />
//               </div> */}
//               <div className="flex space-x-5">
//                 <div>
//                   <img
//                     alt="Apple iMac 1"
//                     src="/images/products/apple-imac-1.png"
//                     className="h-24"
//                   />
//                   <a href="#" className="cursor-pointer">
//                     <span className="sr-only">Delete</span>
//                     <HiTrash className="-mt-5 text-2xl text-red-600" />
//                   </a>
//                 </div>
//                 <div>
//                   <img
//                     alt="Apple iMac 2"
//                     src="/images/products/apple-imac-2.png"
//                     className="h-24"
//                   />
//                   <a href="#" className="cursor-pointer">
//                     <span className="sr-only">Delete</span>
//                     <HiTrash className="-mt-5 text-2xl text-red-600" />
//                   </a>
//                 </div>
//                 <div>
//                   <img
//                     alt="Apple iMac 3"
//                     src="/images/products/apple-imac-3.png"
//                     className="h-24"
//                   />
//                   <a href="#" className="cursor-pointer">
//                     <span className="sr-only">Delete</span>
//                     <HiTrash className="-mt-5 text-2xl text-red-600" />
//                   </a>
//                 </div>
//               </div>
//               <div className="lg:col-span-2">
//                 <div className="flex w-full items-center justify-center">
//                   <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <HiUpload className="text-4xl text-gray-300" />
//                       <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
//                         Upload a file or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         PNG, JPG, GIF up to 10MB
//                       </p>
//                     </div>
//                     <input type="file" className="hidden" />
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button color="primary" onClick={() => setOpen(false)}>
//             Save all
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// const ProductsTable: FC = function () {
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     dispatch(getAllProducts());
//   }, [dispatch]);

//   return (
//     <Table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-600">
//       <Table.Head className="bg-gray-100 dark:bg-gray-700">
//         <Table.HeadCell>
//           <span className="sr-only">Toggle selected</span>
//           <Checkbox />
//         </Table.HeadCell>
//         <Table.HeadCell>ID</Table.HeadCell>
//         <Table.HeadCell>Product Name</Table.HeadCell>
//         <Table.HeadCell>Images</Table.HeadCell>
//         <Table.HeadCell>Technology</Table.HeadCell>
//         <Table.HeadCell>Price</Table.HeadCell>
//         <Table.HeadCell>Actions</Table.HeadCell>
//       </Table.Head>
//       <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
//         {[0, 1, 2, 4, 5, 6, 7, 8, 9, 10]?.map((_, index: number) => (
//           <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
//             <Table.Cell className="w-4 p-4">
//               <Checkbox />
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//               #194556
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
//               <div className="text-base font-semibold text-gray-900 dark:text-white">
//                 Education Dashboard
//               </div>
//               <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
//                 Html templates
//               </div>
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//               Images
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//               Angular
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//               $149
//             </Table.Cell>
//             <Table.Cell className="space-x-2 whitespace-nowrap p-4">
//               <div className="flex items-center gap-x-3">
//                 <EditProductModal />
//                 <Button color="failure">
//                   <HiTrash className="mr-2 text-lg" />
//                   Delete item
//                 </Button>
//               </div>
//             </Table.Cell>
//           </Table.Row>
//         ))}
//       </Table.Body>
//     </Table>
//   );
// };

export default ProductsList;
