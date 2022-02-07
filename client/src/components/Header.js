const Header = (props) => {
  const { message, user, setUser } = props;


  const handleLogOutClick = () => {
    sessionStorage.clear();
    localStorage.clear();
    setUser({}); //FIXME: толку от этого крюка не много, вроде что-то перерендеривается, но не то что надо
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
