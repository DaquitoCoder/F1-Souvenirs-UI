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
        <Button type='button' variant='danger' className='p-2'>
          Mira las ofertas
        </Button>
      </div>
    </div>
  );
};

export default Hero;
