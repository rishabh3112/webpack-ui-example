import { createReducer } from 'redux-starter-kit';
import {refresh, save} from '../actions/webpack';
// To handle webpack state
export default createReducer(null,{
    [refresh]: (state, action) => {
        //const data = await request('/api/init',{});
        state = 'apple';
    },
    [save]: async (state, action) => {
        const data = await request('/api/init',{
            webpack: action.payload,
        })
        state = data.webpack;
    }
})

async function request(route, req) {
    const data = await fetch(
        `http://localhost:1234${route}`,
        {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => res.json());
    console.log(`WEBPACK: ${JSON.stringify(data, null, 2)}`);
    return data;
}