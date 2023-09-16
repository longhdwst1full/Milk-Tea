import Chart from 'react-apexcharts'

const DonutChart = () => {
  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: 'smooth'
    },
    chart: {
      type: 'pie',
      toolbar: {
        show: true
      }
    },
    legend: {
      position: 'bottom'
    },
    title: {
      text: 'Demo Donut chart',
      align: 'center'
    },

    labels: ['ahii', 'abc', 'xyz', '123', 'hhhh']

    // fill: {
    //   colors: ['#1A56DB', '#374151', '#93ACAF', '#F3F4F6', '#8e44ad']
    // }
  }

  const series = [44, 55, 13, 33, 100]
  return (
    <div className='rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8 flex-1'>
      <Chart height={420} options={options} series={series} type='donut' />
    </div>
  )
}

export default DonutChart
