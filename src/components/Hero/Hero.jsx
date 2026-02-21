import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <video
                src="/hero-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="hero-bg-video"
            />
            <div className="hero-overlay"></div>

            <div className="hero-container container">
                <div className="hero-content">
                    <div className="hero-text-side">
                        <h3>Mega Sorteio! ———</h3>
                        <h1 className="hero-title">
                            DSE - TV 75
                        </h1>
                        <p className="hero-subtitle">GARANTA JÁ O SEU BILHETE</p>
                        <button className="primary-btn neon-glow">VER AGORA</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
