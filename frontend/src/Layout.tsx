import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <>
            <div className="flex flex-col h-screen w-screen justify-center items-center">
            
                <div className="mx-auto">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default AppLayout;