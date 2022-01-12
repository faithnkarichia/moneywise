import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import Footer from 'components/Footers/Footer.js';

export default function Layout({ children }) {
  return (
    <>
      <IndexNavbar fixed />
      <main>{children}</main>
      <Footer />
    </>
  );
}
