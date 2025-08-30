import React from 'react';

/**
 * The About component is a simple page that displays some information about me.
 * It includes a photo, my name, age, and a short description of my passion for technology and web development.
 * This component is used as a route in the App component.
 */
const About: React.FC = () => {
    return (
        <div className="about-container">
            <h1>About Me</h1>
            <div className="about-content">
                <div className="about-image">
                    {/* Place your image here */}
                    <img src="images/meitar_asaf.jpg" alt="Meitar Asaf" />
                </div>
                <div className="about-text">
                    <p>
                        My name is <strong>Meitar Asaf</strong>, I am 28 years old.<br />
                        This is my final project for the <strong>Python Full Stack</strong> course at <strong>John Bryce College</strong>.<br />
                        I am passionate about technology, web development, and learning new things.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
