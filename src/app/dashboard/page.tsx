import { SignOutBtn } from '@/shared/SignOutBtn';
import { auth } from '@/auth';

const Dashboard: React.FC = async () => {
    let session = await auth();
    let user = session?.user;

    return (
        <div className='flex flex-col container items-center justify-center h-full'>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-white/70 text-sm">Welcome to the dashboard, {user?.first_name}!</p>
            <div className="flex justify-center items-center my-5">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-600 w-32">First Name</p>
                        <p className="text-gray-600">{user?.first_name}</p>
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-600 w-32">Last Name</p>
                        <p className="text-gray-600">{user?.last_name}</p>
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-600 w-32">Email</p>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-600">Roles</p>
                        <ul className="list-disc ml-6">
                            {user?.roles?.map((role, index) => (
                                <li key={index} className="text-gray-600">{role}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <SignOutBtn />
        </div>
    );

}

export default Dashboard