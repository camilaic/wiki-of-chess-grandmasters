import "./header.css";

interface HeaderProps {
  title: string;
  imageSrc: string;
  altForImage: string;
}

function Header({ title, imageSrc, altForImage }: HeaderProps) {
  return (
    <div className="head-container">
      <img
        src={imageSrc}
        alt={altForImage}
        width="80"
        height="80"
        className="image"
      />
      <h1>{title}</h1>
    </div>
  );
}

export default Header;
