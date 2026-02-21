import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col footer-brand">
                        <img src="/logo.png" alt="DASPORTS" className="footer-logo" />
                        <p>Sua loja oficial de figurinhas e álbuns da Copa do Mundo 2026.</p>
                    </div>

                    <div className="footer-col">
                        <h4>Loja</h4>
                        <ul>
                            <li><Link to="/categoria/albuns">Álbuns</Link></li>
                            <li><Link to="/categoria/figurinhas">Figurinhas</Link></li>
                            <li><Link to="/categoria/combos">Combos</Link></li>
                            <li><Link to="/categoria/especiais">Especiais</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Ajuda</h4>
                        <ul>
                            <li><a href="#">Rastrear Pedido</a></li>
                            <li><a href="#">Trocas e Devoluções</a></li>
                            <li><a href="#">Perguntas Frequentes</a></li>
                            <li><a href="#">Fale Conosco</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contato</h4>
                        <ul>
                            <li>📧 contato@dasports.com</li>
                            <li>📱 (00) 00000-0000</li>
                            <li>📍 São Paulo, SP</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 DASPORTS. Todos os direitos reservados.</span>
                    <div className="footer-payment-icons">
                        <span>💳 Visa</span>
                        <span>💳 Mastercard</span>
                        <span>◈ PIX</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
