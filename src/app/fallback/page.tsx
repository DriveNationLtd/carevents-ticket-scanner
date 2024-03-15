import "@/app/globals.css";
import ProtectedLayout from "../(protected)/layout";

const FallBack: React.FC = () => {
    return (
        <ProtectedLayout>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-bold text-white'>You are offline</h1>
                <p className='text-white'>Please check your internet connection</p>
            </div>
        </ProtectedLayout>
    );
}

export default FallBack;