export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    console.error("Invalid JSON:", e);
    return false;
  }
};
