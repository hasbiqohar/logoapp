import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

function mascotReducer(state = [], action) {
    switch (action.type) {
        case 'LIST_MASCOT':
            return action.payload;
        default:
            return state;
    }
}

function mascotSelectedReducer(state = "", action) {
    switch (action.type) {
        case 'MASCOT_SELECTED':
            return action.payload;
        case 'MASCOT_REMOVED':
            return action.payload;
        default:
            return state;
    }
}

function backgroundReducer(state = [], action) {
    switch (action.type) {
        case 'LIST_BACKGROUND':
            return action.payload;
        default:
            return state;
    }
}

function backgroundSelectedReducer(state = "", action) {
    switch (action.type) {
        case 'BACKGROUND_SELECTED':
            return action.payload;
        case 'BACKGROUND_REMOVED':
                return action.payload;
        default:
            return state;
    }
}

function shieldReducer(state = [], action) {
    switch (action.type) {
        case 'LIST_SHIELD':
            return action.payload;
        default:
            return state;
    }
}

function shieldSelectedReducer(state = "", action) {
    switch (action.type) {
        case 'SHIELD_SELECTED':
            return action.payload;
        case 'SHIELD_REMOVED':
            return action.payload;
        default:
            return state;
    }
}

function outlineReducer(state = [], action) {
    switch (action.type) {
        case 'LIST_OUTLINE':
            return action.payload;
        default:
            return state;
    }
}

function outlineSelectedReducer(state = [], action) {
    switch (action.type) {
        case 'OUTLINE_SELECTED':
            return action.payload;
        default:
            return state;
    }
}

function TextReducer(state = "", action) {
    switch (action.type) {
        case 'TEXT_UPDATE':
            return action.payload;
        default:
            return state;
    }
}

function StrokeReducer(state = 10, action) {
    switch (action.type) {
        case 'STROKE_UPDATE' : 
            return action.payload;
        default : 
            return state;
    }
}

function dragData(state = null, action) {
    switch (action.type) {
        case 'MOUSE_CLICK':
            return {
                ...state,
                offset : action.payload,
                start : true
            }    
        case 'MOUSE_MOVE' : 
            return {
                ...state,
                drag : action.payload
            }
        case 'MOUSE_UP' :
            return {
                ...state,
                start : action.payload
            }
        case 'IMAGE_MOVE' :
            return {
                ...state,
                image : action.payload
            }
        default:
            return state;
    }
}

function imageData(state = {}, action) {
    switch (action.type) {
        case 'MASCOT_DATA':
            return {
                ...state,
                mascot : action.payload
            }
        default:
            return state;
    }
}

let mascot = combineReducers({
    list : mascotReducer,
    selected : mascotSelectedReducer
})

let background = combineReducers({
    list : backgroundReducer,
    selected : backgroundSelectedReducer
})

let shield = combineReducers({
    list : shieldReducer,
    selected : shieldSelectedReducer
})

let outline = combineReducers({
    list : outlineReducer,
    selected : outlineSelectedReducer
})

let rootReducers = combineReducers({
    mascot : mascot,
    background : background,
    shield : shield,
    outline : outline,
    dragData : dragData,
    imageText : TextReducer,
    stroke : StrokeReducer,
    imageData : imageData
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));