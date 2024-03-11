import { SignOutBtn } from '@/shared/SignOutBtn';
import { auth } from '@/auth';

const Dashboard: React.FC = async () => {
    let session = await auth();
    let user = session?.user;

    return (
        <div className='flex flex-col container items-center justify-center w-full h-full'>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-white/70 text-sm">Welcome to the dashboard, {user?.first_name}!</p>
            <div className="flex justify-center items-center my-5 w-full px-4">
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-600 w-32 font-bold">First Name</p>
                        <p className="text-gray-600 text-sm">{user?.first_name}</p>
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-600 w-32 font-bold">Last Name</p>
                        <p className="text-gray-600 text-sm">{user?.last_name}</p>
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-600 w-32 font-bold">Email</p>
                        <p className="text-gray-600 text-sm">{user?.email}</p>
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-600 font-bold">Roles</p>
                        {user?.roles.map((role, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{role}</span>
                        ))}
                    </div>
                </div>
            </div>
            <SignOutBtn />
        </div>
    );

}

export default Dashboard