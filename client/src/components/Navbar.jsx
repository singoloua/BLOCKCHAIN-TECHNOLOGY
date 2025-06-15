import logo from '../../img/logo.png';

const Navbar = () => {
    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-2 white-glassmorphism'>
            <div className="md:flex-[0.10] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-32 cursor-pointer" />
            </div>
        </nav> 
    );
}

export default Navbar;