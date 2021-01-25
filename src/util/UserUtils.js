import {Auth} from "@aws-amplify/auth";
import {UserAvailability} from "../model/UserAvailability";

export default new class UserUtils {

    /**
     * A stupid hack to check if a username exists or not
     * Source: https://github.com/aws-amplify/amplify-js/issues/1067#issuecomment-436492775
     *
     * @param username
     */
    async determineUserExists(username) {
        // First check if the username provided points to an existing user or not, and if it does, whether or not that
        // user still requires verification
        const dummyCode = '000000';
        try {
            await Auth.confirmSignUp(username, dummyCode, {
                // If set to False, the API will throw an AliasExistsException error if the phone number/email used already exists as an alias with a different user
                forceAliasCreation: false
            });
        } catch (err) {
            switch (err.code) {
                case 'UserNotFoundException':
                    // User is not found - this means the username can be used
                    return UserAvailability.AVAILABLE;
                case 'NotAuthorizedException':
                    return UserAvailability.NOT_AVAILABLE;
                case 'AliasExistsException':
                    // Email alias already exists
                    return UserAvailability.NOT_AVAILABLE;
                case 'CodeMismatchException':
                    return UserAvailability.REQUIRES_VERIFICATION;
                case 'ExpiredCodeException':
                    return UserAvailability.REQUIRES_VERIFICATION;
                default:
                    return UserAvailability.NOT_AVAILABLE;
            }
        }
    }
}()