import { Button, Checkbox, Label, Modal, Table, TextInput } from 'flowbite-react';

import { useEffect, useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addCate, deleteCate, getAllCates, updateCate } from '../../../store/services/categories';
import { RootState } from '../../../store/store';
import { useForm } from 'react-hook-form';
import { ICategory } from '../../../interfaces/category.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { CateSchema } from '../../../validate/Form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Categories = () => {
  const { categories, isLoading, error } = useAppSelector(
    (state: RootState) => state.persistedReducer.category
  );
  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            {/* <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="#">
            <div className="flex items-center gap-x-3">
              <HiHome className="text-xl" />
              <span className="dark:text-white">Home</span>
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb> */}
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Categories
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput id="users-search" name="users-search" placeholder="Search for users" />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
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
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddCategoryModal error={error} />

              <Button color="gray">
                <div className="flex items-center gap-x-3">
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
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
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
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
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
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white w-full">
                {item.name}
              </Table.Cell>
              {/* <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {item.slug}
              </Table.Cell> */}
              {/* <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                True
              </Table.Cell> */}

              <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <EditCategoryModal dataCate11={item} error={error} />
                  <Button color="failure">
                    <div
                      onClick={() => handleDeleteCate(item._id)}
                      className="flex items-center gap-x-2"
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
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add Category
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add new Category</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Edit Category
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit Category</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
