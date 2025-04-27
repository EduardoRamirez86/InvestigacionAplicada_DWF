import '../style/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} MiApp. Todos los derechos reservados.
    </footer>
  );
}
