export const formatPrice = (number: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const addUserToLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};
