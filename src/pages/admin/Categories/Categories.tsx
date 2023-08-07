import { Button, Checkbox, Label, Modal, Table, TextInput } from 'flowbite-react';
import {
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiPlus,
  HiTrash,
} from 'react-icons/hi';
import { addCate, deleteCate, getAllCates, updateCate } from '../../../store/services/categories';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect, useState } from 'react';

import { CateSchema } from '../../../validate/Form';
import { ICategory } from '../../../interfaces/category.type';
import { RootState } from '../../../store/store';
import Swal from 'sweetalert2';
import { exportToExcel } from '../../../utils/excelExport';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const Categories = () => {
  const { categories, isLoading, error } = useAppSelector(
    (state: RootState) => state.persistedReducer.category
  );
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const rows = [
      ...categories.map((item) => [item._id, item.name, item.slug, item.createdAt, item.updatedAt]),
    ];
    console.log('🚀 ~ file: Categories.tsx:33 ~ useEffect ~ rows:', rows);
    setData([...rows]);
  }, [categories]);
  return (
    <>
      <div className="dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200">
        <div className="w-full mb-1">
          <div className="mb-4">
            {/* <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="#">
            <div className="gap-x-3 flex items-center">
              <HiHome className="text-xl" />
              <span className="dark:text-white">Home</span>
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb> */}
            <h1 className="dark:text-white sm:text-2xl text-xl font-semibold text-gray-900">
              All Categories
            </h1>
          </div>
          <div className="sm:flex">
            <div className="dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100 items-center hidden mb-3">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="lg:w-64 xl:w-96 relative mt-1">
                  <TextInput id="users-search" name="users-search" placeholder="Search for users" />
                </div>
              </form>
              <div className="sm:mt-0 sm:pl-2 flex pl-0 mt-3 space-x-1">
                <a
                  href="#"
                  className="hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="sm:space-x-3 flex items-center ml-auto space-x-2">
              <AddCategoryModal error={error} />

              <Button color="gray" onClick={() => exportToExcel(data, 'categories')}>
                <div className="gap-x-3 flex items-center">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <CategoryTable dataCate={categories} error={error} />
            </div>
          </div>
        </div>
      </div>
      {/* <Pagination /> */}
    </>
  );
};

const CategoryTable = ({ dataCate, error }: { dataCate: ICategory[]; error: string }) => {
  console.log(dataCate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCates());
  }, [dispatch]);

  const handleDeleteCate = (id: string) => {
    if (!error && id) {
      Swal.fire({
        icon: 'info',
        title: 'Do you want to delete this Category?',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
          }).then(() => dispatch(deleteCate(id)));
        }
      });
    } else {
      toast.error('Delete failed!');
    }
  };
  return (
    <Table className="dark:divide-gray-600 min-w-full divide-y divide-gray-200">
      <Table.Head className="dark:bg-gray-700 bg-gray-100">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        {/* <Table.HeadCell>Slug</Table.HeadCell>
        <Table.HeadCell>Is Deleted</Table.HeadCell> */}
        {/* <Table.HeadCell>Country</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell> */}
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200">
        {dataCate &&
          dataCate.map((item, index: number) => (
            <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Table.Cell className="w-4 p-4">
                <div className="flex items-center">
                  <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                  <label htmlFor="checkbox-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap dark:text-white w-full p-4 text-base font-medium text-gray-900">
                {item.name}
              </Table.Cell>
              {/* <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900">
                {item.slug}
              </Table.Cell> */}
              {/* <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900">
                True
              </Table.Cell> */}

              <Table.Cell>
                <div className="gap-x-3 whitespace-nowrap flex items-center">
                  <EditCategoryModal dataCate11={item} error={error} />
                  <Button color="failure">
                    <div
                      onClick={() => handleDeleteCate(item._id)}
                      className="gap-x-2 flex items-center"
                    >
                      <HiTrash className="text-lg" />
                      Delete Topping
                    </div>
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

const AddCategoryModal = function ({ error }: { error: string }) {
  const [isOpen, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Pick<ICategory, 'name'>>({
    mode: 'onChange',
    resolver: yupResolver(CateSchema),
  });

  const handleSubmitForm = handleSubmit((data: Pick<ICategory, 'name'>) => {
    if (!error && data) {
      dispatch(addCate(data));
      toast.success(`Category ${data.name} added✔`);
      reset();
    } else {
      toast.error('Category size failed!');
    }

    setOpen(false);
    reset();
  });
  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="gap-x-3 flex items-center">
          <HiPlus className="text-xl" />
          Add Category
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add new Category</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="sm:grid-cols-2 grid grid-cols-1 gap-6">
            <form>
              <Label htmlFor="firstName">Name Category</Label>
              <div className="mt-1">
                <TextInput id="firstName" {...register('name')} placeholder="Bonnie" />
                {errors && <span className="text-red-500 text-[13px]">{errors.name?.message}</span>}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="primary"
            onClick={() => {
              handleSubmitForm();
            }}
          >
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

interface IPropCate {
  dataCate11: ICategory;
  error: string;
}
const EditCategoryModal = function ({ dataCate11, error }: IPropCate) {
  const [isOpen, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<Pick<ICategory, 'name'>>({
    mode: 'onChange',
    resolver: yupResolver(CateSchema),
  });

  const handleSubmitForm = handleSubmit((data) => {
    if (data && !error) {
      dispatch(updateCate({ name: data.name, _id: dataCate11._id }));
      toast.success(`Edited ${data.name} Category`);
      reset();
    } else {
      toast.error('Update failed!');
    }
  });

  useEffect(() => {
    setValue('name', dataCate11.name);
  }, [dataCate11.name, setValue]);
  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="gap-x-3 flex items-center">
          <HiPlus className="text-xl" />
          Edit Category
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit Category</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="sm:grid-cols-2 grid grid-cols-1 gap-6">
            <form>
              <Label htmlFor="firstName">Name Category</Label>
              <div className="mt-1">
                <TextInput {...register('name')} id="firstName" name="name" placeholder="Bonnie" />
                {errors && <span className="text-red-500 text-[13px]">{errors.name?.message}</span>}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="primary"
            onClick={() => {
              handleSubmitForm();
            }}
          >
            Edit Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Categories;
