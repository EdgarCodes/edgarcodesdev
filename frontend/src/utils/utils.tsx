
function getReadableDate(date: Date): string {
  const readable_date= date == null ? "N/A": new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
  return readable_date
}

export { getReadableDate }
