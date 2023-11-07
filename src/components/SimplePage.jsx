import Navbar from './Navbar';
import Footer from './Footer';

const SimplePage = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default SimplePage;
