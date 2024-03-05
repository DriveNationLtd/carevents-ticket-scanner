import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { SignOutBtn } from '@/shared/SignOutBtn';

const Dashboard: React.FC = async () => {
    let session = await getServerSession(options);
    let user = session?.user;

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/dashboard");
    }

    return (
        <div className='flex flex-col'>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard, {user?.name}!</p>
            {JSON.stringify(user, null, 2)}
            <SignOutBtn />
        </div>
    );
}

export default Dashboard