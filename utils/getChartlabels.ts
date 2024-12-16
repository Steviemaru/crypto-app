 // creates numbers on X axis of chart
 export const getChartLabels = (selectedDay:number) => {
    const now = new Date();
    const numOfDays = new Date(now.setDate(now.getDate() - selectedDay));
    const labels: any[] = [];
    for (let d = new Date(); d > numOfDays; d.setDate(d.getDate() - 1)) {
      const day = d.getDate();
      labels.push(day);
    }
    labels.reverse();
    return labels;
  };