<template>
  <Bar v-if="props.chartData" 
    :data="props.chartData" 
    :options="props.options" class=" max-h-[200px]" />
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.defaults.datasets.bar.maxBarThickness = 30;
const props = defineProps({
    chartData: null,
    options: null,
});
const titles = ['t1', 't2', 't3'];
const data = {
  labels: ['Sydani', 'USCD'],
  datasets: [
    {
      label: 'Funding',
      backgroundColor: 'red',
      data: [88, 3],
    },
    {
      label: 'Logistics',
      backgroundColor: 'blue',
      data: [40, 44],
    },
    {
      label: 'ACSM',
      backgroundColor: 'yellow',
      data: [20, 44],
    },
    {
      label: 'Technical',
      backgroundColor: 'green',
      data: [55, 81],
    },
  ],
};

const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Custom Chart Title',
      padding: {
          top: 10,
          bottom: 30
      }
    },
    legend: {
      display: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  },
  barThickness: 20
};
</script>