require("@babel/polyfill");
var $cQivH$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

const $b521082dd449d16e$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2aTEwOCIsImEiOiJjbDE2ZXM1aWg0NGpuM2NycHQxaXlhNGM1In0.mYrTwuzfGjaVc-9UJ9Xr9Q';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/devi108/cl16gcze8000g14nanovors5c',
        //style: 'mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy',
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';
        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);
        // Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};



const $cf8ea27b34b2137b$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
const $cf8ea27b34b2137b$export$de026b00723010c1 = (type, msg)=>{
    $cf8ea27b34b2137b$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout($cf8ea27b34b2137b$export$516836c6a9dfc573, 5000);
};


const $433b644962c26f49$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await ($parcel$interopDefault($cQivH$axios))({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === 'success') {
            $cf8ea27b34b2137b$export$de026b00723010c1('success', 'Logged in successfully!');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        $cf8ea27b34b2137b$export$de026b00723010c1('error', err.response.data.message);
    }
};
const $433b644962c26f49$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await ($parcel$interopDefault($cQivH$axios))({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout'
        });
        res.data.status = 'success';
        location.reload(true);
    } catch (err) {
        console.log(err.response);
        $cf8ea27b34b2137b$export$de026b00723010c1('error', 'Error logging out! Try again.');
    }
};




const $6842e7be16478138$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === 'password' ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword' : 'http://127.0.0.1:3000/api/v1/users/updateMe';
        const res = await ($parcel$interopDefault($cQivH$axios))({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res.data.status === 'success') $cf8ea27b34b2137b$export$de026b00723010c1('success', `${type.toUpperCase()} updated successfully!`);
    } catch (err) {
        $cf8ea27b34b2137b$export$de026b00723010c1('error', err.response.data.message);
    }
};


// DOM ELEMENTS
const $c74e663a61ed842a$var$mapBox = document.getElementById('map');
const $c74e663a61ed842a$var$loginForm = document.querySelector('.form--login');
const $c74e663a61ed842a$var$logOutBtn = document.querySelector('.nav__el--logout');
const $c74e663a61ed842a$var$userDataForm = document.querySelector('.form-user-data');
const $c74e663a61ed842a$var$userPasswordForm = document.querySelector('.form-user-password');
// DELEGATION
if ($c74e663a61ed842a$var$mapBox) {
    const locations = JSON.parse($c74e663a61ed842a$var$mapBox.dataset.locations);
    $b521082dd449d16e$export$4c5dd147b21b9176(locations);
}
if ($c74e663a61ed842a$var$loginForm) $c74e663a61ed842a$var$loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    $433b644962c26f49$export$596d806903d1f59e(email, password);
});
if ($c74e663a61ed842a$var$logOutBtn) $c74e663a61ed842a$var$logOutBtn.addEventListener('click', $433b644962c26f49$export$a0973bcfe11b05c9);
if ($c74e663a61ed842a$var$userDataForm) $c74e663a61ed842a$var$userDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    $6842e7be16478138$export$f558026a994b6051({
        name: name,
        email: email
    }, 'data');
});
if ($c74e663a61ed842a$var$userPasswordForm) $c74e663a61ed842a$var$userPasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await $6842e7be16478138$export$f558026a994b6051({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});


//# sourceMappingURL=app.js.map
