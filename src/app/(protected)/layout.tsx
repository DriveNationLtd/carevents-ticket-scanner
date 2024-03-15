import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <div className="h-20"></div> {/* Spacer */}
            <Footer />
        </>
    )
}

export default ProtectedLayout