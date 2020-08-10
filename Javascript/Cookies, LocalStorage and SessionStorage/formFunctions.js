
//  Obtain the form input fields and return them in an JS Object
function obtainElem() {
    return {
        firstName: document.getElementById('firstname'),
        lastName: document.getElementById('lastname'),
        gender: document.getElementById('gender'),
        emailprefix: document.getElementById('emailprefix'),
        emaildomain: document.getElementById('emaildomain'),
        note: document.getElementById('note')
    }
}


const formFunc = {

    //  Clear the values in the form input fields.
    clearForm: function() {
        const elements = obtainElem();
        for (let element in elements) {
            elements[element].value = '';
        }
    },

    //  Return an array which is the keys to retrieve information from the local Storage and session Storage
    obtainKeys: function() {
        return [
            'firstName',
            'lastName',
            'gender',
            'email',
            'note'
        ];
    },
    
    //  Obtain the values from the form input fields
    obtainInfo: function() {
        const { firstName, lastName, gender, emailprefix, emaildomain, note } = obtainElem();
        return {
            firstName: firstName.value,
            lastName: lastName.value,
            gender: gender.value,
            email: emailprefix.value + '@' + emaildomain.value,
            note: note.value
        }
    },

    //  Set the values of the form input fields. The values are provided in the parameter
    setInfo: function(fn, ls, gd, email, nt) {
        const { firstName, lastName, gender, emailprefix, emaildomain, note } = obtainElem();
        firstName.value = fn;
        lastname.value = ls;
        gender.value = gd;
        [ emailprefix.value, emaildomain.value ] = email.split('@');
        note.value = nt;
    }

}



export default formFunc;