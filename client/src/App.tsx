/* eslint-disable linebreak-style */

import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Expire, { ExpireType } from "./Expire";

type alert = {
    id: number;
    content: string;
};

const URL = "http://localhost:9000/events";
const source = new EventSource(URL);
const upperBoundTime = 10000;

const App = () => {
    // Variables used
    const [alerts, setAlerts] = useState<alert[]>([]);
    const tabTypes = ["Main", "Settings"];
    const [active, setActive] = useState(tabTypes[0]);

    // Input field variable
    const [notifCount, setNotifCount] = useState<number>(3);
    const [containerPosition, setContainerPosition] = useState<string>("pos1");
    const [notifPos, setNotifPos] = useState<string>("pos1");
    const [disappearingTime, setDisappearingTime] = useState<number>(5000);
    const [settingsSaved, setSettingsSaved] = useState<boolean>(false);

    const addAlerts = (data: string) => {
        // Check if existing alert > notifCount and if disappearing time is too long, remove the 1st one
        if (alerts.length >= notifCount && disappearingTime >= upperBoundTime) {
            const alert_id = alerts[0].id;
            removeAlert(alert_id);
        }
        const parsedData = JSON.parse(data);
        const newAlert = {
            id: parsedData.msg_id,
            content: parsedData.msg,
        };
        // console.log(parsedData.msg_id + " added!");
        setAlerts(currAlerts => [...currAlerts, newAlert]);
    };

    const removeAlert = useCallback(
        (id: number) => {
            // console.log(id + " removing...!!");
            setAlerts(prevAlerts =>
                prevAlerts.filter(alert => alert.id !== id)
            );
        },
        [setAlerts]
    );

    const savingSettings = useCallback(() => {
        setSettingsSaved(true);
        setTimeout(() => {
            setSettingsSaved(false);
        }, 2500);
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
                                setNotifPos(event.target.value);
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
                                setNotifPos(event.target.value);
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
                <div className="alertContainer">
                    <div className={containerPosition}>
                        <div className="alertMessages">
                            {alerts.map((alert) => {
                                return (
                                    <Expire
                                        key={alert.id}
                                        id={alert.id}
                                        className="alerts fadeIn"
                                        delay={disappearingTime}
                                        remove={removeAlert}
                                    >
                                        Notification title. {alert.content}
                                    </Expire>
                                );
                            })}
                        </div>
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
                                    setNotifCount(Number(event.target.value));
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
                                    setDisappearingTime(
                                        Number(event.target.value + "000")
                                    );
                                }}
                            />
                            <div className="seconds">sec</div>
                        </div>
                    </div>
                    <button
                        className="save-button"
                        onClick={() => {
                            {
                                console.log(notifCount);
                                console.log(notifPos);
                                console.log(disappearingTime);
                                setContainerPosition(notifPos);
                                savingSettings();
                                // console.log("Settings saved!");
                            }
                        }}
                    >
                        Save
                    </button>
                </div>
            )}
            <div className={`save-settings-message ${settingsSaved ? "show": ""}`}>
                Settings saved!
            </div>
        </div>
    );
};

export default App;
