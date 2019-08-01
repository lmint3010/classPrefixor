const source = {
    mainPrefix: 'app',
    setPrefix(prefix) {
        const prefixDataTypeError = `classPrefixor configuation has been failed!\n @prefix must to be a String`;
        if (typeof prefix !== 'string') {
            throw new Error(prefixDataTypeError);
        }
        this.mainPrefix = prefix;
    },
    initial() {
        return (str, ...rest) => {
            const className = str[0];
            const validateError = `classPrefixor expected a String\n\ @You passed: ${typeof className}`;
            if (typeof className !== 'string') {
                throw new Error(validateError);
            }
            const prefixed = className
                .split(' ')
                .filter(e => e !== '')
                .map(value => `${this.mainPrefix}__${value}`);
            return [...prefixed, ...rest].join(' ');
        };
    }
};

export default prefix => {
    const classPrefixor = { ...source };
    classPrefixor.setPrefix(prefix);
    return classPrefixor.initial();
};
