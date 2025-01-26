export function formatMessageTime(date: Date | string | undefined): string {
  if (!date) return ""; // Handle undefined or null dates
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return parsedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}