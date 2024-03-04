import Image from "next/image";

export const Header: React.FC = () => {
    return (
        <div className="bg-theme-dark h-16 w-full flex justify-between items-center px-4 mb-5">
            <div className="text-white text-xl">
                <button className="relative group">
                    <div className="relative flex items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-theme-dark ring-0 hover:ring-0 group-focus:ring-4 ring-opacity-0 duration-200 shadow-md">
                        <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 group-focus:-rotate-[45deg] origin-center">
                            <div className="bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-right delay-75 group-focus:-translate-y-[1px]"></div>
                            <div className="bg-white h-[1px] rounded"></div>
                            <div className="bg-white h-[2px] w-1/2 rounded self-end transform transition-all duration-300 group-focus:-rotate-90 group-focus:h-[1px] origin-left delay-75 group-focus:translate-y-[1px]"></div>
                        </div>
                    </div>
                </button>
            </div>
            <Image src="/logo.png" alt="CarEvents.com" width={100} height={100} className="max-w-16" />
        </div>
    );
}