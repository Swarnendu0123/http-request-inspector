import { useSetRecoilState } from "recoil";
import selectedMessege from "../store/atoms/selectedRed.atom";

const Messege = ({ messege }) => {
    const { url, method, time } = messege;
    const setSelectedMessegeIndex = useSetRecoilState(selectedMessege);

    const handleClick = () => {
        setSelectedMessegeIndex(messege);
    }


    return (
        <button type="button" className="hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start  p-4 md:p-5 rounded-xl bg-gray-800 hover:bg-gray-700 focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 active w-full border border-gray-700 mb-3 text-white" id="tabs-with-card-item-1" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab" onClick={handleClick}>
            {method == 'GET' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-500 text-white">
                {method}
            </span>}
            {method == 'POST' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-500 text-white">
                {method}
            </span>}
            {method == 'PUT' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-500 text-white">
                {method}
            </span>}
            {method == 'DELETE' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white">
                {method}
            </span>}
            {method == 'PATCH' && <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-black text-white">
                {method}
            </span>}
            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 ml-5 rounded-full text-xs font-medium border border-gray-800 dark:border-gray-200 text-white">

                {time}
            </span>
            <span className="flex">
                <span className="grow ms-6">
                    <span className="block text-lg font-semibold hs-tab-active:text-blue-600  dark:hs-tab-active:text-blue-500 text-gray-200">
                        {url}
                    </span>
                    <span className="block mt-1  dark:hs-tab-active:text-gray-200 text-gray-200">

                    </span>
                </span>
            </span>
        </button>
    )
}

export default Messege;