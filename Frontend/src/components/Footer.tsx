

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={` w-full flex justify-center p-2  transition-all duration-200 bg-[url('/images/praise.jpg')] bg-cover bg-no-repeat`}
            
        >
            <p className="text-xs text-white max-[500px]:text-[.6em]">
            &copy; {year} The Citadel Global Community Church. All Rights Reserved.
            </p>
        </footer>
    )
}

export default Footer;