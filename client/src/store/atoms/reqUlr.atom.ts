import { atom } from "recoil";

const reqUrl = atom({
    key: 'reqUrl', // unique ID (with respect to other atoms/selectors)
    default: "Gnerate the endpoint URL to get startedgit ", // default value (aka initial value)
});

export default reqUrl;