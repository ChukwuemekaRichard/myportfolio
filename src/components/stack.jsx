import React from 'react';
import styled from 'styled-components';
import vite from '../assets/vite.jpg';
import react from '../assets/react.png';
import tailwind from '../assets/tailwind.png';
import node from '../assets/nextjs.png';
import python from '../assets/html.png';
import js from '../assets/js.png';
import docker from '../assets/jquery.png';
import git from '../assets/jquery.png';



const Card = () => {
  const techStacks = [
    { icon: vite, color: '142, 249, 252', name: 'React' },
    { icon: react, color: '142, 252, 204', name: 'Node.js' },
    { icon: tailwind, color: '142, 252, 157', name: 'Python' },
    { icon: node, color: '215, 252, 142', name: 'JavaScript' },
    { icon: python, color: '252, 252, 142', name: 'Docker' },
    { icon: js, color: '252, 208, 142', name: 'Git' },
    { icon: docker, color: '252, 142, 142', name: 'AWS' },
    { icon: git, color: '252, 142, 239', name: 'GraphQL' },
    { icon: git, color: '204, 142, 252', name: 'TypeScript' },
    { icon: git, color: '142, 202, 252', name: 'MongoDB' },
  ];

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="inner" style={{ '--quantity': techStacks.length }}>
          {techStacks.map((tech, index) => (
            <div 
              key={index}
              className="card" 
              style={{
                '--index': index,
                '--color-card': tech.color
              }}
            >
              <div className="card-content">
                <img src={tech.icon} alt={tech.name} className="tech-icon" />
                <span className="tech-name">{tech.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wrapper {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #000;
  }

  .inner {
    --w: 150px;
    --h: 160px;
    --translateZ: calc((var(--w) + var(--h)) + 0px);
    --rotateX: -15deg;
    --perspective: 1000px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    top: 25%;
    left: calc(50% - (var(--w) / 2));
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective));
    animation: rotating 20s linear infinite;
  }

  @keyframes rotating {
    from {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(0);
    }
    to {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(1turn);
    }
  }

  .card {
    position: absolute;
    border: 3px solid rgba(var(--color-card), 0.8);
    border-radius: 12px;
    overflow: hidden;
    inset: 0;
    background: #111;
    box-shadow: 0 0 10px rgba(var(--color-card), 0.3);
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
      translateZ(var(--translateZ));
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
      translateZ(calc(var(--translateZ) + 30px)) scale(1.05);
    box-shadow: 0 0 20px rgba(var(--color-card), 0.6);
  }

  .card-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    box-sizing: border-box;
  }

  .tech-icon {
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin-bottom: 10px;
    filter: brightness(0.9);
  }

  .tech-name {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
`;

export default Card;