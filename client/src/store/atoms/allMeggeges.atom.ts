import { atom } from "recoil";

const allMesseges = atom({
    key: 'allMesseges', // unique ID (with respect to other atoms/selectors)
    default: [
        {
            url: "example.com",
            method: "GET",
            body: {
                key: "value",
            },
            headers: {
                key: "value",
            },
            params: {
                key: "value",
            },
            query: {
                key: "value",
            },
            index: 0,
            time: new Date().toLocaleTimeString(), 
        },
    ], // default value (aka initial value)
});

export default allMesseges;
