import { CircularProgress } from "@nextui-org/react";
import React from "react";

const Loading = () => {
    return (
        <div className="container h-full mx-auto">
            <div className="flex h-full justify-center items-center">
                <CircularProgress
                    classNames={{ indicator: "stroke-accent-200" }}
                    label="Loading..."
                />
            </div>
        </div>
    );
};

export default Loading;
