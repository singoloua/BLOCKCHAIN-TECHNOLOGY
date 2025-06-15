import logo from '../../img/logo.png';

const Footer = () => {
    return (
        <div className='w-full flex md:justify-between items-center flex-col p-4 gradient-bg-footer'>
            
                <div className='flex flex-[0.5] justify-center items-center'>
                    <img src={logo} alt="logo" className='w-32' />
                </div>
                
            
            <div className='flex justify-center items-center flex-col mt-5'>
                <p className='text-black text-sm text-center'> Made By Singo LOUA</p>
                <p className='text-black text-sm text-center'> singoloua@gmail.com</p>
            </div>
            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />

            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-black text-left text-xs">@SingoCrypt 2023</p>
                <p className="text-black text-right text-xs">©All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;