import React, { useEffect, useState, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../State";
import { RootrootReducer } from "../../State/Reducers/RootReducer";
import { useHistory } from "react-router-dom";
import { State } from "../../State/Reducers/MyReducers";

export interface bubbleInterface {
  x: number;
  y: number;
  s: number;
}

const Home: React.FC<{}> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { logOut } = bindActionCreators(actionCreators, dispatch);
  const store: State = useSelector((state: RootrootReducer) => state.home);

  const bigMonitor = useMediaQuery({ minWidth: 1824 });
  const mediumMonitor = useMediaQuery({ minWidth: 1224, maxWidth: 1823 });
  const [bubbleArray, setbubbleArray] = useState<bubbleInterface[]>([]);

  function getRandomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    console.log(store);
    if (!store.loginStaus) {
      history.push("/"); //router is another option for this.
    }
  }, [history, store]);

  useEffect(() => {
    let counter = store.devices.length;
    if (counter === undefined || counter === 0) {
      return;
    }
    const totalBubble = [];
    for (let i = 0; i < counter; i++) {
      //show respopnsive bubble in different screen
      let forBigScreen = {
        s: getRandomBetween(0.3, 0.7),
        x: getRandomBetween(10, 1600),
        y: getRandomBetween(10, 600),
      };
      let forMediumScreen = {
        s: getRandomBetween(0.3, 0.7),
        x: getRandomBetween(10, 1100),
        y: getRandomBetween(10, 450),
      };
      let forMobileScreen = {
        s: getRandomBetween(0.3, 0.7),
        x: getRandomBetween(2, 250),
        y: getRandomBetween(10, 400),
      };
      let selectbubbleSize = bigMonitor
        ? forBigScreen
        : mediumMonitor
        ? forMediumScreen
        : forMobileScreen;
      totalBubble.push(selectbubbleSize);
    }

    setbubbleArray(totalBubble);
  }, [store, bigMonitor, mediumMonitor]);

  const handleNotify = useCallback(() => {
    history.push("/notify");
  }, [history]);

  const logOutButtonClick = () => {
    logOut();
  };

  return (
    <>
      <div className="home-container">
        <div className="bubbles-wrapper">
          <div className="bubbles">
            {bubbleArray.length > 0 &&
              bubbleArray.map((bubble, index) => {
                return (
                  <div
                    className="bubble"
                    key={index}
                    style={{
                      backgroundColor: "#fff",
                      transform: `translate(${bubble.x}px, ${bubble.y}px) scale(${bubble.s})`,
                    }}
                  />
                );
              })}
          </div>
        </div>
        <div className="device-container">
          <h1 className="device-number">{store.devices.length}</h1>
          <h1>DEVICE</h1>
          <h1>ONLINE</h1>
        </div>
      </div>
      <div className="home-Bottom-container">
        <button onClick={handleNotify} className="notify-button">
          NOTIFY
        </button>
        <button
          type="submit"
          onClick={logOutButtonClick}
          className="logout-button"
        >
          LOG OUT
        </button>
      </div>
    </>
  );
};

export default Home;
