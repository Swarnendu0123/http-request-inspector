import { atom } from "recoil";

const reqUrl = atom({
    key: 'reqUrl', // unique ID (with respect to other atoms/selectors)
    default: "Generate the endpoint URL to get started", // default value (aka initial value)
});

export default reqUrl;