const assert = require('assert');
const axios = require('axios');
const app = require('./index.js');

describe('Weather API Tests', () => {
    const baseUrl = 'http://localhost:3000'; 

    it('Должен возвращать данные о погоде для действительного города', async () => {
        const city = 'London';
        const expectedKeys = ['coord', 'weather', 'base', 'main', 'visibility', 'wind', 'clouds', 'dt', 'sys', 'timezone', 'id', 'name', 'cod'];

        const response = await axios.get(`${baseUrl}/weather?city=${city}`);
        const weatherData = response.data;

        assert.strictEqual(response.status, 200);
        assert.strictEqual(weatherData.name, city);
        assert.deepStrictEqual(Object.keys(weatherData), expectedKeys);
    });

    it('должен возвращать ошибку 400 для отсутствующего параметра city', async () => {
        const response = await axios.get(`${baseUrl}/weather`);

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.data, 'Пожалуйста, укажите город');
    });

    it('должен возвращать ошибку 500 для недопустимого города', async () => {
        const city = 'InvalidCity';
        const response = await axios.get(`${baseUrl}/weather?city=${city}`);

        assert.strictEqual(response.status, 500);
        assert.strictEqual(response.data, 'Ошибка при получении данных о погоде');
    });
});
