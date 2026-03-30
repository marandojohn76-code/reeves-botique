export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>Reeves Boutique</h4>
          <p>Your one-stop fashion destination. Quality styles delivered to your door.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            <li><a href="#">Women's Fashion</a></li>
            <li><a href="#">Men's Fashion</a></li>
            <li><a href="#">Shoes & Bags</a></li>
            <li><a href="#">Beauty</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>📧 hello@reevesboutique.com</p>
          <p>📞 +234 800 000 0000</p>
          <p>📍 Lagos, Nigeria</p>
          <div className="social-links">
            <a href="#">FB</a>
            <a href="#">IG</a>
            <a href="#">TW</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Reeves Boutique. All rights reserved.</p>
      </div>
    </footer>
  );
}
