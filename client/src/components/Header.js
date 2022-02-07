const Header = (props) => {
  const { message, user } = props;


  const handleLogOutClick = () => {
    sessionStorage.clear();
    localStorage.clear();
  }

  return (
    <>
      <h2>Ballance: {user.ballance} Email: {user.email}</h2>
      <button onClick={() => handleLogOutClick()}>Log out</button>
      <h2>{message}</h2>
    </>
  );
};

export default Header;
