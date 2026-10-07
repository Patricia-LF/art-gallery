export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>© {year} Patricia Loayza Frykberg. All artworks are my own.</p>
      <nav aria-label="Contact and links">
        <a href="https://patriciafrykberg.se/portfolio">Portfolio</a>
        <a href="https://github.com/Patricia-LF/art-gallery">Source code</a>
      </nav>
    </footer>
  );
}
