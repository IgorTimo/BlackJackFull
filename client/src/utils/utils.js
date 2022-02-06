export function startSessionEndTimer(sesionEndTime, setUserId) {
  const sessionChecker = setInterval(() => {
    const secondsLeftInSession = sesionEndTime - new Date() / 1000;
    console.log("secondsLeftInSession: ", secondsLeftInSession);
    if (secondsLeftInSession < 0) {
      //FIXME: тут странный момент, по идее после setUserId(null); всё должно перерендериваться, но когда как. Реально по-разному, как взбредёт так и отобразит
      setUserId(null);
      sessionStorage.clear();
      localStorage.clear();
    }
  }, 1000);

  return () => clearInterval(sessionChecker);
}
