import {useState} from "react";

/**
 * Source: https://github.com/AnomalyInnovations/serverless-stack-demo-client/blob/5604cfad829be7ecf67a4c02bb83ffb1384fb564/src/libs/hooksLib.js#L3
 */
export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function (event) {
            setValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
}