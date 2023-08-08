import { yupResolver } from '@hookform/resolvers/yup';
import { ToppingAPI } from '../../api/topping';
import { ProductForm, ProductSchema } from '../../validate/Form';
import { useForm } from 'react-hook-form';
import { memo, useEffect, useMemo, useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { IImage } from '../../interfaces/image.type';
import SelectMui, { SelectChangeEvent } from '@mui/material/Select';
import {
  Box,
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import BoxUpload from '../Upload/index';
import Modal from '@mui/material/Modal';
import CategoryApi from '../../api/category';
import { useAddProductMutation } from '../../api/Product';
import { toast } from 'react-toastify';
import { BiPlusMedical } from 'react-icons/bi';
import DynamicField from '../DynamicallyField';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddProductModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const methods = useForm<ProductForm>({
    mode: 'onChange',
    resolver: yupResolver(ProductSchema),
  });

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [DynamicSize, setDynamicSize] = useState<any[]>([]);
  const [submit, setSubmit] = useState(false);

  const [getDataTopping, { data: DataToping }] = ToppingAPI.endpoints.getAllTopping.useLazyQuery();
  const [getCategory, { data: DataCategory }] = CategoryApi.endpoints.getAllCategory.useLazyQuery();
  const [addProduct] = useAddProductMutation();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useMemo(() => methods, [methods]);

  const [urls, setUrl] = useState<IImage[]>([]);
  const theme = useTheme();
  const [toppingState, setToppingState] = useState<string[]>([]);

  const handleChangeTopping = (event: SelectChangeEvent<typeof toppingState>) => {
    setValue('toppings', event.target.value as any, { shouldValidate: true });
    const {
      target: { value },
    } = event;
    setToppingState(typeof value === 'string' ? value.split(',') : value);
  };

  const onAddProduct = handleSubmit(async (data: any) => {
    if (submit) {
      DynamicSize.forEach((item) => {
        return delete item.errors;
      });
      console.log(DynamicSize);
      console.log({ ...data, images: [...urls], sizes: [...DynamicSize] });
      await addProduct({ ...data, images: [...urls], sizes: [...DynamicSize] }).then(
        (data: any) => {
          data.error ? toast.error(data.error.data.err?.[0]) : setIsOpen(false);
        }
      );
    }
  });

  useEffect(() => {
    getDataTopping();
    getCategory();
  }, [DataCategory]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="h-full overflow-y-auto no-scrollbar"
      >
        <Box
          sx={{
            width: '50rem',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <Typography className="p-6 bg-[#e2e8f0]" variant="h5" component="h3">
            Add Product
          </Typography>
          <form autoComplete="off">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  placeholder="Product..."
                  className="mt-1"
                  {...register('name')}
                  name="name"
                />
                <span className="text-red-500 text-sm block my-2">
                  {errors.name && errors.name.message}
                </span>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  className="w-full h-[42px] mt-1"
                  {...register('category')}
                  name="category"
                  defaultValue={''}
                >
                  {DataCategory?.docs.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <span className="text-red-500 text-sm block my-2">
                  {errors.category && errors.category.message}
                </span>
              </div>
              <div>
                <Label htmlFor="brand">Topping</Label>
                <SelectMui
                  className="w-full mt-1"
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={toppingState}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={DataToping?.data.find((item) => item._id === value)?.name}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  {...register('toppings')}
                  name="toppings"
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
                <span className="text-red-500 text-sm block my-2">
                  {errors.toppings && errors.toppings.message}
                </span>
              </div>
              {/* <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  type="number"
                  placeholder="Price..."
                  className="mt-1"
                  {...register('price')}
                  name="price"
                />
                <span className="text-red-500 text-sm block my-2">
                  {errors.price && errors.price.message}
                </span>
              </div> */}
              <div>
                <Label htmlFor="price">Sale</Label>
                <TextInput
                  id="price"
                  type="number"
                  placeholder="Sale..."
                  className="mt-1"
                  {...register('sale')}
                  name="sale"
                  defaultValue={0}
                />
                <span className="text-red-500 text-sm block my-2">
                  {errors.sale && errors.sale.message}
                </span>
              </div>
              <div>
                <Label htmlFor="price">Size</Label>
                <DynamicField setSubmit={setSubmit} setDynamic={setDynamicSize} submit={submit} />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="producTable.Celletails">Product details</Label>
                <Textarea
                  id="producTable.Celletails"
                  placeholder="Description..."
                  rows={6}
                  className="mt-1"
                  {...register('description')}
                  name="description"
                />
                <span className="text-red-500 text-sm block my-2">
                  {errors.description && errors.description.message}
                </span>
              </div>
            </div>
            <BoxUpload
              urls={urls}
              setUrl={setUrl}
              setLoadingUpload={setLoadingUpload}
              setLoadingDelete={setLoadingDelete}
            />
          </form>
          {loadingUpload || loadingDelete ? (
            <Button color="primary" className="mt-[10px]" disabled>
              Add product
            </Button>
          ) : (
            <Button
              color="primary"
              className="mt-[10px]"
              onClick={() => {
                onAddProduct();
                setSubmit(true);
              }}
            >
              Add product
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AddProductModal;
