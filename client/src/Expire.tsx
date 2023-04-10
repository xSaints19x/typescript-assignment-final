/* eslint-disable linebreak-style */

import React, { useEffect, useState } from "react";
// import React, { memo, useEffect, useState } from "react";

type ExpireProps = ExpireType

export type ExpireType = {
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
            // console.log(props.id + " to be removed!!");
            props.remove(props.id);
        }, props.delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [props.delay]);

    return visible ? <div className={props.className}>{props.children}</div> : <div />;
};

export default Expire;
