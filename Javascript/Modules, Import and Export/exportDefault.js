/*
    Perhaps for one module, its job is to only export one stuff. In that case, we shall
    use the export 'default', which means that this module by default export one stuff only

    Remember, ONE module can ONLY HAVE ONE EXPORT DEFAULT
*/




const trim = (str) => str.trim();

const wrap = (tag) => (str) => `<${tag}>${str}</${tag}>`;

const tolowercase = (str) => str.toLowerCase();

const transformHTML = (tag, str) => wrap(tag)( tolowercase( trim(str) ) );

//This javascript contains a lot of code and stuff, but the main thing is to export this function, which
//Takes in a string and tag and transform it to a valid html tag
export default transformHTML;
