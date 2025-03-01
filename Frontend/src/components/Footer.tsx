interface Props {

    isLocationValid: boolean;

}

const Footer: React.FC<Props> = ({ isLocationValid }) => {
    const year = new Date().getFullYear()

    const pageHeight = window.innerHeight


    return (
        <footer className={`${isLocationValid ? "" : "absolute bottom-0"} w-full flex justify-center p-2  transition-all duration-200 mt-16`}
            style={{backgroundImage: "url(static/images/praise.jpg)"}}
        >
            <p className="text-xs text-white max-[500px]:text-[.6em]">
            &copy; {year} The Citadel Global Community Church. All Rights Reserved.
            </p>
        </footer>
    )
}

export default Footer;