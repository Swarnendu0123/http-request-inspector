import RequestContainer from "../components/RequestContainer.component";
import RequestDetails from "../components/RequestDetails.component";
import Suggestions from "../components/Suggestions.component";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

const HomeRoute = () => {
    return (
        <div className="">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={25}>
                    <RequestContainer />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <RequestDetails />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30}>
                    <Suggestions />
                </ResizablePanel>
            </ResizablePanelGroup>

        </div>
    )
}

export default HomeRoute;
