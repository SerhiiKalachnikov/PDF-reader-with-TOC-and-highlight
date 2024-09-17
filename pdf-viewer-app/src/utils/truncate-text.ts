export const truncateText = (text: string, truncateAfter: number) => {
  return text.length > truncateAfter
    ? text.slice(0, truncateAfter) + "..."
    : text;
};
