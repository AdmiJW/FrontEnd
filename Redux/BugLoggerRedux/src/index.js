import store from '../Store/store.js';
import addBug from '../Actions/addBugCreator';
import removeBug from '../Actions/removeBugCreator';
import resolveBug from '../Actions/resolveBugCreator';

const callback = () => {
    console.log("Store updated", store.getState() );
}
const unsub = store.subscribe( callback);

store.dispatch( addBug('Bug 101', 'THis is a bug test 101') );
store.dispatch( addBug('Bug 202', 'THis is a bug test 101') );
store.dispatch( addBug('Bug 303', 'THis is a bug test 101') );
store.dispatch( addBug('Bug 404', 'THis is a bug test 101') );

store.dispatch( removeBug(2) );

store.dispatch( resolveBug(1) );