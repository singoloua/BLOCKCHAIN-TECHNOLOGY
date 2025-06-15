import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({ color, title, icon, subtitle }) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className='mt-2 text-black text-lg'>{title}</h1>
            <p className='mt-1 text-black text-sm md:w-9/12'>{subtitle}</p>
        </div>
    </div>
);

const Services = () => {
    return (
        <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className="text-c text-10xl sm:text-5xl py-2 text-gradient">
                        We will always upgrade<br/>
                         our services for your security.
                    </h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-start items-center">
                <ServiceCard 
                    color="bg-[#000000]"
                    title="Security Guaranteed"
                    icon={<BsShieldFillCheck fontSize={21} className="text-white"/>}
                    />

                <ServiceCard 
                    color="bg-[#FFBF00]"
                    title="Best exchange rates"
                    icon={<BiSearchAlt fontSize={21} className="text-white"/>}
                   />

                <ServiceCard 
                    color="bg-[#FF0000]"
                    title="Fastest transactions"
                    icon={<RiHeart2Fill fontSize={21} className="text-white"/>}
                  />
            </div>
        </div>
    );
}

export default Services;