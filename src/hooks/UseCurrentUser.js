import {useEffect, useState} from "react";
import {Hub} from "@aws-amplify/core";
import {Auth} from "@aws-amplify/auth"

export default function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        let updateUser = async () => {
            try {
                let user = await Auth.currentAuthenticatedUser()
                setCurrentUser(user)
            } catch {
                setCurrentUser(null)
            }
        }
        Hub.listen('auth', updateUser) // listen for login/signup events
        updateUser() // check manually the first time because we won't get a Hub event
        return () => Hub.remove('auth', updateUser) // cleanup
    }, []);

    return currentUser;
}