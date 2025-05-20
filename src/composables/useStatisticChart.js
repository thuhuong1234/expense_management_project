import { ref } from "vue";
const generateDateRange = async (from, to) => {
  const start = new Date(from);
  const end = new Date(to);
  const dates = [];

  while (start <= end) {
    dates.push(start.toISOString().slice(0, 10));
    start.setDate(start.getDate() + 1);
  }
  return dates;
};
export function useStatisticChart(getStatisticFn) {
  const labels = ref([]);
  const expenseData = ref([]);
  const incomeData = ref([]);
  const totalData = ref([]);
  const processStatisticData = async (data) => {
    if (!data) return;

    labels.value = await generateDateRange(data.from, data.to);

    const byDay = data.byDay || {};

    expenseData.value = [];
    incomeData.value = [];
    totalData.value = [];

    labels.value.forEach((date) => {
      if (byDay[date]) {
        expenseData.value.push(byDay[date].expense || 0);
        incomeData.value.push(byDay[date].income || 0);
        totalData.value.push(byDay[date].total || 0);
      } else {
        expenseData.value.push(0);
        incomeData.value.push(0);
        totalData.value.push(0);
      }
    });
  };
  const chartData = ref(null);
  const loadChartData = async () => {
    const data = await getStatisticFn();
    await processStatisticData(data);
    chartData.value = {
      labels: [...labels.value],
      data: [...expenseData.value],
      data2: [...incomeData.value],
      data3: [...totalData.value],
    };
  };
  return {
    labels,
    expenseData,
    incomeData,
    totalData,
    chartData,
    loadChartData,
  };
}
