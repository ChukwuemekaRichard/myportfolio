import React from 'react';
import { FaReact, FaFigma } from 'react-icons/fa';

const ElectricStackBubbles = () => {
  return (
    <div style={{ 
      
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      top: '100px',
      height: '30vh'
    }}>
      {/* SVG Filter Definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="turbulent-displace-react" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="15" xChannelSelector="R" yChannelSelector="B" />
          </filter>
          <filter id="turbulent-displace-figma" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="3" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="0; 700" dur="5s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="3" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="-700; 0" dur="5s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="4" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="0; 490" dur="5s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="4" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="-490; 0" dur="5s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="15" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <div className="stack-bubbles">
        <div className="stack-bubble electric-bubble" id="react">
          <div className="card-container react-theme">
            <div className="inner-container">
              <div className="border-outer">
                <div className="main-card"></div>
              </div>
              <div className="glow-layer-1"></div>
              <div className="glow-layer-2"></div>
            </div>
            <div className="overlay-1"></div>
            <div className="overlay-2"></div>
            <div className="background-glow"></div>
            <div className="content-container">
              <FaReact color="#61DAFB" size={50} />
            </div>
          </div>
        </div>
        
        <div className="stack-bubble electric-bubble" id="figma">
          <div className="card-container figma-theme">
            <div className="inner-container">
              <div className="border-outer">
                <div className="main-card"></div>
              </div>
              <div className="glow-layer-1"></div>
              <div className="glow-layer-2"></div>
            </div>
            <div className="overlay-1"></div>
            <div className="overlay-2"></div>
            <div className="background-glow"></div>
            <div className="content-container">
              <FaFigma color="#F24E1E" size={50} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* CSS Variables for your colors */
        :root {
          --gradient-cyan: linear-gradient(89deg, #02AAB0 0%, #00CDAC 100%);
          --gradient-purple: linear-gradient(87deg, #FF47DA 0%, #5A5AE0 100%);
          --color-neutral-900: #0f0f0f;
        }

        .react-theme {
          --electric-border-color: #02AAB0;
          --electric-light-color: #00CDAC;
          --gradient-color: rgba(2, 170, 176, 0.4);
        }

        .figma-theme {
          --electric-border-color: #FF47DA;
          --electric-light-color: #5A5AE0;
          --gradient-color: rgba(255, 71, 218, 0.4);
        }

        .stack-bubbles {
          display: flex;
          gap: 170px;
          position: absolute;
          // top:200px;
          left: 50%;
          
          width: 100%;
          justify-content: center;
          align-items: center;
        }

        .stack-bubble {
          width: 120px;
          height: 120px;
          position: relative;
          cursor: pointer;
        }

        #react {
          transform: rotate(47deg);
          
          transition: transform 0.3s ease;
        }

        #figma {
          transform: rotate(-47deg);
          transition: transform 0.3s ease;
        }

        .stack-bubble:hover {
          transform: rotate(0deg) scale(1.05) !important;
        }

        /* Card container */
        .card-container {
          padding: 2px;
          border-radius: 24px;
          position: relative;
          width: 120px;
          height: 100%;
          background: linear-gradient(
              -30deg,
              var(--gradient-color),
              transparent,
              var(--gradient-color)
            ),
            linear-gradient(
              to bottom,
              var(--color-neutral-900),
              var(--color-neutral-900)
            );
        }

        /* Inner container */
        .inner-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* Border layers */
        .border-outer {
          border: 2px solid var(--electric-border-color);
          border-radius: 24px;
          padding-right: 4px;
          padding-bottom: 4px;
          width: 100%;
          height: 100%;
          opacity: 0.5;
        }

        .main-card {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          border: 2px solid var(--electric-border-color);
          margin-top: -4px;
          margin-left: -4px;
        }

        .react-theme .main-card {
          filter: url(#turbulent-displace-react);
        }

        .figma-theme .main-card {
          filter: url(#turbulent-displace-figma);
        }

        /* Glow effects */
        .glow-layer-1 {
          border: 2px solid var(--electric-border-color);
          border-radius: 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          filter: blur(1px);
          opacity: 0.6;
        }

        .glow-layer-2 {
          border: 2px solid var(--electric-light-color);
          border-radius: 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          filter: blur(4px);
          opacity: 0.8;
        }

        /* Overlay effects */
        .overlay-1 {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          opacity: 0.3;
          mix-blend-mode: overlay;
          transform: scale(1.1);
          filter: blur(8px);
          background: linear-gradient(
            -30deg,
            white,
            transparent 30%,
            transparent 70%,
            white
          );
        }

        .overlay-2 {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          opacity: 0.2;
          mix-blend-mode: overlay;
          transform: scale(1.1);
          filter: blur(8px);
          background: linear-gradient(
            -30deg,
            white,
            transparent 30%,
            transparent 70%,
            white
          );
        }

        /* Background glow */
        .background-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24px;
          filter: blur(16px);
          transform: scale(1.1);
          opacity: 0.4;
          z-index: -1;
          background: linear-gradient(
            -30deg,
            var(--electric-light-color),
            transparent,
            var(--electric-border-color)
          );
        }

        /* Content container */
        .content-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
          @media screen and (max-width:760px){
            .stack-bubble{
            height:100px;

            }
            .stack-bubbles{
            gap:150px;
            }
            .card-container{
              width:100px;
            }
          }
      `}</style>
    </div>
  );
};

export default ElectricStackBubbles;