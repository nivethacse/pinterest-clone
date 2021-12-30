const Footer = () => {
  return (
    <div className="footer">
      <i
        onClick={() => {
          window.open("https://github.com/infinites5/pinclone");
        }}
        className="fa fa-github"
        aria-hidden="true"
      ></i>
    </div>
  );
};
export default Footer;
