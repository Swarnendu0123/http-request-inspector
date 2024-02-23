import React from "react";
import RequestContainer from "../components/RequestContainer.component";
import RequestDetails from "../components/RequestDetails.component";

const HomeRoute = () => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <RequestContainer className="sm:col-span-1 col-span-3 max-h-[70vh] overflow-y-auto rounded-xl"/>
            <div className="sm:col-span-2 col-span-3">
            <RequestDetails />
            </div>
            
        </div>
    )
}

export default HomeRoute;