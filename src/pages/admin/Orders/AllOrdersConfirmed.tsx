import React from 'react';
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
} from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';
type Props = {};

const AllOrdersConfirmed = (props: Props) => {
  return (
    <Table className="min-w-full min-h-[100vh] divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>User Name</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Position</Table.HeadCell>
        <Table.HeadCell>Deleted</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {[0, 1, 2, 3].map((_, index) => (
          <Table.Row key={index} className={`  hover:bg-gray-100 dark:hover:bg-gray-700 `}>
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                <label htmlFor="checkbox-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <img
                className="h-10 w-10 rounded-full"
                src={`https://api.multiavatar.com/datnguyen`}
                alt=""
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">abc</div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">abc</div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
              Confirmed
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
              abc
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-white dark:text-white capitalize ">
              <span className={` rounded inline-block px-2`}>abc</span>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center  capitalize">
                <div className={`mr-2 h-2.5 w-2.5 rounded-full  `}></div>
                abc
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <Button color="primary">
                  <Link to={`/admin/orders/abc`} className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Detail
                  </Link>
                </Button>
                <Button color="failure">
                  <div className="flex items-center gap-x-2">Delete order</div>
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default AllOrdersConfirmed;
