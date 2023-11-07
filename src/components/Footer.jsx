import { Link } from 'react-router-dom';
import Container from './Container';
import Typography from './Typography';

const Footer = () => {
  return (
    <footer className='bg-black'>
      <Container className='text-white flex gap-4 flex-col sm:flex-row justify-around items-center p-4'>
        <div className='footer-title'>
          <Typography variant='h1'>F1 Souvenirs</Typography>
        </div>
        <div className='footer-links'>
          <ul>
            <li>
              <Typography variant='p' className='hover:text-neutral-400'>
                <Link to={''}>Quíenes somos</Link>
              </Typography>
            </li>
            <li>
              <Typography variant='p' className='hover:text-neutral-400'>
                <Link to={''}>Política de privacidad</Link>
              </Typography>
            </li>
            <li>
              <Typography variant='p' className='hover:text-neutral-400'>
                <Link to={''}>Nuestras tiendas</Link>
              </Typography>
            </li>
            <li>
              <Typography variant='p' className='hover:text-neutral-400'>
                <Link to={''}>Anuncia aquí</Link>
              </Typography>
            </li>
          </ul>
        </div>
        <div className='footer-copy'>
          <Typography variant='h3'>Copyright © 2023</Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
