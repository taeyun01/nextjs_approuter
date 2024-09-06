export const delay = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
};

export const delay2 = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
