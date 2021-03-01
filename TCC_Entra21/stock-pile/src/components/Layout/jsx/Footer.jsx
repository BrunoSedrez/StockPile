import React from "react";
import './cssLayout/footer.css'
function Footer() {
  return (
    <footer class="teste">
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/yuri-toniolli-vieira-488802201/">
            <img
              class="IMG-linkedin"
              src="https://img.icons8.com/ios/50/000000/linkedin.png"
              alt="linkedin-Yuri"
            />
          </a>
          <p class="footer-letras">Yuri</p>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/guilherme-a-h-m-borges-02b354131/">
            <img
              class="IMG-linkedin"
              src="https://img.icons8.com/ios/50/000000/linkedin.png"
              alt="linkedin-Guilherme"
            />
          </a>
          <p class="footer-letras">Guilherme</p>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/bruno-sedrez-8006b61b0/">
            <img
              class="IMG-linkedin"
              src="https://img.icons8.com/ios/50/000000/linkedin.png"
              alt="Linkedin-Bruno"
            />
          </a>
          <p class="footer-letras">Bruno</p>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/italo-ramon-silva-pereira-404519109/">
            <img
              class="IMG-linkedin"
              src="https://img.icons8.com/ios/50/000000/linkedin.png"
              alt="linkedin-Italo"
            />
          </a>
          <p class="footer-letras">Italo</p>
        </li>
        <li className="entra21">
          <a href="/">
            <p>By Entra21</p>
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
