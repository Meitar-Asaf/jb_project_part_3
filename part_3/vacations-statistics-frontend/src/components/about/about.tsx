import React from 'react';

const About: React.FC = () => {
    return (
        <div className="about-container">
            <h1>About Me</h1>
            <div className="about-content">
                <div className="about-image">
                    {/* Place your image here */}
                    <img src="/path/to/your-image.jpg" alt="Meitar Asaf" style={{ width: '200px', borderRadius: '50%' }} />
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
