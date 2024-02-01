import { atom } from "recoil";

const selectedMessege = atom({
    key: 'selectedMessege', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
  });

export default selectedMessege;