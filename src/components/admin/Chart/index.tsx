import { useTheme } from 'flowbite-react'
import Chart from 'react-apexcharts'

const AdminChart = () => {
  const { mode } = useTheme()

  const isDarkTheme = mode === 'dark'

  const borderColor = isDarkTheme ? '#374151' : '#F3F4F6'
  const labelColor = isDarkTheme ? '#93ACAF' : '#6B7280'
  const opacityFrom = isDarkTheme ? 0 : 1
  const opacityTo = isDarkTheme ? 0 : 1

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: 'smooth'
    },
    chart: {
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      foreColor: labelColor,
      toolbar: {
        show: true
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom,
        opacityTo,
        type: 'vertical'
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif'
      },
      followCursor: true
    },
    grid: {
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15
      }
    },
    markers: {
      size: 5,
      strokeColors: '#ffffff',
      hover: {
        size: undefined,
        sizeOffset: 3
      }
    },
    xaxis: {
      categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb', '08 Feb'],
      labels: {
        style: {
          colors: [labelColor],
          fontSize: '14px',
          fontWeight: 500
        }
      },
      axisBorder: {
        color: borderColor
      },
      axisTicks: {
        color: borderColor
      },
      crosshairs: {
        show: true,
        position: 'back',
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 10
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: '14px',
          fontWeight: 500
        },
        formatter: function (value) {
          return '$' + value
        }
      }
    },
    legend: {
      fontSize: '14px',
      fontWeight: 500,
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: [labelColor]
      },
      itemMargin: {
        horizontal: 10
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false
            }
          }
        }
      }
    ]
  }
  const series = [
    {
      name: 'Revenue',
      data: [6356, 6218, 6156, 6526, 6356, 6256, 6056, 10000],
      color: '#1A56DB'
    },
    {
      name: 'Products',
      data: [6356, 2000, 1000, 5696, 6356, 3023, 6056, 7084],
      color: '#f39c12'
    },
    {
      name: 'User',
      data: [190, 402, 782, 420, 821, 928, 1032, 325],
      color: '#8e44ad'
    }
  ]
  return (
    <div className='rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='shrink-0'>
          <span className='text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl'>$45,385</span>
          <h3 className='text-base font-normal text-gray-600 dark:text-gray-400'>Sales this week</h3>
        </div>
        <div className='flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400'>
          12.5%
          <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>

      {/* AdminChart */}
      <Chart height={420} options={options} series={series} type='area' />
      {/* AdminChart */}
    </div>
  )
}

export default AdminChart
