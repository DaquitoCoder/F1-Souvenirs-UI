import { Link } from 'react-router-dom';
import '../index.css';
import Button from './Button';
import Typography from './Typography';

const Hero = () => {
  return (
    <div className='hero-image hidden md:block mb-4'>
      <div className='hero-text items-center justify-center flex flex-col'>
        <Typography variant='h2' className='mb-2'>
          Temporada 2023 - Ofertas
        </Typography>
        <Link to='/products'>
          <Button type='button' variant='danger' className='px-4 py-2'>
            Mira las ofertas
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
