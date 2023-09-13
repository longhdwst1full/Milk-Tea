import type { FC } from 'react'
import AdminChart from '../../../components/admin/Chart'
import DonutChart from '../../../components/admin/DonutChart'

const Dashboard = () => {
  return (
    <div className='px-4 pt-6'>
      <AdminChart />
      <div className='mt-6 flex items-center gap-x-3'>
        <DonutChart />
        <DonutChart />
      </div>
      <div className='my-6'>
        <LatestCustomers />
      </div>
    </div>
  )
}

const LatestCustomers: FC = function () {
  return (
    <div className='dark:bg-gray-800 sm:p-6 h-full p-4 mb-4 bg-white rounded-lg shadow'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='dark:text-white text-xl font-bold leading-none text-gray-900'>Latest Customers</h3>
        <a
          href='#'
          className='text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 inline-flex items-center p-2 text-sm font-medium rounded-lg'
        >
          View all
        </a>
      </div>
      <div className='flow-root'>
        <ul className='dark:divide-gray-700 divide-y divide-gray-200'>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((_, index: number) => (
            <li key={index} className='sm:py-4 py-3'>
              <div className='flex items-center space-x-4'>
                <div className='shrink-0'>
                  <img className='w-8 h-8 rounded-full' src='/images/users/neil-sims.png' alt='' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='dark:text-white text-sm font-medium text-gray-900 truncate'>Neil Sims</p>
                  <p className='dark:text-gray-400 text-sm text-gray-500 truncate'>email@flowbite.com</p>
                </div>
                <div className='dark:text-white inline-flex items-center text-base font-semibold text-gray-900'>
                  $320
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Dashboard
