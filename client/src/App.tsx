/* eslint-disable linebreak-style */

import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Expire from "./Expire";

type alert = {
    id: number;
    content: string;
};

const URL = "http://localhost:9000/events";

const App = () => {
    // Variables used
    const [alerts, setAlerts] = useState<alert[]>([]);
    const tabTypes = ["Main", "Settings"];
    const [active, setActive] = useState(tabTypes[0]);
    // const [active, setActive] = useState(tabTypes[1]);
    // const defaultValueSetting = {};

    // Input field variable
    const settingsValue = ["3", "pos1", "5000"];
    const [notifCount, setNotifCount] = useState<number>(3);
    const [containerPosition, setContainerPosition] = useState<string>("pos1");
    const [notifPos, setNotifPos] = useState<string>("pos1");
    const [disappearingTime, setDisappearingTime] = useState<number>(5000);

    const source = new EventSource(URL);

    const addAlerts = (data: string) => {
        // Check if existing alert > notifCount, don't add
        const parsedData = JSON.parse(data);
        const newAlert = {
            id: parsedData.id,
            content: parsedData.msg,
        };
        setAlerts((currAlerts) => [...currAlerts, newAlert]);
    };

    const removeAlert = useCallback((id: number) => {
        setAlerts((prevAlerts) =>
            prevAlerts.filter((Alert) => Alert.id !== id)
        );
    }, []);

    useEffect(() => {
        // source.onmessage = e => console.log(e.data);
        source.onmessage = (e) => addAlerts(e.data);
    });

    function TabGroup() {
        return (
            <>
                <div>
                    {tabTypes.map((type) => (
                        <button
                            key={type}
                            // className="buttons"
                            className={`buttons ${active === type && "active"}`}
                            onClick={() => setActive(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </>
        );
    }

    function RadioGroup() {
        return (
            <>
                <div className="settings-value">
                    <div className="settings-select">
                        Position 1
                        <input
                            className="position-select"
                            checked={notifPos === "pos1"}
                            type="radio"
                            value="pos1"
                            name="position"
                            onChange={(event) => {
                                settingsValue[1] = event.target.value;
                                setNotifPos(event.target.value);
                                console.log(event.target.value);
                            }}
                        />
                    </div>
                    <div className="settings-select">
                        Position 2
                        <input
                            className="position-select"
                            checked={notifPos === "pos2"}
                            type="radio"
                            value="pos2"
                            name="position"
                            onChange={(event) => {
                                settingsValue[1] = event.target.value;
                                setNotifPos(event.target.value);
                                console.log(event.target.value);
                            }}
                        />
                    </div>
                    <div className="settings-select">
                        Position 3
                        <input
                            className="position-select"
                            checked={notifPos === "pos3"}
                            type="radio"
                            value="pos3"
                            name="position"
                            onChange={(event) => {
                                settingsValue[1] = event.target.value;setNotifPos(event.target.value);
                                // console.log(event.target.value);
                            }}
                        />
                    </div>
                    <div className="settings-select">
                        Position 4
                        <input
                            className="position-select"
                            checked={notifPos === "pos4"}
                            type="radio"
                            value="pos4"
                            name="position"
                            onChange={(event) => {
                                settingsValue[1] = event.target.value;setNotifPos(event.target.value);
                                // console.log(event.target.value);
                            }}
                        />
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="background">
            <div className="nav-bar">
                <h1>Notification task</h1>
                <div className="buttonContainer">
                    <TabGroup />
                </div>
            </div>
            {active === tabTypes[0] && (
                <div className={containerPosition}>
                    <div className="moveableContainer">
                        {alerts
                            .slice(0, notifCount)
                            .map((alert) => {
                                return (
                                    <Expire
                                        key={alert.id}
                                        id={alert.id}
                                        className="alerts"
                                        delay={disappearingTime}
                                        remove={removeAlert}
                                    >
                                        Notification title. {alert.content}
                                    </Expire>
                                );
                            })}
                    </div>
                </div>
            )}
            {active === tabTypes[1] && (
                <div className="settings-group">
                    <div className="settings">
                        <div className="settings-title">Notification Count</div>
                        <div className="settings-value">
                            <input
                                className="input-val"
                                type="text"
                                id="notif-count"
                                name="notif-count"
                                defaultValue={notifCount}
                                onChange={(event) => {
                                    settingsValue[0] = event.target.value;
                                    console.log(event.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="settings">
                        <div className="settings-title">
                            Notification Position
                        </div>
                        <RadioGroup />
                    </div>
                    <div className="settings">
                        <div className="settings-title">
                            Notification Disappearing Time
                        </div>
                        <div className="settings-value">
                            <input
                                className="input-val"
                                type="text"
                                id="delay"
                                name="delay"
                                defaultValue={disappearingTime / 1000}
                                onChange={(event) => {
                                    settingsValue[2] =
                                        event.target.value + "000";
                                }}
                            />
                            <div className="seconds">sec</div>
                        </div>
                    </div>
                    <button
                        className="save-button"
                        onClick={() => {
                            {
                                setNotifCount(Number(settingsValue[0]));
                                console.log(notifPos);
                                if (notifPos === "pos4") {
                                    setContainerPosition("pos1");
                                } else {
                                    setContainerPosition(notifPos);
                                }
                                // setContainerPosition(notifPos);
                                setDisappearingTime(Number(settingsValue[2]));
                                alert("Settings saved!");
                            }
                        }}
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
