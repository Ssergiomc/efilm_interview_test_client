import logoGithub from './github.png';

function Footer() {
    return (
        <footer className="bg-light">
            <p>Una aplicación de <a href="https://www.linkedin.com/in/sergio-martinez-cuesta/" target="_blank" rel="noreferrer">Sergio M.C.</a></p>
            <div className="footerIcons">
                <a href="https://github.com/Ssergiomc">
                    <img className="logoGithub" src={logoGithub} alt="logo github" />
                </a>
                {/* <a href="https://github.com/Ssergiomc" target="_blank" rel="noreferrer">Github</a> */}
                <a href="https://ssergiomc.github.io/" target="_blank" rel="noreferrer">Portfolio</a>
            </div>
        </footer>
    )
}

export default Footer;