import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-top">

                <div className="footer-brand">
                    <h3>PAWMELLE</h3>
                    <p>Pet care made simple.</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 GraphiXy. All Rights Reserved.</p>

                <div className="footer-socials">
                    <a
                        href="https://www.instagram.com/graphixybyanoud/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://www.instagram.com/graphixybyanoud/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Facebook
                    </a>

                    <a
                        href="https://www.linkedin.com/in/anoud-marji-245aa5301"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;