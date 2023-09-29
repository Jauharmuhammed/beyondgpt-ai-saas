import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
    return (
        <Toaster
            toastOptions={{
                error: {
                    icon: null,
                    style: {
                        backgroundColor: "#7f1d1d",
                        color: "#f8fafc",
                    },
                },
            }}
        />
    );
};
