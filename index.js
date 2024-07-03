const http = require('k6/http');
const { check } = require('k6');

export const options = {
  stages: [
    { duration: '10s', target: 500 },   // ramp up to 500 users in 10 seconds
    { duration: '30s', target: 5000 },  // drastically increase to 5000 users over the next 30 seconds
    { duration: '10s', target: 0 },     // ramp down to 0 users in 10 seconds
  ],
};

export default function () {
    const res = http.get('http://localhost:5000/api/v1/todos');

  check(res, { 'status was 200': (r) => r.status === 200 });
}
