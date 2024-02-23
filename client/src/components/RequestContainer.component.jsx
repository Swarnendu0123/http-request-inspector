import { useRecoilValue } from "recoil";
import allMesseges from "../store/atoms/allMeggeges.atom";
import RequestMessege from "./RequestMessege.component";

const RequestContainer = () => {
    const messeges = useRecoilValue(allMesseges);

    return (
        <div className="hide-scroll sm:col-span-1 col-span-3 max-h-[70vh] overflow-y-auto rounded-xl">
            {
                messeges.map((item, index) => {
                    return <RequestMessege key={index} messege={item} />
                })
            }
        </div>
    )
}

export default RequestContainer;