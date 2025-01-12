 // creates numbers on X axis of chart
 export const getChartLabels = (selectedDay: number) => {
  const now = new Date();
  const labels: any[] = [];

  // Check if selectedDay is 1 (for 1-day data)
  if (selectedDay === 1) {
    // Get the current time in hours and minutes
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Calculate 24 hours ago
    const pastDate = new Date(now);
    pastDate.setHours(now.getHours() - 24);
    const pastHour = pastDate.getHours();

    // Create an array of representative hours
    const hours = [pastHour, 0, 4, 8, 12, 16, 20, currentHour];

    // Map through hours and format them
    const formattedLabels = hours.map((hour, index) => {
      if (index === hours.length - 1) {
        // For the last item (current time), include minutes
        return `${hour}:${currentMinute < 10 ? "0" + currentMinute : currentMinute}`;
      }
      return `${hour}:00`; // For other hours, just show the hour
    });

    labels.push(...formattedLabels);
  } else {
    // If selectedDay is greater than 1, calculate labels based on the number of days
    const numOfDays = new Date(now.setDate(now.getDate() - selectedDay));
    for (let d = new Date(); d > numOfDays; d.setDate(d.getDate() - 1)) {
      const day = d.getDate();
      labels.push(day);
    }
    labels.reverse();
  }

  return labels;
};