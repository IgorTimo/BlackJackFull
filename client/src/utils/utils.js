export function startSessionEndTimer(sesionEndTime, setUserId) {
  const sessionChecker = setInterval(() => {
    const secondsLeftInSession = sesionEndTime - new Date() / 1000;
    if (secondsLeftInSession < 0) {
      //FIXME: тут странный момент, по идее после setUserId(null); всё должно перерендериваться, но когда как. Реально по-разному, как взбредёт так и отобразит
      setUserId(null);
      sessionStorage.clear();
      localStorage.clear();
    }
    //console.log("secondsLeftInSession: ", secondsLeftInSession); //FIXME: sessionChecker отановить бы, когда всё закончилось, но у меня не получилось
  }, 1000);

  return () => clearInterval(sessionChecker);
}
