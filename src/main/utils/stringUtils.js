
class StringUtils {

    /**
     *
     * @param {string} str
     */
    isBlank (str) {
        return str == null || str.trim().length === 0;
    }

}

const stringUtils = new StringUtils();

export {stringUtils}