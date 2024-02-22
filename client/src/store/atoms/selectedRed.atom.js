import { atom } from "recoil";

const selectedMessege = atom({
    key: 'selectedMessege', // unique ID (with respect to other atoms/selectors)
    default: 
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
    
    }
});

export default selectedMessege;