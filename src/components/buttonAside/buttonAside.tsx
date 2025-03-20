import './buttonAside.css'

interface ButtonAsideProps {
    img: string;
    link: string;
}

export default function ButtonAside({img, link}: ButtonAsideProps) {
    return (
        <button className='buttonAside'><img src={img}/></button>
    )
}