export default function Footer(){
    const year = new Date().getFullYear()
    return (
        <footer className="absolute bottom-0 w-full flex justify-center p-2  transition-all duration-200">
            <p className="text-xs max-[500px]:text-[.6em]">
                {year} The Citadel Global Community Church. All Rights Reserved.
            </p>
        </footer>
    )
}