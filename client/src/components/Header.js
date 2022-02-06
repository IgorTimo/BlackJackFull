const Header = (props) => {
  const { message, user } = props;
  return (
    <>
      <h2>Ballance: {user.ballance} Email: {user.email}</h2>
      <h2>{message}</h2>
    </>
  );
};

export default Header;
