import TelegramBot from 'node-telegram-bot-api';
import { token } from './utils.js';

const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Создаем клавиатуру с кнопкой "Показать команды"
    const startKeyboard = {
        keyboard: [
            [{ text: 'Показать команды' }],
        ],
        resize_keyboard: true, // Подгоняет размер клавиатуры
        one_time_keyboard: true, // Скрывает клавиатуру после нажатия
    };

    bot.sendMessage(chatId, '👋 Привет! Я TimeShowBot. Нажми кнопку ниже, чтобы увидеть команды.', {
        reply_markup: startKeyboard,
    });
});

// Обработчик нажатия на кнопку "Показать команды"
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === 'Показать команды') {
        const commandsList = `
📜 Доступные команды:
/time - Показать текущее время
/date - Показать текущую дату
/about - Информация о боте
    `;
        bot.sendMessage(chatId, commandsList);
    }
});

// Обработчик команды /time
bot.onText(/\/time/, (msg) => {
    const chatId = msg.chat.id;
    const now = new Date();
    bot.sendMessage(chatId, `⏰ Текущее время: ${now.toLocaleTimeString()}`);
});

// Обработчик команды /date
bot.onText(/\/date/, (msg) => {
    const chatId = msg.chat.id;
    const now = new Date();
    bot.sendMessage(chatId, `📅 Сегодня: ${now.toLocaleDateString()}`);
});

console.log('Бот запущен! 🚀');