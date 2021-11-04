import axios from "axios";

export const getSecretWord = async (setSecretWord: (str: string) => void) => {
  // return response from.
  // need to install backend. tomorrow.
  const { data }: { data: string } = await axios.get("http://localhost:3030");
  console.log("data: ", data);
  setSecretWord(data);

  return data;
};
