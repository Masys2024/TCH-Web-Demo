export default function sortScheduleByDate(data, order = "asc") {
  if (!data || !Array.isArray(data.data)) {
    throw new Error(
      "Invalid data format. Expected an object with a 'data' array."
    );
  }

  // Helper function to parse date strings like "22 July 2025"
  const parseDate = (dateStr) => {
    return new Date(dateStr);
  };

  // Sort logic
  const sortedData = [...data.data].sort((a, b) => {
    const dateA = parseDate(a.date.value);
    const dateB = parseDate(b.date.value);

    return order === "asc" ? dateA - dateB : dateB - dateA;
  });

  return {
    ...data,
    data: sortedData,
  };
}
