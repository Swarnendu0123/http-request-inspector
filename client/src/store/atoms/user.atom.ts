import { atom } from "recoil";
import { User } from 'firebase/auth';

export const userAtom = atom<User | null>({
    key: 'userAtom', // unique ID (with respect to other atoms/selectors)
    default: null
});
