import React from 'react';
import { Badge, Dropdown, Table, useTheme } from 'flowbite-react';
import type { FC } from 'react';
import Chart from 'react-apexcharts';
import AdminChart from '../../../components/admin/Chart';
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="px-4 pt-6">
      <AdminChart />
      <div className="my-6">
        <LatestCustomers />
      </div>
    </div>
  );
};

const LatestCustomers: FC = function () {
  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h3>
        <a
          href="#"
          className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((_, index: number) => (
            <li key={index} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <img className="h-8 w-8 rounded-full" src="/images/users/neil-sims.png" alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Neil Sims
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@flowbite.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $320
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Dashboard;
