const HelpPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full mt-6">
            <h1 className="text-4xl font-bold">Help</h1>
            <p className="text-lg">Need help? Contact us at <a href="mailto:" className="text-theme-primary">mail</a></p>
        </div>
    );
}

export default HelpPage;