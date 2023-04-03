/* eslint-disable linebreak-style */

import React, { useEffect, useState } from "react";
// import React, { memo, useEffect, useState } from "react";

interface ExpireProps {
    className?: string;
    delay: number;
    id: number;
    children: React.ReactNode;
    remove: (id: number) => void;
}

const Expire = (props: ExpireProps): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setVisible(false);
        }, props.delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [props.delay]);

    useEffect(() => {
        if (visible === true) {
            return;
        }
        props.remove(props.id);
    }, [visible]);

    return visible ? <div className={props.className}>{props.children}</div> : <div />;
};

export default Expire;
