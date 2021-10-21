import axios from "axios";

export const getSecretWord = async () => {
  // return response from.
  // need to install backend. tomorrow.
  const { data }: { data: string } = await axios.get("http://localhost:3030");

  return data;
};
