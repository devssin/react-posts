import {FaLaptop, FaMobileAlt, FaTabletAlt} from 'react-icons/fa'

const Header = ({title ,width}) => {
    return (
        <header className="Header">
            <h1>{title}</h1>
            {width > 900 ? <FaLaptop />:
             width > 678 ? <FaTabletAlt/>:
             <FaMobileAlt />
            }
        </header>
    )
}

export default Header
